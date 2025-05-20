import { assets } from "../assets/assets.ts";

interface NavbarProps {
  setToken: (token: string) => void;
}

const Navbar = ({ setToken }: NavbarProps) => {
  return (
    <nav className="flex items-center py-2 px-[4%] justify-between ">
      <img className="w-[max(10%,80px)]" src={assets.logo} alt="" />
      <button
        className="bg-gray-800 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm"
        onClick={() => setToken("")}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
