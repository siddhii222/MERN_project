const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");
const auth = require("../middleware/authMiddleware");


// ADD EXPENSE
router.post("/", auth, async (req, res) => {
  const { title, amount, category } = req.body;

  const expense = new Expense({
    user: req.user,
    title,
    amount,
    category
  });

  await expense.save();
  res.json(expense);
});


// GET EXPENSES
router.get("/", auth, async (req, res) => {
  const expenses = await Expense.find({ user: req.user });
  res.json(expenses);
});

module.exports = router;