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
    cd api
    python index.py
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

### Notes

- Tokens expire after a configurable time (see `.env`).
- Update the `.env` file with your own secret keys for production use.

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