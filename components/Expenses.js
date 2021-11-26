import BalanceCard from "./BalanceCard";
import ExpenseItem from "./ExpenseItem";

const Expenses = ({ expenses }) => {
  const balance = expenses
    .map((each) => each.amount)
    .reduce((total, each) => (total += each), 0);

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col items-center">
        <h1 className="flex gap-1 items-end text-gray-800 text-4xl font-bold">
          <span className="text-lg ">$</span>
          {balance}
        </h1>
        <p className="mt-2 text-gray-400 text-sm">Your balance</p>
      </div>
      <BalanceCard expenses={expenses} />
      {expenses.map((data) => (
        <ExpenseItem key={data.id} item={data} />
      ))}
    </div>
  );
};

export default Expenses;
