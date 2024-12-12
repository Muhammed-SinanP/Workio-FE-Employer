import React, { useState } from "react";

import JobForm from "../components/forms/JobForm"
import { useEffect } from "react";
const NewJobPost = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    jobRequirements: "",
    jobExperience:0,
    locationCountry: "",
    locationState: "",
    locationCity: "",
    jobType: "full_time",
    workModel: "office",
    minSallary: 0,
    maxSallary: 0,
    jobStatus:"open"
  });


  return (
    <div className="outerDiv ">
      <div className="innerDiv  flex justify-center items-start py-10">
       <JobForm isCreate={true} formData={formData} setFormData={setFormData}  />
      </div>
    </div>
  );
};

export default NewJobPost;
