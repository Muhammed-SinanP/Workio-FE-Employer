import React from "react";
import { navbarData } from "./Data";
import { NavLink } from "react-router-dom";

const PublicNavOptions = ({ setSideBarOpen }) => {
    return (
        navbarData &&
        navbarData.map((element, index) => (
            <NavLink
                onClick={() => setSideBarOpen(false)}
                key={index}
                to={element.path}
                className={({ isActive }) =>
                    `mx-2 flex items-center gap-1.5 rounded-md px-4 py-1.5 text-lg tracking-wide ${element.title == "Home" ? "font-medium" : "font-normal"
                    } ${isActive
                        ? "bg-brand-dark dark:bg-brand text-white"
                        : "bg-gray-300 hover:bg-brand hover:text-white dark:hover:text-brand-text dark:bg-dark-text dark:hover:bg-brand-light"
                    }`
                }
            >
                {element.icon} {element.title}
            </NavLink>
        ))
    );
};

export default PublicNavOptions;