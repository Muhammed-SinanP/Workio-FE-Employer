import React from "react";
import hiringImg from "../assets/hiringLens.png"
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate()
  
  return (
    <div className="outerDiv">
      <div className="innerDiv bg-[#64D8FF] ">
        <div className="flex  justify-start items-center py-10 ">
        <div className="w-1/2">
            <img src={hiringImg} alt="hiring image" className="h-80 object-contain" />
          </div>
          <div className="w-1/3  flex flex-col gap-2">
            <div className="text-xs font-semibold tracking-wider text-brandColor">WORKIO FOR EMPLOYERS</div>
            <div className="text-4xl font-light leading-9 text-white italic">Let’s hire your next great candidate. Fast.</div>
           
            <div className="text-xs leading-4 tracking-wide text-black "> No matter the skills, experience or qualifications you’re looking
            for, you’ll find the right people here.</div>
            <div><button onClick={()=>navigate("/createNewJobPost")} className="btn px-4 py-2 mt-1 shadow-md shadow-black border-brandColor-dark  bg-brandColor-dark text-white hover:bg-brandColor hover:border-brandColor   active:shadow-none active:translate-y-1 transition-all duration-200 ease-in-out">Post a job</button></div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default HomePage;
