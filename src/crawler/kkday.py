from base import BaseCrawler
from bs4 import BeautifulSoup

class KKDayCrawler(BaseCrawler):
    def search(self, contry, city, keyword): 
        # url = f"https://www.kkday.com/zh-tw/category/{contry}-{city}/{keyword}/list"
        url = "https://www.kkday.com/zh-tw/destination_api/ajax_get_mixed_destination_by_code"
        # url = "https://www.kkday.com/zh-tw/product/ajax_product_list"
        params = {
            # 'productCategory': "CATEGORY_020", 
            'destination': "D-TW-5013"
        }
        # json = {
        #     'productCategory': "CATEGORY_020", 
        #     'destination': "D-TW-5013",
        #     'page': 1,
        #     'limit': 20,
        #     'sort': "RECOMMEND",
        #     'keyword': keyword
        # }
        print(f"Fetching URL: {url}")
        self.warmup()
        # html = self.fetch(url)
        data = self.fetch_json(url, params=params)
        # data = self.fetch_json_post(url, json=json)
        print(f"Data fetched successfully: \n{data}")
        if not data or 'data' not in data or 'products' not in data['data']:
            print("No products found in the response.")
            return []
        return self.parse(data)
    
    # def parse(self, html):
    #     soup = BeautifulSoup(html, 'html.parser')
    #     results = []
    #     for item in soup.select('.prouct-item'): 
    #         id = item.select_one('.product-id').get_text(strip=True)
    #         title = item.select_one('.product-title').get_text(strip=True)
    #         price = item.select_one('.product-price').get_text(strip=True)
    #         link = item.select_one('a')['href']
    #         results.append({
    #             'id': id,
    #             'title': title,
    #             'price': price,
    #             'link': link
    #         })
    #     return results
    
    def parse(self, data): 
        result = []
        try:
            for item in data.get('data', {}).get('products', []): 
                result.append({
                    'id': item.get('product_id'),
                    'title': item.get('title'),
                    'price': item.get('price', {}).get('price'),
                    'link': f"https://www.kkday.com/zh-tw/product/{item.get('url')}"
                })
        except Exception as e:
            print(f"Error parsing data: {e}")
        return result
