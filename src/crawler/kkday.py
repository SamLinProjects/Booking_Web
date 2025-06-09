from .base import SeleniumCrawler
from bs4 import BeautifulSoup

class KKDayCrawler(SeleniumCrawler):
    def search(self, contry, city, keyword): 
        url = f"https://www.kkday.com/zh-tw/category/{contry}-{city}/{keyword}/list"
        html = self.fetch(url)
        return self.parse(html)
    
    def parse(self, html):
        soup = BeautifulSoup(html, 'html.parser')
        items = soup.select('.product-listview')
        results = []

        for item in items: 
            title = item.select_one('span.product-listview__name').get_text(strip=True)
            price = int(''.join(filter(str.isdigit, item.select_one('div.kk-price-local__normal').get_text(strip=True))))
            link = item.select_one('a')['href']

            results.append({
                'title': title,
                'price': price,
                'link': link
            })
        return results