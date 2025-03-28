import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import LoginBtn from "../buttons/LoginBtn";
import RegisterBtn from "../buttons/RegisterBtn";
import { useSelector } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import { NavLink } from "react-router-dom";
import SideBar from "../SideBar";
import Logo from "../Logo";
import SignInBtn from "../buttons/SignInBtn";

const Header = () => {
  const userLoggedIn = useSelector((state) => state.user.userLoggedIn);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [headShadow, setHeadShadow] = useState(false);

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
                `flex items-center font-semibold text-sm sm:text-base border-b-2 rounded-r-sm sm:border-b-3 tracking-wide pb-1.5  ${isActive
                  ? "border-brand dark:border-brand-light dark:text-brand-light text-brand"
                  : "border-transparent hover:border-brand dark:hover:border-brand-light dark:text-dark-text hover:text-brand dark:hover:text-brand-light"
                }`
              }
            >New post <AddIcon fontSize="small" />
            </NavLink>

          </div>
        ) : (
          <div className="flex gap-2 ">
            <span className="hidden sm:block"><LoginBtn /></span>
            <span className="hidden sm:block"><RegisterBtn /></span>
            <span className="sm:hidden"><SignInBtn /></span>
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


