from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import time
import random

class SeleniumCrawler:
    def __init__(self, headless=True):
        options = Options()

        if headless:
            options.add_argument("--headless")
        
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        options.add_argument('--disable-blink-features=AutomationControlled')
        options.add_experimental_option("excludeSwitches", ["enable-automation"])
        options.add_experimental_option('useAutomationExtension', False)
        
        options.add_argument('--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
        
        options.add_argument('--disable-web-security')
        options.add_argument('--allow-running-insecure-content')
        options.add_argument('--disable-extensions')
        options.add_argument('--disable-plugins-discovery')
        options.add_argument('--disable-default-apps')
        options.add_argument('--no-default-browser-check')
        options.add_argument('--no-first-run')
        
        options.add_argument('--window-size=1920,1080')

        self.driver = webdriver.Chrome(options=options)

        self.driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
        self.driver.execute_script("Object.defineProperty(navigator, 'languages', {get: () => ['en-US', 'en']})")
        self.driver.execute_script("Object.defineProperty(navigator, 'plugins', {get: () => [1, 2, 3, 4, 5]})")
        
    def fetch(self, url, params=None):
        if params:
            param_string = '&'.join([f"{k}={v}" for k, v in params.items()])
            full_url = f"{url}?{param_string}"
        else:
            full_url = url
        
        print(f"Fetching URL: {full_url}")
        
        try:
            # Navigate with human-like behavior
            self.driver.get("https://www.booking.com")  # Go to homepage first
            time.sleep(random.uniform(2, 4))
            
            # Then navigate to search results
            self.driver.get(full_url)
            time.sleep(random.uniform(5, 8))
            
            # Human-like scrolling
            self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight/4);")
            time.sleep(random.uniform(1, 2))
            
            self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight/2);")
            time.sleep(random.uniform(1, 2))
            
            return self.driver.page_source
            
        except Exception as e:
            print(f"Error during fetch: {e}")
            return self.driver.page_source

    def close(self):
        self.driver.quit()