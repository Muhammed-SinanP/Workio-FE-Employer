import React from "react";
import AuthForm from "../components/forms/AuthForm";
import { useState } from "react";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    
    userEmail: "",
    userPassword: "",
  });
 
  return (
    <div className="outerDiv">
      <div className="innerDiv bg-white flex justify-center items-center mt-4 py-4">
        <AuthForm isRegister={false} formData={formData} setFormData={setFormData}/>
      </div>
    </div>
  );
};

export default LoginPage;
