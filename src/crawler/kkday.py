from .base import SeleniumCrawler
from bs4 import BeautifulSoup

class KKDayCrawler(SeleniumCrawler):
    def search(self, contry, city, keyword, start_date=None, end_date=None): 
        url = f"https://www.kkday.com/zh-tw/category/{contry}-{city}/{keyword}/list"
        params = {
            'sale_date_from': start_date,
            'sale_date_to': end_date,
        }
        html = self.fetch(url, params)
        return self.parse(html)
    
    def parse(self, html):
        soup = BeautifulSoup(html, 'html.parser')
        items = soup.select('.product-listview')
        results = []

        for item in items: 
            title = item.select_one('span.product-listview__name').get_text(strip=True)
            price = int(''.join(filter(str.isdigit, item.select_one('div.kk-price-local__normal').get_text(strip=True))))
            image = item.select_one('.img-bg')['data-src']
            description = item.select_one('.description').get_text(strip=True)
            date = item.select_one('div.product-time-icon').get_text(strip=True).replace('最早可預訂日 ：\n                ', '')
            link = item.select_one('a')['href']

            results.append({
                'type': 'kkday',
                'title': title,
                'description': description,
                'image': image,
                'link': link, 
                'start_time': date,
                'price': price,
            })
        return results