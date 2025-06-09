from .base import SeleniumCrawler
from bs4 import BeautifulSoup

class InlineCrawler(SeleniumCrawler):
    def search(self, dateTime, adult, city, budget): 
        url = f"https://www.opentable.com.tw/s"
        params = {
            'dateTime': f"{dateTime}%3A00%3A00", 
            'adult': adult,
            'city': city, 
            'shouldUseLatLongSearch': 'false',
            'sortBy': 'web_conversion', 
            'priceBandIds[]': budget
        }
        html = self.fetch(url, params)
        return self.parse(html)
    
    def parse(self, html):
        soup = BeautifulSoup(html, 'html.parser')
        items = soup.select('[data-test="restaurant-card"]')
        results = []

        for item in items: 
            title_elem = item.select_one('[data-test="res-card-name"]')
            if title_elem:
                title = title_elem.get_text(strip=True)
            else:
                continue
            link_elem = item.select_one('a')
            if link_elem:
                link = link_elem['href']
            else:
                link = ''
            time_elem = item.select_one('[data-test="time-slots"]')
            time = []
            if time_elem:
                time_link = time_elem.select('a')
                for timelink in time_link:
                    time.append(timelink.get_text(strip=True))
            else:
                time = []

            results.append({
                'title': title,
                'link': link, 
                'time': time
            })

        return results