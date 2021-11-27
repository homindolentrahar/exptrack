import Link from "next/link";

const ExpenseItem = ({ item }) => {
  const { _id: id, name, amount, date } = item;

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <Link href={`/expense/${id}`} passHref={true}>
      <div className="w-full flex justify-between items-center px-6 py-4 bg-white border-2 border-gray-50 rounded-md cursor-pointer hover:shadow">
        <div className="flex flex-col items-start">
          <p className="text-gray-400 text-xs">{formatDate(date)}</p>
          <h1 className="mt-1 text-gray-700 text-lg font-medium">{name}</h1>
        </div>
        <div
          className={`px-4 py-2 rounded-md text-white " ${
            amount > 0
              ? "bg-green-500"
              : amount === 0
              ? "bg-gray-400 text-gray-800"
              : "bg-red-500"
          }`}
        >
          <p className="font-bold">
            <span className="font-medium text-sm">$</span> {amount}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ExpenseItem;
