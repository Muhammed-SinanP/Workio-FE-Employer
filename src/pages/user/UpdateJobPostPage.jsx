import React, { useEffect } from 'react'
import JobForm from '../../components/forms/JobForm'
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import ErrorDiv from '../../components/ErrorDiv';
import LoadingDiv from '../../components/LoadingDiv';

const UpdateJobPostPage = () => {
    const params = useParams()
    const jobId = params.jobId

useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

    const [data, error, isLoading] = useFetch(`/job/${jobId}`);

    if (error) {
        <ErrorDiv info={"Job Details Fetch failed."} />
    }

    return (
        <div className='page-div'>
            <div className='inner-div'>
                <h1 className='page-heading'>Update job post</h1>
                <div>
                    {isLoading ?
                        <LoadingDiv/> :
                        <JobForm data={data} jobId={jobId}/>}
                </div>
            </div>
        </div>
    )
}

export default UpdateJobPostPage