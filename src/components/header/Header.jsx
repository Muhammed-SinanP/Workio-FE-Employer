import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import LoginBtn from "../buttons/LoginBtn";
import RegisterBtn from "../buttons/RegisterBtn";
import { useSelector } from "react-redux";
import AddIcon from '@mui/icons-material/Add';

import { NavLink, useNavigate } from "react-router-dom";




import { axiosInstance } from "../../config/axiosInstance";
import SideBar from "../SideBar";
import DarkModeBtn from "../buttons/DarkModeBtn";
import Logo from "../Logo";
import SignInBtn from "../buttons/SignInBtn";

const Header = () => {
  const userLoggedIn = useSelector((state) => state.user.userLoggedIn);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [headShadow, setHeadShadow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        setHeadShadow(true);
      } else {
        setHeadShadow(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);




  return (
    // <div
    //   className={`outerDiv sticky top-0 z-20 rounded-b-md border-b border-brand-dark ${headShadow ? "shadow-sm shadow-brand-dark" : "shadow-none"
    //     }`}
    // >
    //   <div className=" bg-white dark:bg-dark flex justify-between items-end px-2 pt-1 rounded-b-md">
    //     <div className="w-1/4 sm:w-1/4 flex items-center gap-4">
    //       <MenuIcon
    //         onClick={() => setSideBarOpen(true)}
    //         className="cursor-pointer text-gray-800 hover:text-gray-950 dark:hover:text-homeColor-darkModeLight mb-1 dark:text-dark-text"
    //       />
    //       <div className="flex items-end mb-1"><DarkModeBtn /></div>


    //     </div>
    //     <div className="w-3/4 sm:w-1/4 flex items-center justify-end sm:justify-center gap-0.5 ">
    //       <Logo />
    //     </div>
    //     {userLoggedIn ? (
    //       <div className="w-1/4 h-full hidden sm:flex gap-2 justify-end items-center mr-2">
    //         <NavLink
    //           to="/createNewJobPost"
    //           className={({ isActive }) =>
    //             `border-b-2 font-medium hover:text-brand h-full pb-1.5 flex items-center ${isActive
    //               ? " text-brand-dark dark:text-brand dark:border-brand border-brand-dark hover:text-brand-dark dark:hover:text-brand "
    //               : " text-black dark:text-dark-text border-white dark:border-dark"
    //             }`
    //           }
    //         >Post a job<AddIcon fontSize="small" />
    //         </NavLink>

    //       </div>
    //     ) : (
    //       <div className="w-1/4 hidden sm:flex gap-2 justify-end items-center pr-2 mb-2.5">
    //         <LoginBtn />
    //         <RegisterBtn />
    //       </div>
    //     )}
    //   </div>


    //   <SideBar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />

    //   <div
    //     className={`fixed top-0 left-0 w-full h-screen bg-black bg-opacity-30 transition-opacity duration-500 ${sideBarOpen ? "opacity-100 visible" : "opacity-0 invisible"
    //       }`}
    //     onClick={() => setSideBarOpen(false)}
    //   ></div>
    // </div>
    <header className={`header  sticky top-0 ${headShadow ? "shadow-sm shadow-brand-dark dark:shadow-black border-none" : "shadow-none "
        }`}>

      <div className="w-1/4 flex justify-start  h-full">
        <MenuIcon
         fontSize="large"
              onClick={() => setSideBarOpen(true)}
              className="cursor-pointer  dark:text-dark-text"
          />
          </div>
      <div className="w-2/4 flex justify-center">
        <Logo />
        </div>
      <div className="w-1/4 flex justify-end">

        {userLoggedIn ? (
            <div className="absolute  -bottom-0">
              <NavLink
                to="/newJobPost"
                className={({ isActive }) =>
                  `flex items-center font-semibold text-sm sm:text-base border-b-2 rounded-r-sm sm:border-b-3 tracking-wide pb-2  ${isActive
                    ? "border-brand dark:border-brand-light dark:text-brand-light text-brand"
                    : "border-transparent hover:border-brand dark:hover:border-brand-light dark:text-dark-text hover:text-brand dark:hover:text-brand-light"
                  }`
                }
              >New post <AddIcon fontSize="small"/>
              </NavLink>

            </div>
          ) : (
            <div className="flex gap-2 ">
              <span className="hidden sm:block"><LoginBtn /></span>
              <span className="hidden sm:block"><RegisterBtn /></span> 
              <span className="sm:hidden"><SignInBtn/></span>
            </div>
          )}

      </div>

      <SideBar
        userLoggedIn={userLoggedIn}
        sideBarOpen={sideBarOpen}
        setSideBarOpen={setSideBarOpen}
      />
      <div
        className={`fixed left-0 top-0 h-screen w-full bg-black bg-opacity-30 transition-opacity duration-500  ${sideBarOpen ? "visible" : "invisible"
          }`}
        onClick={() => setSideBarOpen(false)}
      ></div>
    </header>
  );
};

export default Header;


