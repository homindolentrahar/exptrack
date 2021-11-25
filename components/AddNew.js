import { v4 as uuidv4 } from "uuid";
import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";

const AddNew = ({ backToExpenses }) => {
  const { addExpense } = useContext(GlobalContext);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [nameError, setNameError] = useState("");
  const [amountError, setAmountError] = useState("");
  const [showError, setShowError] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();

    if (name !== "" && parseInt(amount) !== 0) {
      setNameError("");
      setAmountError("");

      setShowError(false);

      const data = {
        id: uuidv4(),
        name: name,
        amount: parseInt(amount),
        date: Date.now(),
      };
      addExpense(data);
      backToExpenses();
    } else {
      if (name === "") {
        setNameError("Name your spending!");
      } else {
        setName("");
      }
      if (parseInt(amount) === 0) {
        setAmountError("Specify how much you've spend!");
      } else {
        setAmountError("");
      }

      setShowError(true);
    }
  };

  return (
    <>
      <form method="POST" className="w-1/2 flex flex-col items-center gap-8">
        <div className="w-full flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Expense name"
            className="w-full px-4 py-2 placeholder-gray-300 text-gray-800 rounded-md border border-gray-100 outline-none focus:border-red-200 focus:ring focus:ring-red-100"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {showError ? (
            <p className="text-red-500 text-xs mx-2">{nameError}</p>
          ) : (
            <span></span>
          )}
          <div className="flex flex-col gap-4">
            <input
              type="number"
              name="amount"
              placeholder="Expense amount"
              className="w-full px-4 py-2 placeholder-gray-300 text-gray-800 rounded-md border border-gray-100 outline-none focus:border-red-200 focus:ring focus:ring-red-100"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            {showError ? (
              <p className="text-red-500 text-xs mx-2">{amountError}</p>
            ) : (
              <span></span>
            )}
            <p className="text-gray-400 text-sm text-center">
              Positive amount means{" "}
              <span className="text-green-500 font-bold">income</span>,{" "}
              <span className="text-red-500 font-bold">negative</span> one means
              outcome
            </p>
          </div>
        </div>
        <button
          className="w-full p-4 text-white text-lg font-bold bg-red-500 rounded-md hover:bg-red-600 "
          onClick={handleSave}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default AddNew;
