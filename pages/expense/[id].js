import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import Head from "next/head";
import { useEffect, useState } from "react";

export async function getStaticPaths() {
  let expenses;
  const res = await fetch("http://localhost:3000/api/expenses");
  const data = await res.json();

  if (data.status === "success") {
    expenses = data.data;
  } else {
    expenses = [];
  }

  const paths = expenses.map((expense) => ({ params: { id: expense._id } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  let expense;
  const res = await fetch(`http://localhost:3000/api/expenses/${params.id}`);
  const data = await res.json();

  if (data.status === "success") {
    expense = data.data;
  } else {
    expense = {};
  }

  return {
    props: { expense },
  };
}

const DetailExpense = ({ expense }) => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [nameError, setNameError] = useState("");
  const [amountError, setAmountError] = useState("");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setName(expense.name);
    setAmount(expense.amount);
  }, [expense]);

  const handleSave = async (e) => {
    e.preventDefault();

    if (name !== "" && parseInt(amount) !== 0) {
      setNameError("");
      setAmountError("");

      setShowError(false);

      const update = {
        name: name,
        amount: parseInt(amount),
        date: expense.date,
      };

      await fetch(`http://localhost:3000/api/expenses/${expense._id}`, {
        method: "PATCH",
        body: JSON.stringify(update),
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

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/api/expenses/${id}`, {
      method: "DELETE",
    });

    router.push("/");
  };

  return (
    <div className="w-1/2 mx-auto p-6 flex flex-col items-center gap-16">
      <Head>
        <title>{name}</title>
        <meta name="description" content="Detail of expense item" />
      </Head>

      <div className="w-full flex justify-between">
        <Link href="/" passHref={true}>
          <div className="p-3 bg-gray-800 text-white cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </Link>
        <div
          className="p-3 bg-red-50 text-red-500 cursor-pointer hover:bg-red-100"
          onClick={() => handleDelete(expense._id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>
      </div>
      <form
        method="POST"
        className="w-full flex flex-col items-center gap-8"
        onSubmit={handleSave}
      >
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
          <div className="flex flex-col gap-4 items-center">
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
        <button className="w-full p-4 text-white text-lg font-bold bg-red-500 rounded-md hover:bg-red-600 ">
          Submit
        </button>
      </form>
    </div>
  );
};

export default DetailExpense;
