from base import SeleniumCrawler
from bs4 import BeautifulSoup

class BookingCrawler(SeleniumCrawler):
    def search(self, contry, city, id, checkin, checkout, adults=1, children=0, rooms=1): 
        url = f"https://www.booking.com/searchresults.zh-tw.html"
        params = {
            'ss': f"{city}%2C+{contry}",
            'efdco': '1',
            'dest-id': f'{id}', 
            'checkin': f'{checkin}',
            'checkout': f'{checkout}',
            'group_adults': f'{adults}',
            'group_children': f'{children}',
            'no_rooms': f'{rooms}',
            'dest-type': 'city',
            'lang': 'zh-tw',
        }
        html = self.fetch(url, params)
        return self.parse(html)
    
    def parse(self, html):
        soup = BeautifulSoup(html, 'html.parser')
        items = soup.select('[data-testid="property-card"]')
        results = []

        for item in items: 
            title = item.select_one('[data-testid="title"]').get_text(strip=True)
            link = item.select_one('a')['href']
            price_elem = item.select_one('[data-testid="price-and-discounted-price"]')
            if price_elem is None:
                price = 0
            else:
                price = int(''.join(filter(str.isdigit, price_elem.get_text(strip=True).replace('TWD', ''))))

            results.append({
                'title': title,
                'price': price,
                'link': link
            })

        return results