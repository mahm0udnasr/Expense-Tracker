const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { isValidObjectId, Types } = require("mongoose");

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));
    // fetching total income
    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    // fetching total expenses
    const totalExpenses = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    // get income transactions in the last 60 days
    const last60DaysIncomeTransactions = await Income.find({
      userId,
      dare: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });
    // get total income for last 60 days
    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );
    // get expense transactions in the last 30 days
    const last30DaysExpenseTransactions = await Expense.find({
      userId,
      dare: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });
    // get total Expense for last 30 days
    const expenseLast60Days = last30DaysExpenseTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );
    // fetch last 5 transactions (income + expenses)
    const lastTransactions = [
      ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (txn) => ({
          ...txn.toObject(),
          type: "income",
        })
      ),
      ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (txn) => ({
          ...txn.toObject(),
          type: "expense",
        })
      ),
    ].sort((a, b) => b.date - a.date);
    res.json({
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpenses[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpenses: totalExpenses[0]?.total || 0,
      last30DaysExpenses: {
        total: expenseLast60Days,
        transactions: last30DaysExpenseTransactions,
      },
      last60DaysIncome: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransactions,
      },
      recentTransactions: lastTransactions,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error In Get Dashboard Data",
      error: err.message,
    });
  }
};
