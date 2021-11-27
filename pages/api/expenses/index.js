import Expense from "../../../models/Expense";
import databaseConnect from "../../../db/connect";

export default async function handler(req, res) {
  const { method } = req;

  await databaseConnect();

  switch (method) {
    case "GET":
      try {
        const expenses = await Expense.find({}).sort({ date: -1 });

        res.status(200).json({
          status: "success",
          length: expenses.length,
          data: expenses,
        });
      } catch (error) {
        res.status(500).json({
          status: "error",
          message: error,
        });
      }
      break;
    case "POST":
      try {
        const expense = await Expense.create(req.body);

        res.status(201).json({
          status: "success",
          message: `Success adding item with specific id: ${expense.id}`,
        });
      } catch (error) {
        res.status(500).json({
          status: "error",
          message: error,
        });
      }
      break;
    default:
      res.status(500).json({
        status: "error",
        message: "Something went wrong",
      });
  }
}
