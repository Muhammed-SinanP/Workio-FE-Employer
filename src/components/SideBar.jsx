import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import RegisterBtn from "./buttons/RegisterBtn";
import LoginBtn from "./buttons/LoginBtn";
import { userOptions } from "./Data";
import HomeIcon from "@mui/icons-material/Home";
import { useConfirm } from "material-ui-confirm";
import { axiosInstance } from "../config/axiosInstance";
const SideBar = ({ sideBarOpen, setSideBarOpen }) => {
  const userLoggedIn = useSelector((state) => state.user.userLoggedIn);
  const confirm = useConfirm();
  const navigate = useNavigate();
  function handleLogout() {
    async function userLogout() {
      try {
        const response = await axiosInstance({
          method: "POST",
          url: "/auth/logout",
        });
        if (response.status === 200) {
          navigate("/sign/login");
        }
      } catch (err) {
        console.log("logout err occured", err);
      }
    }

    confirm({
      title: "Logout Confirmation",
      description: "Are you sure you want to do logout?",
      confirmationText: "Confirm",
    })
      .then(() => {
        userLogout();
      })
      .catch(() => {
        console.log("logout cancelled");
      });
  }
  return (
    <div
      id="sideBar"
      className={`fixed overflow-auto flex w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 2xl:w-1/6  bg-gray-50 dark:bg-darkColor  z-10 left-0 top-0 h-screen transform transition-transform duration-400 ease-in-out ${
        sideBarOpen
          ? "translate-x-0 shadow-md shadow-black"
          : "-translate-x-full"
      }`}
      onClick={() => setSideBarOpen(false)}
    >
      <div className="h-full w-full flex flex-col  py-2">
        <CloseIcon
          className="absolute right-1 top-1 text-gray-600 dark:text-darkColor-text cursor-pointer hover:text-gray-800 dark:hover:text-darkColor-text p-0.5"
          fontSize="small"
        />
        {!userLoggedIn && (
          <div className="flex flex-wrap justify-start px-4 sm:justify-center gap-2 py-2 sm:hidden border-b">
            <LoginBtn />
            <RegisterBtn />
          </div>
        )}

        <div className="text-gray-600 dark:text-darkColor-text font-medium pl-4 mt-0.5">Pages</div>

        <div className=" flex flex-col gap-1 mt-2 h-full">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `mx-2 rounded-md px-4 py-1.5 text-xs sm:text-base font-semibold flex items-center gap-1 ${
                isActive
                  ? "bg-brandColor text-white"
                  : "bg-gray-200 dark:bg-darkColor-text text-black hover:bg-brandColor-light"
              }`
            }
          >
            <HomeIcon fontSize="small" /> Home
          </NavLink>
          {userLoggedIn &&
            userOptions &&
            userOptions.map((element, index) => (
              <NavLink
                key={index}
                to={element.path}
                className={({ isActive }) =>
                  `mx-2 rounded-md px-4 py-1.5 text-xs sm:text-base flex items-center gap-1  ${
                    isActive
                      ? "bg-brandColor text-white"
                      : "bg-gray-200 dark:bg-darkColor-text text-black hover:bg-brandColor-light"
                  }`
                }
              >
                {element.icon}
                {element.title}
              </NavLink>
            ))}
          <div className=" h-full w-full  flex flex-col justify-end py-4 mt-8">

          {userLoggedIn && (
            <div className=" flex justify-center w-full">
              <button
                className="px-2 py-1.5 rounded-md  flex items-center  bg-gray-900 shadow-md hover:bg-gray-700 text-white active:shadow-none"
                onClick={handleLogout}
              >
                <LogoutIcon fontSize="small" className="p-1" />
                <span className="text-xs">Logout</span>
              </button>
            </div>
          )}



          </div>
          
        </div>
      </div>
    </div>
  );
};

export default SideBar;
