import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router";
import JobApplicationsTable from "../../components/user/JobApplicationsTable";

const JobApplicationsPage = () => {
  const location = useLocation();
  const params = useParams();
  const jobId = params.jobId;
  const { jobTitle } = location.state;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-div ">
      <div className="inner-div">
        <h1 className="page-heading">
          Job applications for{" "}
          <span className="font-bold">{jobTitle}</span>
        </h1>

        <JobApplicationsTable jobId={jobId} />

      </div>
    </div>
  );
};

export default JobApplicationsPage;
