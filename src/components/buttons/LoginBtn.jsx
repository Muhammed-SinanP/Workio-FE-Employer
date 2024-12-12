import React from "react";

import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

const LoginBtn = () => {
  const navigate = useNavigate()
  return (
    <button onClick={()=>navigate("/sign/login")} className=" bg-white dark:bg-gray-100 dark:border-gray-100 text-black text-xs font-medium signBtn">
      <PersonIcon fontSize="small" className="p-1 pr-0"/> Login
    </button>
  );
};

export default LoginBtn;