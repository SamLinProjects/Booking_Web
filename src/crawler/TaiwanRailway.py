#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re
from time import sleep
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from bs4 import BeautifulSoup
import pandas as pd


def user_input():
    # startST = input("請輸入起始車站: ").strip()
    # endST = input("請輸入終點車站: ").strip()
    startST = "臺北"
    endST = "中壢"

    while True:
        transfer = input("是否需要轉乘? (1: 不須 2: 可): ").strip()
        if transfer in ['1', '2']:
            break

    while True:
        date_value = input("請輸入日期 (YYYYMMDD): ").strip()
        if re.match(r"^\d{8}$", date_value):
            yyyy, mm, dd = date_value[:4], date_value[4:6], date_value[6:8]
            if 1 <= int(mm) <= 12 and 1 <= int(dd) <= 31:
                date_value = f"{yyyy}/{mm}/{dd}"
                break

    while True:
        startOrEnd = input("以何者為準? (1: 出發 2: 抵達): ").strip()
        if startOrEnd in ['1', '2']:
            break

    while True:
        tr = input("時間範圍 (1: 全天 2: 自訂): ").strip()
        if tr == '1':
            timeRange = ["00:00", "23:59"]
            break
        elif tr == '2':
            t0 = input("起始時間 (HHMM): ").zfill(4)
            t1 = input("結束時間 (HHMM): ").zfill(4)
            timeRange = [f"{t0[:2]}:{t0[2:]}", f"{t1[:2]}:{t1[2:]}"]
            break

    while True:
        trainType = input("車種篩選 (1: 全部 2: 對號 3: 區間): ").strip()
        if trainType in ['1', '2', '3']:
            break

    return startST, endST, transfer, date_value, startOrEnd, timeRange, trainType


def data_Crawl(startST, endST, transfer, date_value, startOrEnd, timeRange, trainType):
    from selenium.webdriver.chrome.options import Options
    from selenium.webdriver.chrome.service import Service
    from webdriver_manager.chrome import ChromeDriverManager

    opts = Options()
    opts.add_argument("--headless")             # 無頭
    opts.add_argument("--disable-gpu")          # 確保 Linux 下也能跑
    opts.add_argument("--no-sandbox")
    opts.add_argument("--disable-dev-shm-usage")
    opts.add_argument("window-size=1920,1080")  # 設定視窗大小，避免有些元素在小尺寸下隱藏

    service = Service(ChromeDriverManager().install())
    browser = webdriver.Chrome(service=service, options=opts)

    # 2. 剩下程式不動
    browser.maximize_window()
    browser.get(
        r"https://www.railway.gov.tw/tra-tip-web/tip/tip001/tip112/gobytime")
    # sleep(1)
    browser.encoding = "utf-8"

    # ===開始操作網頁上的元素===
    browser.find_element(By.ID, "startStation") \
           .send_keys(f"{startST}")
    browser.find_element(By.ID, "endStation") \
           .send_keys(f"{endST}")
    browser.find_element(By.CSS_SELECTOR, f"label[for='option{transfer}']") \
           .click()
    browser.execute_script(
        f'document.getElementById("rideDate").value = "{date_value}"'
    )
    browser.find_element(By.ID, f"startOrEndTime{startOrEnd}") \
           .click()
    Select(browser.find_element(By.ID, "startTime")) \
        .select_by_value(timeRange[0])
    Select(browser.find_element(By.ID, "endTime")) \
        .select_by_value(timeRange[1])
    browser.find_element(By.CSS_SELECTOR,
                         f"label[for='trainTypeList{trainType}']"
                         ).click()

    browser.find_element(By.NAME, "query").click()
    # sleep(2)
    browser.encoding = "utf-8"
    html_info = browser.page_source
    browser.quit()
    # Save the HTML content to a file
    with open("tmp.html", "w", encoding="utf-8") as f:
        f.write(html_info)
    print("HTML content saved to tmp.html")
    return html_info


def parse_results(html_info):
    """
    仿照 sample code 的方式解析：
      1. 先從 <tbody> 第一個 <tr> 拿所有 <th> 做為欄位名（共 10 個 th，但跳過第 5 與最後一個）
      2. 如果有需要，可在這裡對 columnsName[1]/[2] 加上 startST/endST 前綴
      3. 找出 class="trip-column" 的所有 <tr>，對每一列的所有 <td> 同樣跳過第 5 與最後一個
      4. 把每欄資料累積到一個 list of lists 中，最後轉置成 DataFrame
    """
    soup = BeautifulSoup(html_info, "html.parser")

    # 1. 取表頭
    first_tr = soup.find("tbody").find("tr")
    ths = first_tr.find_all("th")
    # 範例中 ths 總長 10，我們要 ths[0:5] + ths[6:-1]
    ths = ths[:5] + ths[6:-1]
    columnsName = []
    for th in ths:
        # 去掉換行與空格
        columnsName.append(re.sub(r"[\n ]", "", th.text))
    # 如果你需要把站名當前綴：
    # columnsName[1] = startST + columnsName[1]
    # columnsName[2] = endST   + columnsName[2]

    # 2. 取表身符合 class="trip-column" 的 tr
    table_content = soup.find("tbody").find_all("tr", class_="trip-column")

    # 3. 建立空的欄 list，長度跟 columnsName 一致
    dataList = [[] for _ in range(len(columnsName))]

    # 4. 迭代每一列，取 td，同樣跳過第 5 與最後一個
    for tr in table_content:
        tds = tr.find_all("td")
        tds = tds[:5] + tds[6:-1]
        for i in range(len(tds)):
            text = re.sub(r"[\n ]", "", tds[i].text)
            dataList[i].append(text)

    # 5. 轉成 DataFrame 並設定欄名
    df = pd.DataFrame(dataList).transpose()
    df.columns = columnsName

    return df


def main():
    params = user_input()
    html = data_Crawl(*params)
    df = parse_results(html)
    if df.empty:
        print("未找到任何班次。")
    else:
        print("\n查詢結果：")
        print(df.to_string(index=False))


if __name__ == "__main__":
    main()
