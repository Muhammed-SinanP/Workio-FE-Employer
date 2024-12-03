import React from "react";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useNavigate } from "react-router-dom";

const RegisterBtn = () => {
  const navigate = useNavigate()
  return (
    <button onClick={()=>navigate("/sign/register")} className="btn text-xs font-medium bg-black text-white signBtn">
      <AppRegistrationIcon fontSize="small" className="p-1 pr-0" />
      Register
    </button>
  );
};

export default RegisterBtn;
