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


  async function logout(){
    try {
      const response = await axiosInstance({
        method:"POST",
        url:"/auth/logout"
      })
      if(response.status===200){
      
        
        navigate("/sign/login")
      }
    } catch (err) {
      
    }
  }

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

      {/* <div
        id="sideBar"
        className={`fixed overflow-auto flex w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 2xl:w-1/6  bg-gray-50  z-10 left-0 top-0 h-screen transform transition-transform duration-400 ease-in-out ${
          sideBarOpen
            ? "translate-x-0 shadow-md shadow-black"
            : "-translate-x-full"
        }`}
        onClick={() => setSideBarOpen(false)}
      >
        <div className="h-full w-full relative">

        <CloseIcon className="absolute right-1 top-1 text-gray-600 cursor-pointer hover:text-gray-800 p-0.5" fontSize="small" />
         {!userLoggedIn && <div className="flex flex-wrap justify-start px-4 sm:justify-center gap-2 py-2 sm:hidden border-b"><LoginBtn />
            <RegisterBtn /></div> }

            
          
            <div className="text-gray-600 font-medium pl-4 mt-0.5">Pages</div>
          
          <div className=" flex flex-col gap-1 mt-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                ` px-4 py-1 font-semibold ${
                  isActive
                    ? "bg-brandColor text-white"
                    : "bg-gray-200 text-black hover:bg-brandColor-light"
                }`
              }
            >
              Home
            </NavLink>
            {userLoggedIn &&
              userOptions &&
              userOptions.map((element, index) => (
                <NavLink
                  key={index}
                  to={element.path}
                  className={({ isActive }) =>
                    ` px-4 py-1   ${
                      isActive
                        ? "bg-brandColor text-white"
                        : "bg-gray-200 text-black hover:bg-brandColor-light"
                    }`
                  }
                >
                  {element.title}
                </NavLink>
              ))}
          </div>
        {userLoggedIn && <div className="absolute bottom-4 flex justify-center w-full"><button className="p-2 rounded-md  btn bg-gray-900 shadow-md hover:bg-gray-700 text-white active:shadow-none" onClick={logout}><LogoutIcon fontSize="small"/><span className="text-sm">Logout</span></button></div>}

        </div>

      </div> */}
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


