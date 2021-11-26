import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/dist/client/router";

const New = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [nameError, setNameError] = useState("");
  const [amountError, setAmountError] = useState("");
  const [showError, setShowError] = useState(false);

  const handleSave = async (e) => {
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

      await fetch("http://localhost:5000/expenses", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      router.push("/");
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
      <form
        method="POST"
        className="w-1/2 flex flex-col items-center gap-8 mx-auto my-8"
        onSubmit={handleSave}
      >
        <Head>
          <title>Add New Expense</title>
          <meta name="description" content="Add new expense" />
        </Head>

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
              <span className="text-green-500 font-bold">income</span>, negative
              one means <span className="text-red-500 font-bold">outcome</span>
            </p>
          </div>
        </div>
        <button className="w-full p-4 text-white text-lg font-bold bg-red-500 rounded-md hover:bg-red-600 ">
          Submit
        </button>
      </form>
    </>
  );
};

export default New;
