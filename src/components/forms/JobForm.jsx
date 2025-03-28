import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { jobPostSchema } from '../../schemas/postSchema'
import ClearIcon from '@mui/icons-material/Clear';
import { Range } from "react-range";
import AddIcon from '@mui/icons-material/Add';
import { Country, State, City } from 'country-state-city';
import { axiosInstance } from '../../config/axiosInstance';
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";

const JobForm = ({ data, jobId }) => {
  const navigate = useNavigate()
  const [countries, setCountries] = useState(Country.getAllCountries())
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])

  const [selectedCountry, setSelectedCountry] = useState(data ? data.location.country : "")
  const [selectedState, setSelectedState] = useState(data ? data.location.state : "")
  const [selectedCity, setSelectedCity] = useState(data ? data.location.city : "")

  const [disableBtn,setDisableBtn] = useState(false)

  const { register, control, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(jobPostSchema),
    defaultValues: {
      jobTitle: data ? data.title : "",
      jobStatus: data ? data.status : "",
      jobDescription: data ? data.description : "",
      jobRequirements: data ? data.requirements : [],
      jobExperience: data ? data.minExperience.toString() : "0",
      country: selectedCountry,
      state: selectedState,
      city: selectedCity,
      jobType: data ? data.jobType : "full-time",
      workModel: data ? data.workModel : "office",
      salaryRange: data ? [data.salaryRange.min, data.salaryRange.max] : [3, 10],
    }
  })
  const selectedSalaryRange = watch("salaryRange");
  const { fields, append, remove } = useFieldArray({
    control,
    name: "jobRequirements"
  })

  useEffect(() => {
    if (fields.length === 0) {
      append("");
    }
  }, [fields, append]);

  async function handlePostJob(data) {
    setDisableBtn(true)
    toast.dismiss()
    const loading = toast.loading("Posting job")
    try {
      const response = await axiosInstance({
        url: "/user/postAJob",
        method: "POST",
        data: data,
      })
      toast.dismiss(loading)
      if (response.status === 200) {
        toast.success("Job posted successfully")
        navigate("/myJobPosts")
      }else{
        toast.error("Job posting failed")
      }
    } catch (err) {
      toast.dismiss(loading)
      if (err.status === 409) {
        toast.error("Same job already exists")
      } else {
        toast.error("Job posting failed")
      }
    }finally{
      setDisableBtn(false)
    }

  }

  async function handleUpdateJob(data) {
   toast.dismiss()
    const loading = toast.loading("Updating job")
    try {
      const response = await axiosInstance({
        url: `/user/myJobPosts/${jobId}`,
        method: "PUT",
        data: data
      })
      toast.dismiss(loading)
      if (response.status === 200) {
        toast.success("Job updated successfully")
        navigate("/myJobPosts")
      }
    } catch (err) {
      toast.dismiss(loading)
      toast.error("Job updation failed")
    }
  }

  useEffect(() => {
    if (selectedCountry && selectedCountry.length > 0) {
      const countryCode = getCountryCode(selectedCountry)
      setStates(State.getStatesOfCountry(countryCode))
    }
  }, [selectedCountry])

  useEffect(() => {
    if (selectedCountry && selectedState && selectedCountry.length > 0 && selectedState.length > 0) {
      const countryCode = getCountryCode(selectedCountry)
      const stateCode = getStateCode(selectedState)
      setCities(City.getCitiesOfState(countryCode, stateCode))
    }

  }, [selectedState, states])

  function handleCountryChange(e) {
    const country = countries.find(c => c.name === e.target.value)
    setSelectedCountry(country.name)
  }
  function handleStateChange(e) {
    const state = states.find(s => s.name === e.target.value)
    setSelectedState(state.name)
  }
  function handleCityChange(e) {
    const city = cities.find(c => c.name === e.target.value)
    setSelectedCity(city.name)
  }

  const getCountryCode = (countryName) => {
    const country = countries.find((c) => c.name.toLowerCase() === countryName.toLowerCase());
    return country ? country.isoCode : null;
  };
  const getStateCode = (stateName) => {
    const state = states.find((s) => s.name.toLowerCase() === stateName.toLowerCase());
    return state ? state.isoCode : null;
  };

  return (
    <form onSubmit={data ? handleSubmit(handleUpdateJob) : handleSubmit(handlePostJob)} className='max-w-80 mx-auto flex flex-col gap-4 text-sm tracking-wide'>
      <div>
        <label htmlFor="jobTitle" className="form-heading ">Job Title</label>
        <input placeholder="Enter job title" title={data && "Cannot change job title"} type="text" disabled={data} id='jobTitle' {...register("jobTitle")} className={`input-style text-base ${data && "cursor-not-allowed"} ${errors?.jobTitle && "border-red-500"}`} />
        {errors.jobTitle && <p className="err-msg">{errors.jobTitle.message}</p>}
      </div>
      {data && <div>
        <label htmlFor='jobStatus' className='form-heading'>Job status</label><br />
        <select {...register("jobStatus")} className='input-style w-24 cursor-pointer'>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
      </div>}
      <div>
        <label htmlFor="jobDescription" className="form-heading">Job Description</label>
        <textarea placeholder="Provide a job description with at least 10 characters" rows={8} id='jobDescription' {...register("jobDescription")} className={`input-style font-para-font text-xs tracking-wider ${errors?.jobDescription && "border-red-500"}`} />
        {errors.jobDescription && <p className="err-msg -mt-1">{errors.jobDescription.message}</p>}
      </div>
      <div>
        <label htmlFor='jobRequirements-0' className="form-heading">Job Requirements</label>

        {fields.map((field, index) => (
          <div key={field.id}>  <div className="flex items-center space-x-2 mb-2">
            <input
              id={`jobRequirements-${index}`}
              type="text"
              {...register(`jobRequirements.${index}`)}
              className={`input-style font-para-font text-xs tracking-wider ${errors?.jobRequirements?.[index] && "border-red-500"}`}
              placeholder="Enter requirement"
            />
            {fields.length > 1 && <button
              type="button"
              onClick={() => remove(index)}
              className="bg-red-500 hover:bg-red-600 text-white btn btn-sm p-1"
            >
              <ClearIcon fontSize='small' />
            </button>}
          </div>
            {
              errors.jobRequirements?.[index] && (
                <p className="err-msg -mt-2 mb-2">{errors.jobRequirements[index]?.message}</p>
              )
            }
          </div>
        ))}

        <button
          type="button"
          onClick={() => append("")}
          className="bg-brand hover:bg-brand-dark border-none mt-2  text-white btn btn-sm flex items-center justify-center gap-0 p-1 pr-2 font-normal text-xs tracking-wide"
        >
          <AddIcon fontSize='small' />Add Requirement
        </button>
      </div>
      <div>
        <label htmlFor="jobExperience" className="form-heading">Minimum Experience</label>
        <input type="number" min={0} id='jobExperience' {...register("jobExperience")} className='input-style w-16 mx-2' defaultValue={0} /><span className='form-heading'>Years</span>
        {errors.jobExperience && <p className="err-msg">{errors.jobExperience.message}</p>}
      </div>
      <div>
        <p className="form-heading">Location</p>
        <div className='flex flex-col mb-2'>
          <div className='flex items-center gap-2'>Country:
            <select id="country" {...register("country")} className={`input-style w-40 cursor-pointer ${errors?.country && "border-red-500"}`}
              onChange={handleCountryChange}
              value={selectedCountry ? selectedCountry : ""}
            >
              <option value="" className='hidden'>Select Country</option>
              {countries.map(country => <option key={country.isoCode} value={country.name}>{country.name}</option>)}
            </select>
          </div>
          {errors.country && <p className="err-msg ">{errors.country.message}</p>}
        </div>
        <div className='flex flex-col mb-2'>
          <div className='flex items-center gap-2'>State:
            <select id="state" {...register("state")} className={`input-style w-40 cursor-pointer ${errors?.state && "border-red-500"}`}
              onChange={handleStateChange}
              value={selectedState ? selectedState : ""}
            >
              <option value="" className='hidden'>Select State</option>
              {states.map(state => <option key={state.isoCode} value={state.name}>{state.name}</option>)}
            </select>
          </div>
          {errors.state && <p className="err-msg">{errors.state.message}</p>}
        </div>
        <div className='flex flex-col mb-2'>
          <div className='flex items-center gap-2'>City:
            <select id="city" {...register("city")} className={`input-style w-40 cursor-pointer ${errors?.city && "border-red-500"}`}
              onChange={handleCityChange}
              value={selectedCity ? selectedCity : ""}
            >
              <option value="" className='hidden'>Select City</option>
              {cities.map((city, index) => <option key={index} value={city.name}>{city.name}</option>)}

            </select></div>
          {errors.city && <p className="err-msg">{errors.city.message}</p>}
        </div>
      </div>
      <div>
        <p className="form-heading">Job Type</p>
        <div className='flex justify-evenly '>
          <span className='flex items-center gap-1'><input type="radio" id="fullTime" {...register("jobType")} value="full-time" />
            <label htmlFor="fullTime">Full Time</label></span>
          <span className='flex items-center gap-1'><input type="radio" id="partTime" {...register("jobType")} value="part-time" />
            <label htmlFor="partTime">Part Time</label></span>
          <span className='flex items-center gap-1'> <input type="radio" id="internship" {...register("jobType")} value="internship" />
            <label htmlFor="internship">Internship</label></span>
        </div>
      </div>
      <div>
        <p className="form-heading">Work Model</p>
        <div className='flex justify-evenly '>
          <span className='flex items-center gap-1'><input type="radio" id="office" {...register("workModel")} value="office" />
            <label htmlFor="office" >Office</label></span>
          <span className='flex items-center gap-1'><input type="radio" id="remote" {...register("workModel")} value="remote" />
            <label htmlFor="remote">Remote</label></span>
          <span className='flex items-center gap-1'><input type="radio" id="hybrid" {...register("workModel")} value="hybrid" />
            <label htmlFor="hybrid">Hybrid</label></span>
        </div>
      </div>
      <div className='flex flex-col'>
        <label className="form-heading">Salary Range</label>
        <p className='text-center'>{selectedSalaryRange ? `${selectedSalaryRange[0]} - ${selectedSalaryRange[1]}` : "Not Selected"} <span className='font-light'>LPA</span></p>
        <div className='flex items-center gap-3 text-base'>
          1 <Controller
            name="salaryRange"
            control={control}

            render={({ field: { value, onChange } }) => (
              <Range
                step={1}
                min={1}
                max={99}
                values={value}
                onChange={onChange}
                renderTrack={({ props, children }) => {
                  const { key, ...restProps } = props;
                  return (
                    <div key={key} {...restProps} className="h-1 bg-brand-light rounded-full w-full relative">
                      {children}
                    </div>
                  );
                }}
                renderThumb={({ props }) => {
                  const { key, ...restProps } = props;
                  return <div key={key} {...restProps} className="w-4 h-4 bg-brand-dark rounded-full cursor-pointer" />;
                }}
              />
            )}
          />99
        </div>
      </div>

      <div className='flex justify-center mt-4'>
        <button type='submit' disabled={disableBtn} className='btn hover:bg-green-600 bg-green-500 text-white text-base btn-wide'>{data ? "Update" : "Post"} Job</button>
      </div>
    </form>
  )
}

export default JobForm