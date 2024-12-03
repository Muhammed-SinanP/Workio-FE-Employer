import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import brandLogo from "../../assets/logo.png";

const SignHeader = () => {
  const [headShadow, setHeadShadow] = useState(false);
  const navigate = useNavigate();

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
      <div className="innerDiv bg-white px-2 py-1 rounded-b-md">
        <div
          onClick={() => navigate("/")}
          className=" flex  justify-center gap-0.5 cursor-pointer"
        >
          <img src={brandLogo} alt="brand logo" className="h-8" />
          <div>
            <span className="text-2xl font-bold text-brandColor-dark font-brandFont">
              Workio
            </span>
            <div className="-mt-2 text-xs text-brandColor ml-4">
              for employers
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignHeader;
