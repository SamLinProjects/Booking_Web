from kkday import KKDayCrawler

if __name__ == "__main__": 
    contry  = "jp"
    city = "tokyo"
    keyword = "day-tours"

    crawler = KKDayCrawler()
    results = crawler.search(contry, city, keyword)

    print(f"Found {len(results)} results:\n")
    if not results:
        print("No results found.")
    for result in results: 
        print(f"{result}\n")