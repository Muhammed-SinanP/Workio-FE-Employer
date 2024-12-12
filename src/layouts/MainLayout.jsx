import React, { useEffect } from "react";
import Header from "../components/header/Header";
import { Outlet, useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";
import { axiosInstance } from "../config/axiosInstance";
import { clearUserData, saveUserData } from "../redux/features/userSlice";
import SignHeader from "../components/header/SignHeader";
import SignFooter from "../components/footer/SignFooter";
import Footer from "../components/footer/Footer";
const MainLayout = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  async function checkUser() {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/user/checkUser/employer",
      });
      if (response.status === 200) {
        dispatch(saveUserData());
      } else {
        dispatch(clearUserData());
      }
    } catch (err) {
      console.log(err || "user not authorized");

      dispatch(clearUserData());
    }
  }

  useEffect(() => {
    checkUser();
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      {location.pathname == "/sign/login" ||
      location.pathname == "/sign/register" ? (
        <SignHeader />
      ) : (
        <Header />
      )}

      <div className="flex flex-col grow min-h-screen relative dark:bg-darkColor-light bg-gray-50 ">
        <Outlet />
      </div>
      {location.pathname == "/sign/login" ||
      location.pathname == "/sign/register" ? (
        <SignFooter />
      ) : (
        <Footer />
      )}
    </div>
  );
};

export default MainLayout;
