import React, { useEffect, useState } from "react";
import JobForm from "../components/forms/JobForm";
import { useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const UpdateJobPost = () => {
  
  const location = useLocation();
  const jobId = location.pathname.split("/").pop();
  const [data, error, isLoading] = useFetch(`/job/${jobId}`);

  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    jobRequirements: "",
    jobExperience: 0,
    locationCountry: "",
    locationState: "",
    locationCity: "",
    jobType: "",
    workModel: "",
    minSallary: 0,
    maxSallary: 0,
    jobStatus: "",
  });

  

  useEffect(() => {
    if (data) {
      setFormData({
        jobTitle: data?.title || "",
        jobDescription: data?.description || "",
        jobRequirements: data?.requirements || "",
        jobExperience: data?.minExperience || "",
        locationCountry: data?.location?.country || "",
        locationState: data?.location?.state || "",
        locationCity: data?.location?.city || "",
        jobType: data?.jobType || "",
        workModel: data?.workModel || "",
        minSallary: data?.sallaryRange?.min || "",
        maxSallary: data?.sallaryRange?.max || "",
        jobStatus: data?.status || "",
      });
    }
  }, [data]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="outerDiv ">
      <div className="innerDiv  flex justify-center items-start py-10">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <JobForm
            isCreate={false}
            formData={formData}
            setFormData={setFormData}
            jobTitle={data?.title}
            jobId={jobId}
          />
        )}
      </div>
    </div>
  );
};

export default UpdateJobPost;
