import "./sidebar.css";
import { NavLink } from "react-router";
import ActiveIcon from "./ActiveIcon";
import InactiveIcon from "./InactiveIcon";
export default function Sidebar() {
  const Links = [
    { to: "/", label: "Product", icon: "product" },
    // { to: "/saleshistory", label: "Sales History", icon: "salesHistory" },
    { to: "/order", label: "Order" },
    { to: "/inventoryManager", label: "inventory Manager" },
  ];
  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <h3>SoleTeeN</h3>
      </div>

      {Links.map((link) => (
        <NavLink
          className={({ isActive }) =>
            "sidebar__link" + (isActive ? " sidebar__link--active" : "")
          }
          key={link.to}
          to={link.to}
        >
          {({ isActive }) => (
            <>
              {isActive ? (
                <ActiveIcon icon={link.icon} />
              ) : (
                <InactiveIcon icon={link.icon} />
              )}
              <span>{link.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
}
