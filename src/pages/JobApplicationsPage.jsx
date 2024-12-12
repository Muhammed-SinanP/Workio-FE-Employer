import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import { useParams } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { useConfirm } from "material-ui-confirm";

const JobApplicationsPage = () => {
  const location = useLocation();
  const params = useParams();
  const confirm = useConfirm();

  const jobId = params.jobId;
  const { jobTitle } = location.state;
  const [refresh, setRefresh] = useState(false);
  const [applications, error, isLoading] = useFetch(
    `user/applications/${jobId}`,
    [refresh]
  );

  function handleStatus(jobId, applicantId, newStatus) {
    if (newStatus === "Approved") {
      confirm({
        title: "Confirm approval",
        description: "Once you approved, you cannot change the status",
        confirmationText: "Confirm",
      })
        .then(() => {
          changeStatus();
        })
        .catch(() => {
          console.log("update status cancelled");
        });
    } else if (newStatus === "Rejected") {
      confirm({
        title: "Confirm rejection",
        description: "Once you reject, the application will be removed",
        confirmationText: "Confirm",
      })
        .then(() => {
          changeStatus();
        })
        .catch(() => {
          console.log("update status cancelled");
        });
    } else {
      changeStatus();
    }

    async function changeStatus() {
      try {
        const response = await axiosInstance({
          method: "PUT",
          url: `/user/applications/status/${applicantId}`,
          data: { jobId, newStatus },
        });
        if (response.status === 200) {
          console.log("update status success");
          setRefresh(!refresh);
        }
      } catch (err) {
        console.log(err, "===status update err fe");
      }
    }
  }
  function handleResumeClick(resumeLink) {
    window.open(resumeLink);
  }
  
  function sendEmail(applicantEmail){
    window.open(`mailto:${applicantEmail}`)
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className="text-center my-4 text-lg tracking-wide underline dark:text-gray-200">
        {" "}
        Job applications for{" "}
        <span className="font-medium text-brandColor-dark dark:text-gray-200">{jobTitle}</span>
      </div>
      <div className="outerDiv">
        <div className="innerDiv">
          {isLoading ? (
            <div className="text-center">loading..</div>
          ) : (
            <div className=" sm:mx-4 mx-1 ml-2">
              {applications && applications.length > 0 ? (
                <div className="grid grid-cols-12 gap-1 font-medium">
                  <div className="col-span-1 hidden lg:block">Sl.no</div>
                  <div className=" lg:col-span-3 col-span-3 hidden sm:block">
                    Applicant
                  </div>
                  <div className=" lg:col-span-3 md:col-span-3 sm:col-span-4 col-span-5 text-sm lg:text-base ">
                    Email
                  </div>
                  <div className="lg:col-span-2 md:col-span-2 sm:col-span-1 col-span-2 text-sm lg:text-base">
                    Resume
                  </div>
                  <div className=" lg:col-span-3 sm:col-span-4 col-span-5 text-sm lg:text-base"></div>
                </div>
              ) : (
                <div className="text-center">No applications found.</div>
              )}
              {applications &&
                applications.length > 0 &&
                applications.map((element, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 gap-1 my-1 text-xs items-center"
                  >
                    <div className=" col-span-1 hidden lg:block py-1">
                      {index + 1}
                    </div>
                    <div className=" lg:col-span-3 col-span-3  hidden sm:block py-1">
                      {element.applicant.name}
                    </div>
                    <div  className=" lg:col-span-3 md:col-span-3 sm:col-span-4 col-span-5 py-1">
                     <span title="Send Email" onClick={()=>sendEmail(element.applicant.email)} className="underline cursor-pointer text-blue-500 hover:text-blue-700">{element.applicant.email}</span> 
                     
                    </div>
                    <div
                     
                      className=" lg:col-span-2 md:col-span-2 sm:col-span-1 col-span-2 py-1 "
                    >
                      <span  onClick={
                        element.applicant.profile.resume
                          ? () =>
                              handleResumeClick(
                                element.applicant.profile.resume
                              )
                          : undefined
                      } className={`${element.applicant.profile.resume?"cursor-pointer underline text-blue-500 hover:text-blue-700":"font-light"}`}>{element.applicant.profile.resume ? "Check" : "N/A"}</span>
                    </div>
                    {element.status === "Approved" ? (
                      <div className=" lg:col-span-3 sm:col-span-4 col-span-5 grid grid-cols-3 py-1">
                        <div className="col-span-full text-green-600">
                          Approved
                        </div>
                      </div>
                    ) : (
                      <div className=" lg:col-span-3 sm:col-span-4 col-span-5 grid grid-cols-3 py-1">
                        <div className="col-span-1 flex items-center">
                          <button
                            onClick={() =>
                              handleStatus(
                                element.job,
                                element.applicant._id,
                                "Approved"
                              )
                            }
                            className="bg-green-400 sm:pr-1.5 py-0.5 flex items-center rounded-md active:scale-95 transition-transform duration-300 ease-in-out hover:bg-green-500"
                          >
                            <CheckIcon
                              fontSize="small"
                              className="p-1 sm:px-0"
                              titleAccess="Approve"
                            />
                            <span className="hidden sm:block">Approve</span>
                          </button>
                        </div>
                        <div className="col-span-1 flex items-center">
                          {" "}
                          <button
                            disabled={element.status == "In-review"}
                            onClick={() =>
                              handleStatus(
                                element.job,
                                element.applicant._id,
                                "In-review"
                              )
                            }
                            className={`bg-yellow-300 sm:pr-1.5 py-0.5  flex items-center rounded-md active:scale-95 transition-transform duration-300 ease-in-out  ${
                              element.status === "In-review"
                                ? "cursor-not-allowed opacity-60 active:scale-100 "
                                : "opacity-100 hover:bg-yellow-400"
                            }`}
                          >
                            <ContentPasteSearchIcon
                              fontSize="small"
                              className="p-1 sm:px-0"
                              titleAccess="In review"
                            />
                            <span className="hidden sm:block">In-review</span>
                          </button>
                        </div>
                        <div className="col-span-1 flex items-center">
                          {" "}
                          <button
                            onClick={() =>
                              handleStatus(
                                element.job,
                                element.applicant._id,
                                "Rejected"
                              )
                            }
                            className="bg-red-500 sm:pr-1.5 py-0.5 flex items-center rounded-md active:scale-95 transition-transform duration-300 ease-in-out hover:bg-red-600"
                          >
                            <CloseIcon
                              fontSize="small"
                              className="p-1 sm:px-0"
                              titleAccess="Reject"
                            />
                            <span className="hidden sm:block">Reject</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobApplicationsPage;
