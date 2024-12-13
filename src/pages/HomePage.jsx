import React,{ useEffect }  from "react";
import hiringImg from "../assets/hiringLens.png";
import { useNavigate } from "react-router-dom";
import {stepsToUse} from "../components/Data"


const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="outerDiv -mt-2 ">

      <div className="bg-homeColor dark:bg-homeColor-darkMode">
        <div className="innerDiv  ">
          <div className="flex flex-col-reverse sm:flex-row justify-start items-center py-10 ">
            <div className="sm:w-1/2 w-full flex justify-end sm:justify-center px-6 sm:px-0">
              <img
                src={hiringImg}
                alt="hiring image"
                className="h-44 sm:h-56 lg:h-80 object-contain  dark:mix-blend-luminosity"
              />
            </div>
            <div className="sm:w-1/3 w-full px-6 sm:px-0  flex flex-col gap-2">
              <div className="text-xs md:text-sm font-semibold tracking-wider text-brandColor-dark dark:text-gray-950">
                WORKIO FOR EMPLOYERS
              </div>
              <div className="text-2xl md:text-4xl  font-light leading-9 text-white italic">
                Let's hire your next great candidate. Fast.
              </div>

              <div className="text-xs leading-4 tracking-wide text-black ">
                No matter the skills, experience or qualifications you're
                looking for, you'll find the right people here.
              </div>
              <div>
                <button
                  onClick={() => navigate("/createNewJobPost")}
                  className=" px-4 py-2 mt-2 rounded-md bg-brandColor-dark  text-white hover:bg-brandColor active:scale-95 transition-all duration-300 ease-in-out"
                >
                  Post a job
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="innerDiv p-2 py-4 pb-20">
        <div className="text-center my-4 mb-10 text-xl font-bold tracking-wide text-brandColor-dark dark:text-darkColor-text px-2">
          How to use Workio for employers?
        </div>

        <div className="grid grid-cols-12 gap-4 px-10">
          {stepsToUse.map((element, index) => (
            <div key={index} className="sm:col-span-4 col-start-2 col-end-12  sm:p-4 p-2 pb-4 rounded-md flex flex-col gap-2 shadow-md shadow-gray-400 dark:shadow-darkColor-text dark:bg-darkColor bg-white">
              <div className="font-semibold text-brandColor-dark dark:text-darkColor-text">
                {element.index}
              </div>
              <div className="font-bold  text-lg">{element.title}</div>
              <div className="font-light leading-5 text-sm">
                {element.description}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-homeColor-light dark:bg-homeColor-darkModeLight">
      <div className="innerDiv   p-2 py-4 pb-20">
        <div className="text-center my-4 mb-10  text-xl font-bold tracking-wide text-brandColor-dark dark:text-gray-950">Why Workio?</div>

        <div className="sm:w-9/12 w-full px-10 flex flex-col gap-8 mt-10">
            <div className="font-bold text-4xl tracking-wide text-brandColor dark:text-gray-900 text-center sm:text-start">Save time and effort in your recruitment journey.</div>
            <div className=" text-xl font-light leading-6 text-center sm:text-start dark:text-gray-800">Finding the best fit for the job shouldn’t be a full-time job. Workio lets you post your needs. And helps you to find the best applicants.</div>
         </div>
      
      </div>
      </div>


     

    </div>
  );
};

export default HomePage;
