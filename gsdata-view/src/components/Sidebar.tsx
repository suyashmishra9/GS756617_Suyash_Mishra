import { NavLink } from "react-router-dom";
import { FaStore, FaBox, FaClipboardList, FaChartBar } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="w-60 h-[calc(100vh-64px)] bg-gray-100 fixed top-16 left-0 p-4 z-2">
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-md text-gray-700 hover:bg-gray-200 transition ${
              isActive ? "bg-gray-300 font-semibold" : ""
            }`
          }
        >
          <FaStore className="text-lg" data-testid="store-icon" />
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
          <FaBox className="text-lg" data-testid="sku-icon" />
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
          <FaClipboardList className="text-lg" data-testid="planning-icon" />
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
          <FaChartBar className="text-lg" data-testid="charts-icon" />
          Charts
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
