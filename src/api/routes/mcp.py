# app/blueprints/mcp.py
# -*- coding: utf-8 -*-
import os
import json
import uuid
import datetime as dt
from flask import Blueprint, request, jsonify, current_app
import openai

# --------------------------------------------------------------------------- #
# 基本設定
# --------------------------------------------------------------------------- #
mcp_bp = Blueprint("mcp", __name__)
openai.api_key = os.getenv("OPENAI_API_KEY")

# 全域對話歷史儲存（所有請求共享同一個會話）
_GLOBAL_HISTORY: list[dict[str, str]] = []

# --------------------------------------------------------------------------- #
# System Prompt
# --------------------------------------------------------------------------- #
SYSTEM_PROMPT = """
你是一個旅遊網站的聊天助手，根據用戶的輸入來判斷他們的需求類型並收集相應資訊。

支援的服務類型：
1. **booking** - 住宿訂房 (Booking.com)
2. **inline** - 餐廳訂位 (OpenTable)
3. **kkday** - 旅遊行程活動
4. **twr** - 台鐵訂票
5. **thsr** - 高鐵訂票

請根據用戶輸入判斷服務類型，並收集對應的必要參數：

**回覆的時候注意到你並沒有真的已預訂，只是協助查詢而已**

**BOOKING (住宿)**:
- country: "tw" 或 "jp"
- city: "taipei"/"taoyuan"/"taichung"/"kaohsiung" (台灣) 或 "tokyo"/"kyoto" (日本)
- start_time: "YYYY-MM-DD"
- end_time: "YYYY-MM-DD"
- adults: 數字 (預設1)
- children: 數字 (預設0)
- rooms: 數字 (預設1)

**INLINE (餐廳)**:
- start_time: "YYYY-MM-DD"
- adults: 數字
- city: 城市名稱
- budget: 數字代表預算

**KKDAY (行程活動)**:
- country: "tw" 或 "jp"
- city: 城市名稱
- keyword: 活動關鍵字 (如"門票"、"一日遊"、"體驗")
- start_time: "YYYY-MM-DD" (可選)
- end_time: "YYYY-MM-DD" (可選)

**TAIWAN_RAILWAY (台鐵)**:
- start_time: "YYYY-MM-DD,HH:MM"
- end_time: "YYYY-MM-DD,HH:MM"
- start_place: 起站名稱
- end_place: 終站名稱
注意到台鐵習慣用的站名都是「臺」而不是「台」，請使用「臺」字。
時間只能是00分或者是30分，不能是其他分鐘，自動幫使用者依情境選擇適合的時間填入。  

**HIGH_SPEED_RAIL (高鐵)**:
- start_time: "YYYY-MM-DD,HH:MM"
- start_place: 起站名稱
- end_place: 終站名稱
高鐵車站清單有:新竹、苗栗、台中、彰化、雲林、嘉義、台南、南港、台北、板橋、桃園、左營
時間只能是00分或者是30分，不能是其他分鐘，自動幫使用者依情境選擇適合的時間填入。  
start_place 和 end_place 必須是這些車站名稱。

回覆格式：
{
    "status": "success" 或 "fail",
    "service_type": "booking/inline/kkday/twr/thsr",
    "data": {
        // 根據service_type填入對應參數
    },
    "message": "<繁體中文回覆>"
}

如果資訊不足，status = "fail"，data = {}，並友善詢問缺少的資訊。
如果資訊充足，status = "success"，正確填入data欄位， **service_type 很重要一定要有**。

⚠️ 非常重要：請**只回傳 JSON 格式本身**，不要額外補充說明、不要用 markdown code block，不要加任何前綴文字，請直接純粹回傳 JSON 格式。
""".strip()

# --------------------------------------------------------------------------- #
# 主要 API
# --------------------------------------------------------------------------- #


@mcp_bp.route("/mcp/parse", methods=["POST"])
def parse_trip_command():
    global _GLOBAL_HISTORY

    # 1. 讀取 payload
    payload = request.get_json(force=True) or {}
    user_cmd = payload.get("command", "").strip()
    if not user_cmd:
        return jsonify({"error": "empty command"}), 400

    # 2. 建立 OpenAI messages（使用全域歷史）
    today = dt.date.today().isoformat()
    messages = (
        [{"role": "system", "content": SYSTEM_PROMPT + f" Today is {today}."}]
        + _GLOBAL_HISTORY
        + [{"role": "user", "content": user_cmd}]
    )

    # 5. 呼叫 OpenAI
    try:
        res = openai.ChatCompletion.create(
            model="gpt-4",          # 需要其他模型請自行替換
            messages=messages,
            temperature=0,
        )
    except Exception as e:
        return jsonify({"error": f"OpenAI API error: {e}"}), 500

    raw_reply = res["choices"][0]["message"]["content"]

    # 6. 擷取 JSON
    try:
        # 嘗試找到 JSON 開始和結束位置
        start_idx = raw_reply.find("{")
        end_idx = raw_reply.rfind("}") + 1

        if start_idx == -1 or end_idx == 0:
            raise ValueError("No JSON found in response")

        json_str = raw_reply[start_idx:end_idx]
        j = json.loads(json_str)
        service_type = j.get("service_type", "").strip().lower()
        status = j.get("status", "fail")
        data_field = j.get("data", {}) if status == "success" else {}
        reply_msg = j.get("message", "")
    except Exception as e:
        status = "fail"
        service_type = ""
        data_field = {}
        reply_msg = f"無法解析 LLM 回傳內容，原始內容：{raw_reply}"

    # 7. 更新全域歷史並裁剪長度
    _GLOBAL_HISTORY.append({"role": "user", "content": user_cmd})
    _GLOBAL_HISTORY.append({"role": "assistant", "content": reply_msg})

    MAX_HISTORY_LEN = 10  # 保留最近 10 輪對話
    if len(_GLOBAL_HISTORY) > MAX_HISTORY_LEN * 2:
        _GLOBAL_HISTORY = _GLOBAL_HISTORY[-MAX_HISTORY_LEN * 2:]

    # 8. 回傳
    return current_app.response_class(
        response=json.dumps(
            {
                "status":     status,
                "service_type": service_type,
                "data":       data_field,
                "message":    reply_msg,
                "history":    _GLOBAL_HISTORY,
            },
            ensure_ascii=False,
            indent=2,
        ),
        mimetype="application/json",
    )
