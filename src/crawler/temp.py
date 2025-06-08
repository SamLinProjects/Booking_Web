from booking import BookingCrawler

if __name__ == "__main__": 
    contry  = "tw"
    city = "taipei"
    id = "2637882"  # Example destination ID for Tokyo
    checkin = "2025-07-01"
    checkout = "2025-07-02"
    adults = 2
    children = 0
    rooms = 1

    crawler = BookingCrawler()
    results = crawler.search(contry, city, id, checkin, checkout, adults, children, rooms)

    print(f"Found {len(results)} results:\n")
    if not results:
        print("No results found.")
    for result in results: 
        print(f"{result}\n")