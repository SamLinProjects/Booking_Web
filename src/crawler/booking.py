from .base import SeleniumCrawler
from bs4 import BeautifulSoup

class BookingCrawler(SeleniumCrawler):
    def search(self, country, city, start_date, end_date, adults=1, children=0, rooms=1): 
        url = f"https://www.booking.com/searchresults.zh-tw.html"
        params = {
            'ss': f"{city}%2C+{country}",
            'efdco': '1',
            'checkin': f'{start_date}',
            'checkout': f'{end_date}',
            'group_adults': f'{adults}',
            'group_children': f'{children}',
            'no_rooms': f'{rooms}',
            'dest-type': 'city',
            'lang': 'zh-tw',
        }
        html = self.fetch(url, params)
        return self.parse(html, params)
    
    def parse(self, html, params):
        place = params['ss'].split('%2C+')[0] if '%2C+' in params['ss'] else params['ss'].replace('%2C+', ' ')
        start_date = params['checkin']
        end_date = params['checkout']

        soup = BeautifulSoup(html, 'html.parser')
        items = soup.select('[data-testid="property-card"]')
        results = []

        for item in items: 
            title = item.select_one('[data-testid="title"]').get_text(strip=True)
            description = item.select_one('[role="link"]').get_text(strip=True)
            image = item.select_one('[data-testid="image"]')['src']
            link = item.select_one('a')['href']
            price_elem = item.select_one('[data-testid="price-and-discounted-price"]')
            if price_elem is None:
                price = 0
            else:
                price = int(''.join(filter(str.isdigit, price_elem.get_text(strip=True).replace('TWD', ''))))

            results.append({
                'type': 'booking.com',
                'title': title,
                'description': description,
                'image': image,
                'link': link, 
                'start_place': place,
                'start_time': start_date,
                'end_time': end_date,
                'price': price
            })

        return results