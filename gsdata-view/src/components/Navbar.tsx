import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img src="src/assets/gsynergy-logo.svg" alt="G Synergy Logo" className="h-12 w-auto" />
        <h1 className="text-3xl font-semibold text-gray-800 absolute left-1/2 transform -translate-x-1/2">
          Data Viewer App
        </h1>
      </div>
      <FaUserCircle className="text-gray-600 text-2xl cursor-pointer hover:text-gray-900" />
    </nav>
  );
};

export default Navbar;
