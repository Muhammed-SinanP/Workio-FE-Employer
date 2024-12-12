import React, { useEffect, useState } from "react";


import Logo from "./Logo";
import DarkModeBtn from "../buttons/DarkModeBtn";

const SignHeader = () => {
  const [headShadow, setHeadShadow] = useState(false);
  

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        setHeadShadow(true);
      } else {
        setHeadShadow(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      className={`outerDiv sticky top-0 z-10 rounded-b-md border-b border-brandColor-dark ${
        headShadow ? "shadow-sm shadow-brandColor-dark" : "shadow-none"
      }`}
    >
      <div className="innerDiv bg-white dark:bg-darkColor  py-1 rounded-b-md flex justify-between px-2">
        <Logo/><DarkModeBtn/>
      </div>
    </div>
  );
};

export default SignHeader;
