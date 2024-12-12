import React from 'react'
import brandLogo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Logo = () => {
    const navigate = useNavigate()
  return (
    <div onClick={() => navigate("/")} className="cursor-pointer flex gap-0.5 pb-1.5 items-center">
            <img src={brandLogo} alt="brand logo" className="h-8" />
            <div>
              <span className="text-2xl font-bold text-brandColor-dark font-brandFont dark:text-gray-100 ">
                Workio
              </span>
              <div className="-mt-2 text-xs text-brandColor ml-4 dark:text-darkColor-text">
                for employers
              </div>
            </div>
          </div>
  )
}

export default Logo