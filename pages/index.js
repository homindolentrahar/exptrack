import Head from "next/head";
import Expenses from "../components/Expenses";

export async function getServerSideProps() {
  let expenses;
  const res = await fetch("http://localhost:3000/api/expenses");
  const data = await res.json();

  if (data.status === "success") {
    expenses = data.data;
  } else {
    expenses = [];
  }

  return {
    props: { expenses },
  };
}

export default function Home({ expenses }) {
  return (
    <div className="w-9/12 h-screen flex flex-col justify-start items-center mx-auto">
      <Head>
        <title>Expense Tracker</title>
        <meta
          name="description"
          content="Simple expense tracker with Next JS"
        />
      </Head>
      <main className="w-full p-6 flex flex-col items-center gap-8">
        <Expenses expenses={expenses} />
      </main>
    </div>
  );
}
