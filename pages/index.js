import Head from "next/head";
import Expenses from "../components/Expenses";

export async function getServerSideProps() {
  const res = await fetch("http://localhost:5000/expenses");
  const expenses = await res.json();

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
