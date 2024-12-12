import React from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";

const JobForm = ({
  isCreate,
  formData,
  setFormData,
  handleSubmit,
  jobTitle,
  jobId,
}) => {
  const navigate = useNavigate();
  const isFormValid =
    Object.keys(formData).every((key) =>
      key === "minSallary" || key === "maxSallary" || key === "jobExperience"
        ? formData[key] !== ""
        : formData[key].trim() !== ""
    ) && formData.maxSallary > formData.minSallary;

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axiosInstance({
        method: isCreate ? "POST" : "PUT",
        url: isCreate ? "/job/one" : `/job/${jobId}`,
        data: formData,
      });
      if (response.status === 200) {
        navigate("/myJobPosts");
      }
    } catch (err) {
      console.log("err in posting/updating job fe", err);
    }
  }

  return (
    <div className="xl:w-2/3 lg:w-3/4 md:w-4/5 w-11/12 bg-brandColor dark:bg-darkColor-text  border border-black rounded-md">
      <div className="text-center py-4 capitalize text-lg font-medium text-white dark:text-gray-950">
        {isCreate?<div>Create new job post</div>:<div>Update job post - <span className="font-bold tracking-wider">{jobTitle}</span></div>}
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-darkColor flex flex-col gap-2 lg:gap-4 p-10 m-1 rounded-md relative pb-20"
      >
        {!isCreate && (
          <div className="w-full   flex">
            <label htmlFor="jobStatus" className="w-1/3 ">
              Post status
            </label>

            <select
              name="jobStatus"
              id="jobStatus"
              className="border"
              required
              value={formData.jobStatus}
              onChange={handleChange}
            >
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        )}

        {isCreate && (
          <div className="w-full   flex ">
            <label htmlFor="jobTitle" className="w-1/3  ">
              Job title
            </label>
            <input
              type="text"
              name="jobTitle"
              id="jobTitle"
              value={formData.jobTitle}
              className="inputStyle w-2/3"
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="w-full   flex">
          <label htmlFor="jobDescription" className="w-1/3 ">
            Job description
          </label>
          <textarea
            name="jobDescription"
            id="jobDescription"
            value={formData.jobDescription}
            className="inputStyle w-2/3"
            onChange={handleChange}
            rows="4"
            required
          />
        </div>
        <div className="w-full   flex">
          <label htmlFor="jobRequirements" className="w-1/3 ">
            Job requirements
          </label>
          <textarea
            name="jobRequirements"
            id="jobRequirements"
            value={formData.jobRequirements}
            className="inputStyle w-2/3"
            onChange={handleChange}
            rows="4"
            required
          />
        </div>
        <div className="w-full   flex">
          <label htmlFor="jobExperience" className="w-1/3 ">
            Minimum Experience
          </label>
          <input
            type="number"
            name="jobExperience"
            id="jobExperience"
            value={formData.jobExperience}
            className="inputStyle w-20"
            onChange={handleChange}
            min={0}
            required
          />{" "}
          <div className=" ml-1"> years</div>
        </div>
        <div className="w-full   flex">
          <div className="w-1/3 ">Location</div>
          <div className="w-2/3 flex flex-col gap-1 sm:pl-2">
            <div className="flex">
              <label htmlFor="locationCountry" className="sm:w-1/6 w-2/6  ">
                Country
              </label>
              <input
                type="text"
                name="locationCountry"
                id="locationCountry"
                value={formData.locationCountry}
                className="inputStyle w-2/3 sm:w-1/2"
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex">
              <label htmlFor="locationState" className="sm:w-1/6 w-2/6 ">
                State
              </label>
              <input
                type="text"
                name="locationState"
                id="locationState"
                value={formData.locationState}
                className="inputStyle w-2/3 sm:w-1/2"
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex">
              <label htmlFor="locationCity" className="sm:w-1/6 w-2/6 ">
                City
              </label>
              <input
                type="text"
                name="locationCity"
                id="locationCity"
                value={formData.locationCity}
                className="inputStyle w-2/3 sm:w-1/2"
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="w-full   flex">
          <label htmlFor="jobType" className="w-1/3 ">
            Job Type
          </label>

          <select
            name="jobType"
            id="jobType"
            className="inputStyle"
            required
            value={formData.jobType}
            onChange={handleChange}
          >
            <option value="Full-time">Full time</option>
            <option value="Part-time">Part time</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
        <div className="w-full   flex">
          <label htmlFor="workModel" className="w-1/3 ">
            Work Model
          </label>

          <select
            name="workModel"
            id="workModel"
            className="inputStyle"
            required
            value={formData.workModel}
            onChange={handleChange}
          >
            <option value="Office">Office</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
        <div className="w-full   flex">
          <div className="w-1/3 ">Sallary</div>
          <div className="w-2/3  flex justify-start">
            <div className="1/2 flex">
              <label htmlFor="minSallary" className="w-2/6 text-end pr-1">
                min{" "}
              </label>
              <input
                type="number"
                name="minSallary"
                id="minSallary"
                value={formData.minSallary}
                className="inputStyle w-4/6"
                onChange={handleChange}
                required
              />
            </div>
            <div className="1/2 flex">
              <label htmlFor="maxSallary" className="w-2/6 text-end pr-1">
                max{" "}
              </label>
              <input
                type="number"
                name="maxSallary"
                id="maxSallary"
                value={formData.maxSallary}
                className="inputStyle w-4/6"
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <input
            type="submit"
            value={isCreate ? "Post Job" : "Update Job Post"}
            className={`btn  text-white  border p-4 text-sm font-medium py-2 absolute right-10 bottom-8 ${
              isFormValid
                ? "shadow-md shadow-black border-brandColor-dark  bg-brandColor-dark text-white hover:bg-brandColor hover:border-brandColor   active:shadow-none active:translate-y-1 transition-all duration-200 ease-in-out   "
                : "bg-brandColor-light hover:shadow-none hover:border-brandColor-light border-brandColor-light hover:bg-brandColor-light cursor-not-allowed"
            }`}
            disabled={!isFormValid}
          />
        </div>
      </form>
    </div>
  );
};

export default JobForm;
