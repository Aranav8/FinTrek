# FinTrek API

[![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/) [![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](https://expressjs.com/) [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/) [![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io)

This repository contains the backend API for **FinTrek**, a personal finance tracking application. This server is built with Node.js and Express and provides a complete set of RESTful endpoints to handle financial data. It uses a serverless PostgreSQL database from [Neon](https://neon.tech/) and serverless Redis from [Upstash](https://upstash.com/) for rate limiting.

## Frontend Application

The frontend for this application is a React-based web app that provides a user-friendly interface for managing finances.

**You can find the frontend repository here:** [**FinTrek-App**](https://github.com/Aranav8/FinTrek-App)

## Features

-   **Full CRUD for Transactions**: Create, read, delete, and manage financial transactions.
-   **User-Specific Data**: All transactions are linked to a specific user ID.
-   **Financial Summaries**: An endpoint to quickly calculate and retrieve a user's total balance, income, and expenses.
-   **Robust Rate Limiting**: Protects the API from spam and abuse using a sliding window rate limiter.
-   **Automated DB Setup**: The database schema is automatically initialized when the server starts.
-   **Keep-Alive Mechanism**: Includes a cron job to periodically ping the server, ensuring it stays active on free-tier hosting platforms.

## Technologies Used

-   **Backend**: [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)
-   **Database**: [Neon](https://neon.tech/) (Serverless PostgreSQL)
-   **Rate Limiting**: [Upstash](https://upstash.com/) (Serverless Redis)
-   **Task Scheduling**: `node-cron`
-   **Environment Variables**: `dotenv`

---

## Getting Started

Follow these instructions to set up and run the backend server on your local machine.

### Prerequisites

-   [Node.js](https://nodejs.org/) (version 14 or newer recommended)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
-   A [Neon](https://neon.tech/) account and a new project to get a database URL.
-   An [Upstash](https://upstash.com/) account to get Redis credentials.

### Installation

1.  **Clone the backend repository:**
    ```sh
    git clone https://github.com/Aranav8/FinTrek-api.git
    cd FinTrek-api
    ```

2.  **Install the required dependencies:**
    ```sh
    npm install
    ```
    or
    ```sh
    yarn install
    ```

### Configuration

1.  In the root directory of the project, create a new file named `.env`.

2.  Copy the following structure into your `.env` file and replace the placeholder values with your actual credentials from Neon and Upstash.

    ```env
    # Neon Database Connection URL
    DATABASE_URL="your_neon_database_url"

    # Upstash Redis Credentials for Rate Limiting
    UPSTASH_REDIS_REST_URL="your_upstash_redis_url"
    UPSTASH_REDIS_REST_TOKEN="your_upstash_redis_token"

    # URL for the cron job to ping (your deployed application's health check URL)
    API_URL="http://localhost:5001/api/health"

    # Server Port
    PORT=5001

    # Set to 'production' when deploying
    NODE_ENV=development
    ```

### Running the Application

1.  **Start the server:**
    ```sh
    node index.js
    ```

2.  The API server will initialize the database and start listening on the port specified in your `.env` file (e.g., `http://localhost:5001`).

---

## API Endpoints

The base URL for all transaction-related endpoints is `/api/transactions`. All endpoints are protected by a rate limiter (100 requests per 60 seconds).

### Health Check

-   **GET `/api/health`**
    -   Checks the health of the service. Useful for uptime monitoring.
    -   **Response `200 OK`:**
        ```json
        {
          "status": "ok"
        }
        ```

### Transactions

-   **POST `/api/transactions`**
    -   Creates a new transaction.
    -   **Request Body:**
        ```json
        {
          "user_id": "some_user_id",
          "title": "Groceries",
          "amount": -75.50,
          "category": "Food"
        }
        ```
    -   **Response `201 Created`:** The newly created transaction object.

-   **GET `/api/transactions/:userId`**
    -   Retrieves all transactions for a specific user, sorted by the creation date.
    -   **Example:** `GET /api/transactions/user_123`
    -   **Response `200 OK`:** An array of transaction objects for the specified user.

-   **DELETE `/api/transactions/:id`**
    -   Deletes a transaction by its unique ID.
    -   **Example:** `DELETE /api/transactions/42`
    -   **Response `200 OK`:**
        ```json
        {
          "message": "Transaction deleted successfully"
        }
        ```

-   **GET `/api/transactions/summary/:userId`**
    -   Retrieves a financial summary for a specific user.
    -   **Example:** `GET /api/transactions/summary/user_123`
    -   **Response `200 OK`:**
        ```json
        {
          "balance": "1234.56",
          "income": "5000.00",
          "expenses": "-3765.44"
        }
        ```

---

## Deployment

-   To deploy this API, set the `NODE_ENV` variable to `production` in your hosting environment. This will activate the keep-alive cron job.
-   Ensure you update the `API_URL` environment variable to your production server's health check endpoint (e.g., `https://your-domain.com/api/health`).
-   This setup is ideal for deployment on platforms like Heroku, Render, or other services that might idle your application after periods of inactivity.
