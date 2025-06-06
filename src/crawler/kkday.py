from base import BaseCrawler
from bs4 import BeautifulSoup

class KKDayCrawler(BaseCrawler):
    def search(self, keyword): 
        url = f"https://www.kkday.com/zh-tw/category/{keyword}/day-tours/list"
        html = self.fetch(url)
        return self.parse(html)
    
    def parse(self, html):
        soup = BeautifulSoup(html, 'html.parser')
        results = []
        for item in soup.select('.prouct-item'): 
            title = item.select_one('.product-title').get_text(strip=True)
            price = item.select_one('.product-price').get_text(strip=True)
            link = item.select_one('a')['href']
            results.append({
                'title': title,
                'price': price,
                'link': link
            })
        return results