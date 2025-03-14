import React from "react";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useNavigate } from "react-router-dom";

const RegisterBtn = () => {
  const navigate = useNavigate()
  return (
    <button onClick={() => navigate("/auth/register")} className=" bg-black dark:bg-gray-600 dark:border-gray-600 dark:hover:bg-brand-light dark:active:bg-brand-light sign-btn">
      <AppRegistrationIcon fontSize="small" className="p-1" />
      Register
    </button>
  );
};

export default RegisterBtn;
