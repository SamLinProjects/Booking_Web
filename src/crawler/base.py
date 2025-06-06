import requests
import time
from requests.exceptions import RequestException

class BaseCrawler:
    def __init__(self):
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
        }
        self.timeout = 10  # seconds
        self.max_retries = 3

    def fetch(self, url, params=None):
        for attempt in range(self.max_retries): 
            try:
                response = requests.get(url, headers=self.headers, params=params, timeout=self.timeout)
                response.raise_for_status()
                return response.text
            except RequestException as e:
                print(f"Attempt {attempt + 1} failed, error fetching {url}: {e}")
                time.sleep(1)
        raise Exception(f"Failed to fetch {url} after {self.max_retries} attempts.")
    
    def fetch_json(self, url, params=None): 
        for attempt in range(self.max_retries):
            try:
                response = requests.get(url, headers=self.headers, params=params, timeout=self.timeout)
                response.raise_for_status()
                return response.json()
            except RequestException as e:
                print(f"Attempt {attempt + 1} failed, error fetching JSON from {url}: {e}")
                time.sleep(1)
        raise Exception(f"Failed to fetch JSON from {url} after {self.max_retries} attempts.")
    
    def parse(self, content):
        raise NotImplementedError("Subclasses should implement this method.")

