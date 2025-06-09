#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re
from time import sleep
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select, WebDriverWait
from bs4 import BeautifulSoup
import pandas as pd


def user_input():
    startST = "臺北"
    endST = "中壢"

    transfer = "1"

    date_value = "20250610"
    if re.match(r"^\d{8}$", date_value):
        yyyy, mm, dd = date_value[:4], date_value[4:6], date_value[6:8]
        if 1 <= int(mm) <= 12 and 1 <= int(dd) <= 31:
            date_value = f"{yyyy}/{mm}/{dd}"
    startOrEnd = "1"  # 預設為出發時間
    t0 = "0000"  # 預設起始時間
    t1 = "2359"  # 預設結束時間
    timeRange = [f"{t0[:2]}:{t0[2:]}", f"{t1[:2]}:{t1[2:]}"]
    trainType = "1"  # 預設為全部車種

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
    wait = WebDriverWait(browser, 15)

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
    return html_info


def parse_results(html_info):
    soup = BeautifulSoup(html_info, "html.parser")

    # 1. 取表頭
    first_tr = soup.find("tbody").find("tr")
    ths = first_tr.find_all("th")
    # 範例中 ths 總長 10，我們要 ths[0:5] + ths[6:-1]
    ths = ths[:5] + ths[6:-1]
    columnsName = []
    for th in ths:
        columnsName.append(re.sub(r"[\n ]", "", th.text))
    table_content = soup.find("tbody").find_all("tr", class_="trip-column")

    dataList = [[] for _ in range(len(columnsName))]

    for tr in table_content:
        tds = tr.find_all("td")
        tds = tds[:5] + tds[6:-1]
        for i in range(len(tds)):
            text = re.sub(r"[\n ]", "", tds[i].text)
            dataList[i].append(text)

    df = pd.DataFrame(dataList).transpose()
    df.columns = columnsName
    
    return df


def main():
    params = user_input()
    
    max_retries = 100  # 最大重試次數
    for attempt in range(1, max_retries+1):
        html = data_Crawl(*params)
        soup = BeautifulSoup(html, "html.parser")

        # 如果找到 <tbody>，就可以 parse
        if soup.find("tbody") is not None:
            df = parse_results(html)
            break
        else:
            sleep(0.5)
    if df.empty:
        print("未找到任何班次。")
    else:
        print("\n查詢結果：")
        print(df.to_string(index=False))


if __name__ == "__main__":
    main()
