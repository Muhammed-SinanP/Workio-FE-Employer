import React from 'react'
import AuthForm from '../components/forms/AuthForm'
import { useState } from 'react';
import { useEffect } from 'react';

const RegisterPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    userConfirmPassword: "",
  });
  return (
    <div className="outerDiv">
      <div className="innerDiv  flex justify-center items-center mt-2 py-2 pb-4">
    <AuthForm isRegister={true} formData={formData} setFormData={setFormData}/>
    </div>
    </div>
  )
}

export default RegisterPage