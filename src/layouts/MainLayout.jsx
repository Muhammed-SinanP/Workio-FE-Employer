import React, { useEffect } from "react";
import Header from "../components/header/Header";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../config/axiosInstance";
import { clearUserData, saveUserData } from "../redux/features/userSlice";
import SignHeader from "../components/header/SignHeader";
import SignFooter from "../components/footer/SignFooter";
import Footer from "../components/footer/Footer";
const MainLayout = () => {
  const dispatch = useDispatch();
  const { initialized, userLoggedIn } = useSelector((state) => state.user);
  const location = useLocation();

  async function checkUser() {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/auth/checkUser",
      });
      if (response.status === 200) {
        dispatch(saveUserData());
      } else {
        dispatch(clearUserData());
      }
    } catch (err) {
      dispatch(clearUserData());
    }
  }

 
  console.log(initialized);

  useEffect(() => {
     checkUser();
  }, [location.pathname]);
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    document.documentElement.setAttribute("data-theme", theme);
  }, []);
  return (

    initialized ?
      <div className="flex min-h-screen flex-col bg-brand-extralight dark:bg-dark-light">
        
        {
          location.pathname == "/auth/login" ||
            location.pathname == "/auth/register" ? (
            <SignHeader />
          ) : (
            <Header />
          )
        }

        <div className="relative flex grow flex-col">
          <Outlet />
        </div>
        {
          location.pathname == "/auth/login" ||
            location.pathname == "/auth/register" ? (
            <SignFooter />
          ) : (
            <Footer />
          )
        }
      </div >

      :

      <div className="min-h-screen dark:bg-dark-light bg-brand-extralight flex justify-center items-center">
        <span className="loading loading-bars loading-lg text-brand"></span>
      </div>

  );
};

export default MainLayout;
