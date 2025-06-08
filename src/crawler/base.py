from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import time

class SeleniumCrawler:
    def __init__(self, headless=True):
        options = Options()
        if headless:
            options.add_argument("--headless")
        options.add_argument("--disable-blink-features=AutomationControlled")
        self.driver = webdriver.Chrome(options=options)

    def fetch(self, url):
        self.driver.get(url)
        time.sleep(3)  # Wait for the page to load
        return self.driver.page_source

    def close(self):
        self.driver.quit()