import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";


const LoginBtn = () => {
  const navigate = useNavigate()
  return (
    <button onClick={() => navigate("/auth/login")} className=" bg-brand dark:hover:bg-brand-light dark:active:bg-brand-light sign-btn">
      <PersonIcon fontSize="small" className="p-1"/> Login
    </button>
  );
};

export default LoginBtn;