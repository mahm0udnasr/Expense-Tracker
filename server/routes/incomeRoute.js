const express = require("express");
const {
  addIncome,
  getAllIncome,
  deleteIncome,
  DownloadIncome,
} = require("../controllers/incomeController.js");

const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/add", protect, addIncome);
router.get("/get", protect, getAllIncome);
router.get("/download", protect, DownloadIncome);
router.delete("/:id", protect, deleteIncome);

module.exports = router;
