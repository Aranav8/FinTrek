const express = require("express");
const dotenv = require("dotenv");
const ratelimiter = require("./middleware/rateLimiter.js");
const transactionsRoute = require("./routes/transactionsRoute.js");
const { initDB } = require("./config/database.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(ratelimiter);
app.use(express.json());

app.use("/api/transactions", transactionsRoute);

initDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on PORT: ", PORT)
    })
})