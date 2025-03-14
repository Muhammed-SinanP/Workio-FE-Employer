import React from 'react'
import { useForm } from 'react-hook-form'
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import JobPostCardSm from '../../components/cards/JobPostCardSm';
import SkeletonJobPostCardSm from '../../components/skeletons/SkeletonJobPostCardSm';
import { axiosInstance } from '../../config/axiosInstance';
import InfoIcon from '@mui/icons-material/Info';

const JobPostsPage = () => {
  const navigate = useNavigate()
  const [limit, setLimit] = useState(12)
  const [refresh, setRefresh] = useState(false)
  const [jobPosts, setJobPosts] = useState(null)
  const [jobPostsCount, setJobPostsCount] = useState(null)
  const [showBtn, setShowBtn] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false)
  const { register, watch } = useForm()
  const jobTitle = watch("jobTitle");

  useEffect(() => {
    setInitialLoading(true)
    window.scrollTo(0, 0);
  }, []);


  useEffect(() => {
    if (jobPosts && jobPosts.length === jobPostsCount) {
      setShowBtn(false);
    } else {
      setShowBtn(true)
    }
  }, [jobPosts, jobPostsCount])

  function handleLoadMore() {
    !isLoading && jobPosts && setLimit(limit + 12);
  }

  function refreshPage() {
    setRefresh(!refresh)
  }


  useEffect(() => {
    getJobPosts()
    async function getJobPosts() {
      try {

        setIsLoading(true)
        const response = await axiosInstance({
          url: `/user/myJobPosts?limit=${limit}&jobTitle=${jobTitle ? jobTitle : ""}`
        })
        if (response.status == 200) {
          setJobPosts(response?.data?.data?.jobPosts)
          setJobPostsCount(response?.data?.data?.jobPostsCount)
        }
      } catch (err) {
        console.log(err);
      } finally {

        setIsLoading(false)
        setInitialLoading(false)
      }
    }


  }, [jobTitle, limit, refresh])



  return (
    <div className='page-div relative'>


      <InfoIcon className='absolute peer right-5 text-dark-text top-5 cursor-pointer' />

      <p className=' absolute hidden peer-hover:block z-10 max-w-80 text-center right-6 top-14 p-4 font-mono rounded-md shadow-md bg-gray-50 dark:bg-dark-text'>
        Job posts will be verified by the team after you post/update it. Once it is approved, it will be visible to job seekers. And rejected job posts will be removed.<br />
        Only open jobs are shown to job seeker, so you can temporarily close the job by changing the status to closed.
      </p>





      <div className='inner-div '>
        <h1 className='page-heading'>All posted jobs</h1>


        <div className='flex justify-center sm:justify-end '>
          <form className='w-72 relative'>
            <input type="text" {...register("jobTitle")} className='input-style cursor-text pr-10' placeholder='Search by job title' />
            <SearchIcon className='absolute right-1 top-1.5 text-dark-text' />
          </form>
        </div>

        <div className={`text-center ${isLoading && jobPosts ? "visible" : "invisible"}`}><span className='loading loading-dots loading-xl text-brand dark:text-brand-light'></span></div>

        <div className="grid grid-cols-12 gap-5 mt-6 px-6">

          {initialLoading || !jobPosts ?
            Array.from({ length: limit }, (_, index) => (
              <SkeletonJobPostCardSm key={index} />
            ))
            :
            jobPosts && jobPosts.length > 0 &&
            jobPosts.map((element, index) => (
              <JobPostCardSm key={index} job={element} refreshPage={refreshPage} />
            ))

          }
          {jobPostsCount === 0 && <div className="text-center dark:text-dark-text col-span-12">No job posts found. <span className="underline cursor-pointer text-brand dark:text-brand-light hover:text-brand-dark" onClick={() => navigate("/createNewJobPost")}>Post new job</span></div>
          }
          {/* {jobPosts ?
            jobPosts.length < 0 &&
            jobPosts.map((element, index) => (
              <JobPostCardSm key={index} job={element}/>
            )) :
            <div className="text-center col-span-12">No job posts found. <span className="underline cursor-pointer text-brand hover:text-brand-dark" onClick={() => navigate("/createNewJobPost")}>Post a job</span></div>

          } */}

        </div>

      </div>
      <div className="flex w-full justify-center">
        {showBtn && (
          <button

            onClick={handleLoadMore}
            className="btn btn-sm my-10 bg-brand tracking-wide text-white hover:bg-brand-dark active:bg-brand-dark"
          >
            {isLoading ? "Loading ..." : "Load more"}
          </button>
        )}
      </div>
    </div>
  )
}

export default JobPostsPage