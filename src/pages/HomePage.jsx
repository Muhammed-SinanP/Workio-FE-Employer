import React,{ useEffect }  from "react";
const hiringImg = "/hiring.png";
import { useNavigate } from "react-router-dom";
import {stepsToUse} from "../components/Data"


const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="-mt-2 ">

      <div className="bg-brand-light dark:bg-dark">
        <div className="inner-div flex flex-col-reverse sm:flex-row justify-start items-center py-14">
            <div className="sm:w-1/2 -mt-4 w-full flex justify-end sm:justify-center ">
              <img
                src={hiringImg}
                alt="hiring image"
                className="h-80 object-contain  "
              />
            </div>
            <div className="sm:w-1/2 lg:w-1/3 w-full   flex flex-col gap-2">
              <div className="text-sm font-semibold tracking-wider text-brand-dark dark:text-brand-light">
                WORKIO FOR EMPLOYERS
              </div>
              <div className="text-2xl md:text-4xl  font-light  text-white italic">
                Let's hire your next great candidate. Fast!
              </div>

              <div className="text-sm font-para-font  tracking-wider text-brand-dark dark:text-brand-light ">
                No matter the skills, experience or qualifications you're
                looking for, you'll find the right people here.
              </div>
              <div>
                <button
                  onClick={() => navigate("/newJobPost")}
                className="btn text-base tracking-wide bg-white dark:bg-dark-text dark:hover:bg-brand dark:active:bg-brand  text-brand-dark hover:bg-brand-dark hover:text-white active:bg-brand-dark active:text-white font-semibold border-none "
                >
                  Post a job
                </button>
              </div>
            
          </div>
        </div>
      </div>

      <div className="inner-div dark:bg-dark-text pb-20">
        <div className="text-center my-4 mb-10 text-xl font-bold tracking-wide text-brand-dark  px-2">
          How to use Workio for employers?
        </div>

        <div className="grid grid-cols-12 gap-4 px-10 lg:px-0">
          {stepsToUse.map((element, index) => (
            <div key={index} className="col-span-12 sm:col-span-6 lg:col-span-3 bg-white dark:bg-dark-input dark:text-dark-text border-0.5 border-brand dark:border-brand-light  rounded-lg p-6 flex flex-col gap-2">
              <div className="font-semibold text-xl text-brand dark:text-brand-light">
                {element.index}
              </div>
              <div className="font-bold text-brand dark:text-brand-light text-lg">{element.title}</div>
              <div className="font-para-font text-sm">
                {element.description}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      
      <div className="inner-div bg-brand-light dark:bg-dark-light  pb-20">
        <div className="text-center my-4 mb-10  text-xl font-bold tracking-wide text-brand-dark dark:text-dark-text">Why Workio?</div>

        <div className="sm:w-9/12 w-full px-10 flex flex-col gap-8 mt-10">
            <div className="font-bold text-4xl tracking-wide text-brand-dark text-center sm:text-start">Save time and effort in your recruitment journey.</div>
            <div className=" text-xl  font-light text-center sm:text-start text-brand-dark dark:text-dark-text">Finding the best fit for the job shouldn’t be a full-time job. Workio lets you post your needs. And helps you to find the best applicants.</div>
         </div>
      
      </div>
      


     

    </div>
  );
};

export default HomePage;
