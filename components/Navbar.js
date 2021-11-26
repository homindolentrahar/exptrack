import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const navMenu = [
    { path: "/", name: "Expenses" },
    { path: "/new", name: "Add New" },
  ];
  const router = useRouter();
  const activeRoute = router.pathname;

  return (
    <nav className="flex flex-col items-center gap-12 py-4 border-b border-red-50">
      <Link href="/" passHref={true}>
        <div className="flex gap-4 items-center cursor-pointer">
          <Image src="/icons/money.png" width={32} height={32} alt="icon" />
          <h1 className="text-gray-900 text-2xl font-semibold">Exptrack</h1>
        </div>
      </Link>
      <ul className="flex gap-6 text-gray-400">
        {navMenu.map((menu) => (
          <Link href={menu.path} passHref={true} key={menu.path}>
            <a
              className={`px-6 py-2 font-medium rounded-md hover:text-red-500 hover:bg-red-50 cursor-pointer ${
                menu.path === activeRoute ? "bg-red-100 text-red-500" : ""
              }`}
            >
              {menu.name}
            </a>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
