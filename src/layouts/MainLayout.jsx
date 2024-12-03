import React, { useEffect } from "react";
import Header from "../components/header/Header";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../config/axiosInstance";
import { clearUserData, saveUserData } from "../redux/features/userSlice";
import SignHeader from "../components/header/SignHeader";
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
      console.log(err.response?.data || "user not authorized");

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

      <div className="flex grow relative bg-blue-200">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
