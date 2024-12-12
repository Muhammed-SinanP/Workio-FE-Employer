import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router";

const MyJobPostsPage = () => {
  const [jobPosts, setJobPosts] = useState([]);
  const navigate = useNavigate();
  const [data, error, isLoading] = useFetch("/job/jobPosts/myJobPosts");
  useEffect(() => {
    setJobPosts(data);
  }, [data]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function calculateDays(date) {
    const createdDate = new Date(date);
    const currentDate = new Date();
    createdDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    const msDifference = currentDate - createdDate;
    const dateDiffernce = Math.floor(msDifference / (1000 * 60 * 60 * 24));

    if (dateDiffernce === 0) {
      return "today";
    }
    if(dateDiffernce === 1){
      return "yesterday"
    }
    return `${dateDiffernce} days ago`;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="outerDiv">
      <div className="text-center my-4 underline tracking-wide font-medium text-brandColor-dark dark:text-gray-200 text-lg">All Job Posts</div>
      <div className="innerDiv">
        {isLoading ? (
          <div className="px-10 py-4 text-center">Loading...</div>
        ) : (
          <div className="px-10 py-4 grid grid-cols-12 gap-4 justify-center min-h-44 content-center">
            {jobPosts &&
              jobPosts.length > 0 ?
              jobPosts.map((element, index) => (
                <div
                  className="flex text-center flex-col gap-1 border p-2 rounded-md shadow-md dark:shadow-darkColor-text dark:border-darkColor-text border-brandColor-dark xl:col-span-3 lg:col-span-4 sm:col-span-6 col-start-2 col-span-10  bg-white dark:bg-darkColor"
                  key={index}
                >
                  <div className="text-lg font-medium text-brandColor-dark dark:text-darkColor-text capitalize">
                    {element.title}
                  </div>
                  <div className="text-blue-500 hover:text-blue-700 text-sm tracking-wide">
                    <span
                      className="underline  cursor-pointer"
                      onClick={() =>
                        navigate(`/jobApplications/${element._id}`, {
                          state: { jobTitle: element.title },
                        })
                      }
                    >
                      View applications
                    </span>
                  </div>
                  <div className="capitalize text-sm ">
                    status:{" "}
                    <span
                      className={`${
                        element.status === "Open"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {element.status}
                    </span>
                  </div>
                  <div className="flex justify-between mt-4">
                    <div
                      className="text-blue-500 cursor-pointer text-sm hover:underline"
                      onClick={() => navigate(`/updateJobPost/${element._id}`)}
                    >
                      Update job details
                    </div>
                    <div className="text-xs flex items-end text-gray-500">
                      Posted {calculateDays(element.createdAt)}
                    </div>
                  </div>
                </div>
              )):
              <div className="px-10 py-4 text-center col-span-12">No job posts found. <span className="underline cursor-pointer text-brandColor hover:text-brandColor-dark" onClick={()=>navigate("/createNewJobPost")}>Post a job</span></div>
              
              }
          </div>
        )}
      </div>
    </div>
  );
};

export default MyJobPostsPage;
