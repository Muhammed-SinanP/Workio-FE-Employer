import React from 'react'
const brandLogo = "/logo.png"
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate("/")} className="cursor-pointer flex gap-0.5 items-center">
      <img src={brandLogo} alt="brand logo" className="h-8" />
      <div>
        <h1 className="font-brand-font text-2xl text-brand">
          <span className="text-3xl">W</span>
          <span className="-ml-1">orkio</span>
        </h1>
        <h2 className="-mt-2 text-xs font-brand-font text-brand-dark dark:text-white ml-4 ">
          for employers
        </h2>
      </div>
    </div>
  )
}

export default Logo