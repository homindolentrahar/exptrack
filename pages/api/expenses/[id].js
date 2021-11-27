import databaseConnect from "../../../db/connect";
import Expense from "../../../models/Expense";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  await databaseConnect();

  switch (method) {
    case "GET":
      try {
        const expense = await Expense.findOne({ _id: id });

        if (!expense) {
          return res.status(404).json({
            status: "error",
            message: `Expense item with specific id: ${id} not found`,
          });
        }

        res.status(200).json({
          status: "success",
          data: expense,
        });
      } catch (error) {
        res.status(500).json({
          status: "error",
          message: "Somethig went wrong",
        });
      }
      break;
    case "PATCH":
      try {
        const expense = await Expense.findOneAndUpdate({ _id: id }, req.body, {
          runValidators: true,
          new: true,
        });

        if (!expense) {
          return res.status(404).json({
            status: "error",
            message: `Expense item with specific id: ${id} not found`,
          });
        }

        res.status(200).json({
          status: "success",
          message: `Success updating item with specific id: ${id}`,
        });
      } catch (error) {
        res.status(500).json({
          status: "error",
          message: "Somethig went wrong",
        });
      }
      break;
    case "DELETE":
      try {
        const expense = await Expense.findOneAndDelete({ _id: id });

        if (!expense) {
          return res.status(404).json({
            status: "error",
            message: `Expense item with specific id: ${id} not found`,
          });
        }

        res.status(200).json({
          status: "success",
          message: `Success deleting item with specific id: ${id}`,
        });
      } catch (error) {
        res.status(500).json({
          status: "error",
          message: "Somethig went wrong",
        });
      }
      break;
    default:
      res.status(500).json({
        status: "error",
        message: "Somethig went wrong",
      });
  }
}
