import React from 'react'
const brandLogo = "/logo.png"
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate("/")} className="cursor-pointer flex gap-0.5 pb-1.5 items-center">
      <img src={brandLogo} alt="brand logo" className="h-8" />
      <div>
        <span className="text-2xl  text-brand dark:text-brand-light font-brand-font  ">
          Workio
        </span>
        <div className="-mt-2 text-xs font-brand-font text-brand-dark dark:text-white  ml-4 ">
          for employers
        </div>
      </div>
    </div>
  )
}

export default Logo