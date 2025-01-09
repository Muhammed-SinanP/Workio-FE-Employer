import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import LoginBtn from "../buttons/LoginBtn";
import RegisterBtn from "../buttons/RegisterBtn";
import { useSelector } from "react-redux";
import AddIcon from '@mui/icons-material/Add';

import { NavLink, useNavigate } from "react-router-dom";
import { userOptions } from "../Data";

import brandLogo from "../../assets/logo.png";

import { axiosInstance } from "../../config/axiosInstance";
import SideBar from "../SideBar";
import DarkModeBtn from "../buttons/DarkModeBtn";
import Logo from "./Logo";

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
    <div
      className={`outerDiv sticky top-0 z-20 rounded-b-md border-b border-brandColor-dark ${
        headShadow ? "shadow-sm shadow-brandColor-dark" : "shadow-none"
      }`}
    >
      <div className=" bg-white dark:bg-darkColor flex justify-between items-end px-2 pt-1 rounded-b-md">
        <div className="w-1/4 sm:w-1/4 flex items-center gap-4">
          <MenuIcon 
            onClick={() => setSideBarOpen(true)}
            className="cursor-pointer text-gray-800 hover:text-gray-950 dark:hover:text-homeColor-darkModeLight mb-1 dark:text-darkColor-text"
          />
       <div className="flex items-end mb-1"><DarkModeBtn/></div>   
     
 
        </div>
        <div className="w-3/4 sm:w-1/4 flex items-center justify-end sm:justify-center gap-0.5 ">
          <Logo/>
        </div>
        {userLoggedIn ? (
          <div className="w-1/4 h-full hidden sm:flex gap-2 justify-end items-center mr-2">
            <NavLink
              to="/createNewJobPost"
              className={({ isActive }) =>
                `border-b-2 font-medium hover:text-brandColor h-full pb-1.5 flex items-center ${
                  isActive
                    ? " text-brandColor-dark dark:text-brandColor dark:border-brandColor border-brandColor-dark hover:text-brandColor-dark dark:hover:text-brandColor "
                    : " text-black dark:text-darkColor-text border-white dark:border-darkColor"
                }`
              }
              >Post a job<AddIcon fontSize="small"/>
            </NavLink>
     
          </div>
        ) : (
          <div className="w-1/4 hidden sm:flex gap-2 justify-end items-center pr-2 mb-2.5">
            <LoginBtn />
            <RegisterBtn />
          </div>
        )}
      </div>

  
<SideBar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen}/>

      <div
        className={`fixed top-0 left-0 w-full h-screen bg-black bg-opacity-30 transition-opacity duration-500 ${
          sideBarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setSideBarOpen(false)}
      ></div>
    </div>
  );
};

export default Header;


