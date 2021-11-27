import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.models.Expense ||
  mongoose.model("Expense", ExpenseSchema);
