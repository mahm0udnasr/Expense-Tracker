const express = require("express");
const {
  addExpense,
  getAllExpense,
  deleteExpense,
  DownloadExpense,
} = require("../controllers/incomeController.js");

const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/add", protect, addExpense);
router.get("/get", protect, getAllExpense);
router.get("/download", protect, DownloadExpense);
router.delete("/:id", protect, deleteExpense);

module.exports = router;
