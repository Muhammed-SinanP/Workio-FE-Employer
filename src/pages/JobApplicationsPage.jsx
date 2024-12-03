import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import useFetch from '../hooks/useFetch'

const JobApplicationsPage = () => {
  const location = useLocation()
  
  const [applications,setApplications] = useState([])
  const jobId = location.pathname.split("/").pop();
  const {jobTitle} = location.state
  

  const [data, error, isLoading] = useFetch(`user/applications/${jobId}`);

  useEffect(()=>{
     setApplications(data)
     console.log(data)
  },[data])
  return (
    <div>JobApplicationsPage for {jobTitle} 
      <div>{applications&&applications.length>0&&applications.map((element,index)=><div key={index}>{element.applicant.name}</div>)}</div>
    </div>
  )
}

export default JobApplicationsPage