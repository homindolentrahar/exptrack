import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex flex-col items-center gap-12 py-4 border-b border-red-50">
      <Link href="/" passHref={true}>
        <div className="flex gap-4 items-center cursor-pointer">
          <Image src="/icons/money.png" width={32} height={32} alt="icon" />
          <h1 className="text-gray-900 text-2xl font-semibold">Exptrack</h1>
        </div>
      </Link>
    </nav>
  );
};

export default Navbar;
