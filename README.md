# Final Project -- Booking Platform

## Introduction

This is a hybrid Next.js + Python app that uses Next.js as the frontend and Flask as the API backend. One great use case of this is to write Next.js apps that use Python AI libraries on the backend.

## Backend by samklin33
### Start
to start backend, you need you set up a local postgreSQL database
1. start the postgresql after download
    ```bash
    sudo -i -u postgres
    psql
    ```
2. create user and database
    ```sql 
    -- create user 
    CREATE USER your_username WITH PASSWORD 'your_password';
    -- create database
    CREATE DATABASE mydatabase;
    -- grant database privileges to user
    GRANT ALL PRIVILEGES ON DATABASE mydatabase TO my_username;
    ```
3. update `.env` file
    
    rename `.env.example` to `.env` and modify
    ```env
    SQLALCHEMY_DATABASE_URI=postgresql://<username>:<password>@localhost:5432/<databasename>
    SECRET_KEY=supersecretkey
    SECRET_KEY=supersecretkey
    JWT_ACCESS_TOKEN_EXPIRES=           # in seconds
    JWT_REFRESH_TOKEN_EXPIRES=          # in seconds
    ```
4. create table
    ```bash 
    pip install -r requirements.txt
    python3 -m src.api.index
    ```
    then you can go back to postgresql to check the tables
    ```sql
    \c mydatabase -- goto database
    \dt           -- list tables in the database
    SELECT * FROM "user"   -- list the rows in the table "user", it should be empty
    ```
    you should see the tables you just created

### Update the database
You can update database through SQL syntax. You can also update through terminal command `curl`
```bash
curl -X <HTTP_METHOD> http://127.0.0.1:5000/<endpoint> \
-H "Content-Type: application/json" \
-d '{
  "key1": "value1",
  "key2": "value2"
}'
```
example, if you want to add a new user:
```bash
curl -X POST http://127.0.0.1:5000/users \
-H "Content-Type: application/json" \
-d '{
  "username": "alice123",
  "password": "mypassword"
}'
```
or if you want to modify an itinerary:
```bash
curl -X PUT http://localhost:5000/itineraries/<id> \
-H "Content-Type: application/json" \
-d '{
  "start": "Taipei",
  "destination": "Kaohsiung",
  "price": 980.0
}'
```

## Authentication

Authentication in this project is handled using JWT (JSON Web Tokens). Users must register and log in to receive a token, which is then used to access protected API endpoints.

### Register a New User

Send a POST request to the `/register` endpoint with a username and password:

```bash
curl -X POST http://127.0.0.1:5000/api/register \
-H "Content-Type: application/json" \
-d '{
  "username": "your_username",
  "password": "your_password"
}'
```

### Login

Send a POST request to the `/login` endpoint with your credentials to receive an access and refresh token:

```bash
curl -X POST http://127.0.0.1:5000/api/login \
-H "Content-Type: application/json" \
-d '{
  "username": "your_username",
  "password": "your_password"
}'
```

The response will include `access_token` and `refresh_token`.

### Access Protected Endpoints

Include the access token in the `Authorization` header as a Bearer token:

```bash
curl -X GET http://127.0.0.1:5000/api/protected \
-H "Authorization: Bearer <access_token>"
```

### Refresh Token

When the access token expires, use the refresh token to obtain a new access token:

```bash
curl -X POST http://127.0.0.1:5000/api/refresh \
-H "Authorization: Bearer <refresh_token>"
```

## Notes

- Tokens expire after a configurable time (see `.env`).
- Update the `.env` file with your own secret keys for production use.

## Crawler by samklin33
### Install dependancies

```bash
cd src/crawler
pip install -r requirements.txt
```

### Crawler function

Crawler code is in `src/crawler/` directory
```
src/crawler/
├── __init__.py         # initialization
├── requirements.txt    # Python dependencies for the crawler
├── temp.py             # Example usage script
├── kkday.py            # Crawler for kkday
└── base_crawler.py     # Abstract base class for all crawlers
```

### Start crawling

you can crawl kkday by executing `/src/crawler/temp.py` now.
```py
# src/crawler/temp.py
from kkday import KKDayCrawler

if __name__ == "__main__": 
    # since the search url in kkday is "www.kkday.com/<language>/category/<contry>-<city>/<product-category>/list"
    contry  = "jp"          # contry
    city = "tokyo"          # city
    keyword = "day-tours"   # product-category

    crawler = KKDayCrawler()
    results = crawler.search(contry, city, keyword)

    print(f"Found {len(results)} results:\n")
    if not results:
        print("No results found.")
    for result in results: 
        print(f"{result}\n")
```

you can also use terminal command to crawl now.

```bash
curl -X POST "http://localhost:5000/api/itineraries/search" -H "Content-Type: application/json" -d '{
  "type": "inline",
  "query": {
    "dateTime": "2025-07-01T19",
    "adult": 2,
    "city": "Taipei",
    "budget": 2
  }
}'
```

in body, `type` means the website you want to crawl, `query` contains the parameters, such as tour type, city and country, budget, etc.

now available website: <sup>1. </sup>kkday <sup>2. </sup>booking.com <sup>3. </sup>inline <sup>4. </sup>THSR <sup>5. </sup>TWR

parameters:

<div style="display: flex;">
<div style="width: 33%; padding-right: 0.3%;">

```
kkday:
1. country
2. city
3. keyword:
  "attraction-tickets" or
  "day-tours"
4. start date
5. end date
```

</div>
<div style="width: 33%; padding-left: 0.25%; padding-right: 0.25%;">

```
booking.com:
1. country
2. city
3. checkin date
4. checkout date
5. adults
6. children
7. rooms
```

</div>
<div style="width: 33%; padding-left: 0.25%; padding-right: 0.25%;">

```
inline:
1. time: ex. 2025-07-01T19
2. city
3. adult
4. budget: 2 to 4
```

</div>
</div>
<div style="display: flex;">
<div style="width: 49.5%; padding-left: 0.25%; padding-right: 0.25%;">

```
THSR:
1. start
2. destination
3. date
4. start time
```

</div>
<div style="width: 49.5%; padding-left: 0.25%; padding-right: 0.25%;">

```
TWR:
1. start
2. destination
3. date
4. start time
```

</div>
</div>

output:

<div style="display: flex;">
<div style="width: 33%; padding-right: 0.3%;">

```
kkday:
1. type: "kkday"
2. title: string
3. description: string
4. image: url
5. link: url
6. date: string
7. price: number
```

</div>
<div style="width: 33%; padding-left: 0.25%; padding-right: 0.25%;">

```
booking.com:
1. type: "booking.com"
2. title: string
3. description: string
4. image: url
5. link: url
6. city: string
7. start_date: string
8. end_date: string
9. price: number
```

</div>
<div style="width: 33%; padding-left: 0.25%; padding-right: 0.25%;">

```
inline:
1. type: "inline"
2. title: string
3. image: url
4. link: url
5. city: string
6. time: string[]
7. price: number
```

</div>
</div>
<div style="display: flex;">
<div style="width: 49.5%; padding-left: 0.25%; padding-right: 0.25%;">

```
THSR:
1. 
```

</div>
<div style="width: 49.5%; padding-left: 0.25%; padding-right: 0.25%;">

```
TWR:
1. 
```

</div>
</div>

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The Flask server will be running on [http://127.0.0.1:5328](http://127.0.0.1:5328) – feel free to change the port in `package.json` (you'll also need to update it in `next.config.js`).