import React from 'react'
import { useEffect } from 'react';
import AuthForm from '../../components/forms/AuthForm';
const regImg = "/registerImg.png"

const RegisterPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <div className="inner-div flex flex-col gap-8 md:gap-0 md:flex-row  justify-evenly">
        <div className='md:w-1/2 mt-4 flex flex-col items-center'><div className='font-brand-font text-center capitalize text-2xl text-brand dark:text-brand-dark sm:text-4xl'>Start your talent hunt with us!</div>
          <img className="h-80 hidden md:block" src={regImg} alt="register img" />
          </div>
         <AuthForm isRegister={true} />
      </div>
    </div>
  )
}

export default RegisterPage