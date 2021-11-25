import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const BalanceCard = () => {
  const { expenses } = useContext(GlobalContext);
  const income = expenses
    .filter((each) => each.amount > 0)
    .reduce((total, each) => (total += each.amount), 0);
  const outcome = expenses
    .filter((each) => each.amount < 0)
    .reduce((total, each) => (total += each.amount), 0);

  return (
    <div className="w-9/12 grid grid-cols-2 self-center place-items-center py-4 px-6 rounded-md bg-white border-2 border-gray-100">
      <div className="flex flex-col items-center gap-1 w-full">
        <h1 className="flex gap-1 items-end text-green-500 text-3xl font-bold">
          <span className="text-lg">$</span>
          {income}
        </h1>
        <p className="text-gray-400 text-sm">Income</p>
      </div>
      <div className="flex flex-col items-center gap-1 w-full">
        <h1 className="flex gap-1 items-end text-red-500 text-3xl font-bold">
          <span className="text-lg">$</span>
          {outcome}
        </h1>
        <p className="text-gray-400 text-sm">Outcome</p>
      </div>
    </div>
  );
};

export default BalanceCard;
