from . import crawler_map as crawlers

if __name__ == "__main__": 
    dateTime = "2025-07-01T19"
    adult = 2
    city = "台北"
    budget = 2

    crawler = crawlers['inline']()
    print(crawler)
    results = crawler.search(dateTime, adult, city, budget)

    print(f"Found {len(results)} results:\n")
    if not results:
        print("No results found.")
    for result in results: 
        print(f"{result}\n")