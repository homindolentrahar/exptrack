import Head from "next/head";
import { useState } from "react";
import AddNew from "../components/AddNew";
import Expenses from "../components/Expenses";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [navIndex, setNavIndex] = useState(0);
  const navMenu = ["Expenses", "Add New"];

  return (
    <div className="w-9/12 h-screen flex flex-col justify-start items-center mx-auto">
      <Head>
        <title>💸 Expense Tracker</title>
        <meta
          name="description"
          content="Simple expense tracker with Next JS"
        />
      </Head>
      <main className="w-full p-6 flex flex-col items-center gap-8">
        <ul className="flex gap-6 text-gray-400">
          {navMenu.map((menu, index) => (
            <li
              key={index}
              className={`px-6 py-2 font-medium rounded-md hover:text-red-500 hover:bg-red-50 cursor-pointer ${
                index === navIndex ? styles.active : ""
              }`}
              onClick={() => setNavIndex(index)}
            >
              {menu}
            </li>
          ))}
        </ul>
        {navIndex === 0 ? (
          <Expenses />
        ) : (
          <AddNew backToExpenses={() => setNavIndex(0)} />
        )}
      </main>
      <footer className=""></footer>
    </div>
  );
}
