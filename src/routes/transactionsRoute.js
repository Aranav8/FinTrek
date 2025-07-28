const {
    createTransactions,
    deleteTransactionsByUserId,
    getTransactionsByUserId,
    getSummaryByUserId
} = require("../controllers/transactionsController");

const express = require("express");

const router = express.Router();

router.post("/", createTransactions);

router.get("/:userId", getTransactionsByUserId);

router.delete("/:id", deleteTransactionsByUserId);

router.get("/summary/:userId", getSummaryByUserId);

module.exports = router;