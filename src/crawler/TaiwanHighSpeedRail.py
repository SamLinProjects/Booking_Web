#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from selenium.webdriver.support import expected_conditions as EC
import re
from time import sleep
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from bs4 import BeautifulSoup
import pandas as pd


def user_input():
    # 預設起訖站，可改成 input() 方式
    startST = "台北"
    endST = "桃園"

    while True:
        # date_value = input("請輸入日期 (YYYYMMDD): ").strip()
        date_value = "20250610"  # 預設日期，可改成 input() 方式
        if re.match(r"^\d{8}$", date_value):
            yyyy, mm, dd = date_value[:4], date_value[4:6], date_value[6:8]
            if 1 <= int(mm) <= 12 and 1 <= int(dd) <= 31:
                date_value = f"{yyyy}/{mm}/{dd}"
            break

    return startST, endST, date_value


def data_Crawl(startST, endST, date_value, time_value="18:00"):
    from selenium.webdriver.chrome.options import Options
    from selenium.webdriver.chrome.service import Service
    from webdriver_manager.chrome import ChromeDriverManager
    from selenium.webdriver.support.ui import Select
    from selenium.webdriver.common.by import By
    from time import sleep

    opts = Options()
    # 不用 headless，方便 debug
    opts.add_argument("--disable-gpu")
    opts.add_argument("--no-sandbox")
    opts.add_argument("--disable-dev-shm-usage")

    service = Service(ChromeDriverManager().install())
    browser = webdriver.Chrome(service=service, options=opts)
    browser.maximize_window()
    # 直接打查詢頁
    browser.get("https://www.thsrc.com.tw/")
    sleep(1)

    # 點「不同意」彈窗
    try:
        browser.find_element(
            By.XPATH, "//button[contains(text(),'不同意')]").click()
        sleep(1)
    except:
        pass

    # DEBUG: 確認我們現在是在查詢頁
    print("--- SELECT elements on this page: ---")
    for sel in browser.find_elements(By.TAG_NAME, "select"):
        print("id=", sel.get_attribute("id"))
    print("------------------------------------")

    # 選出發/到達站，用文字匹配
    Select(browser.find_element(By.ID, "select_location01")) \
        .select_by_visible_text(startST)
    Select(browser.find_element(By.ID, "select_location02")) \
        .select_by_visible_text(endST)

    # # 填入日期並查詢
    date_input = browser.find_element(By.CSS_SELECTOR, "input#Departdate01")
    date_input.click()
    from selenium.webdriver.support.ui import WebDriverWait


    # 等到 flatpickr-calendar（或 jQuery UI datepicker）的容器出現為止
    WebDriverWait(browser, 5).until(
        EC.visibility_of_element_located((By.CSS_SELECTOR, "div.datepicker"))
    )
    dd = date_value.split("/")[2]  # 取得日期中的日部分
    xpath = "//div[contains(@class,'datepicker')]//td[@class='day' and normalize-space(text())='{}']".format(dd)
    browser.find_element(By.XPATH, xpath).click()

    time_input = browser.find_element(By.CSS_SELECTOR, "input#outWardTime")
    time_input.click()

    hh, mm = time_value.split(":")
    picker = WebDriverWait(browser, 5).until(
        EC.visibility_of_element_located((
            By.XPATH,
            "//div[contains(@class,'bootstrap-datetimepicker-widget')]"
        ))
    )
    picker.find_element(By.CSS_SELECTOR, "span.timepicker-hour").click()
    picker.find_element(
        By.XPATH,
        f".//td[@data-action='selectHour' and normalize-space(text())='{int(hh)}']"
    ).click()
    picker.find_element(By.CSS_SELECTOR, "span.timepicker-minute").click()
    picker.find_element(
        By.XPATH,
        f".//td[@data-action='selectMinute' and normalize-space(text())='{(mm)}']"
    ).click()
    browser.find_element(By.ID, "start-search").click()

    WebDriverWait(browser, 5).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "div.tr-nav-head"))
    )
    header_divs = browser.find_elements(
        By.CSS_SELECTOR, "div.tr-nav-head > div")
    headers = [h.text.strip() for h in header_divs]
    print("表頭：", headers)

    WebDriverWait(browser, 5).until(
        EC.presence_of_element_located(
            (By.CSS_SELECTOR, "div.tr-table .tr-thead"))
    )
    # 找到 .tr-thead 這個 container
    thead = browser.find_element(
        By.CSS_SELECTOR,
        "div.tr-table .tr-thead"
    )

    # 再找出它底下所有直屬的 div（每個欄位）
    header_cells = thead.find_elements(By.CSS_SELECTOR, "div")
    headers = [cell.text.strip() for cell in header_cells]
    print("表頭：", headers)
    table = WebDriverWait(browser, 10).until(
        EC.presence_of_element_located(
            (By.CSS_SELECTOR, "div.tr-table"))
    )
    tbody = WebDriverWait(table, 5).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "div.tr-tbody"))
    )
    rows = tbody.find_elements(By.CSS_SELECTOR, "a.tr-row")
    for row in rows:
        # 如果每個 <a> 裡面是用多個 <div> 分欄，就這樣拿
        cells = row.find_elements(By.CSS_SELECTOR, "div")
        values = [c.text.strip() for c in cells]
        print(values)


def main():
    startST, endST, date_value = user_input()
    df = data_Crawl(startST, endST, date_value)
    # html = data_Crawl(startST, endST, date_value)
    # with open("thsr_tmp.html", "r", encoding="utf-8") as f:
    #     html = f.read()

    if df.empty:
        print("未找到任何班次。")
    else:
        print("\n查詢結果：")
        print(df.to_string(index=False))

class TaiwanHighSpeedRailCrawler():
    def __init__(self):
        pass

    def search(self, start_time, start_place, end_place):
        date_value = start_time.split(",")[0]
        date_value = date_value.replace("-", "")
        if re.match(r"^\d{8}$", date_value):
            yyyy, mm, dd = date_value[:4], date_value[4:6], date_value[6:8]
            if 1 <= int(mm) <= 12 and 1 <= int(dd) <= 31:
                date_value = f"{yyyy}/{mm}/{dd}"
        start_time = start_time.split(",")[1]
        if ":" not in start_time:
            start_time = f"{start_time[:2]}:{start_time[2:]}"
        end_time = end_time.split(",")[1]
        if ":" not in end_time:
            end_time = f"{end_time[:2]}:{end_time[2:]}"
        df = data_Crawl(start_place, end_place, date_value, start_time)
        print(df.to_string(index=False))



if __name__ == "__main__":
    # main()
    crawler = TaiwanHighSpeedRailCrawler()
    start_time = "2025-06-10,19:00"
    start_place = "台北"
    end_place = "左營"