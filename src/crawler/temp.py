from kkday import KKDayCrawler

if __name__ == "__main__": 
    crawler = KKDayCrawler()
    results = crawler.search("taipei")

    print(f"Found {len(results)} results:\n")
    if not results:
        print("No results found.")
    for result in results: 
        print(f"{result}\n")