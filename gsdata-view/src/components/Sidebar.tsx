import { NavLink } from "react-router-dom";
import { FaStore, FaBox, FaClipboardList, FaChartBar } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="w-60 h-[calc(100vh-64px)] bg-gray-100 fixed top-16 left-0 p-4">
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-md text-gray-700 hover:bg-gray-200 transition ${
              isActive ? "bg-gray-300 font-semibold" : ""
            }`
          }
        >
          <FaStore className="text-lg" />
          Store
        </NavLink>

        <NavLink
          to="/skus"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-md text-gray-700 hover:bg-gray-200 transition ${
              isActive ? "bg-gray-300 font-semibold" : ""
            }`
          }
        >
          <FaBox className="text-lg" />
          SKU
        </NavLink>

        <NavLink
          to="/planning"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-md text-gray-700 hover:bg-gray-200 transition ${
              isActive ? "bg-gray-300 font-semibold" : ""
            }`
          }
        >
          <FaClipboardList className="text-lg" />
          Planning
        </NavLink>

        <NavLink
          to="/chart"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-md text-gray-700 hover:bg-gray-200 transition ${
              isActive ? "bg-gray-300 font-semibold" : ""
            }`
          }
        >
          <FaChartBar className="text-lg" />
          Charts
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
