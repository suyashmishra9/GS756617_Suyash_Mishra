import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex items-center justify-between fixed top-0 left-0 w-full z-50">
      <div className="flex items-center gap-2">
        <Link to="/">
          <img src="src/assets/gsynergy-logo.svg" alt="G Synergy Logo" className="h-12 w-auto cursor-pointer" />
        </Link>
        <h1 className="text-3xl font-semibold text-gray-800 absolute left-1/2 transform -translate-x-1/2">
          Data Viewer App
        </h1>
      </div>
      <FaUserCircle
        data-testid="user-icon"
        className="text-gray-600 text-2xl cursor-pointer hover:text-gray-900"
      />

    </nav>
  );
};

export default Navbar;
