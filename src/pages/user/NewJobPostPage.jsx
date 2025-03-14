import React from 'react'
import JobForm from '../../components/forms/JobForm'

const NewJobPostPage = () => {
  return (
    <div className='page-div'>
      <div className='inner-div'>
        <h1 className='page-heading'>Create new job post</h1>
        <div>
          <JobForm />
        </div>
      </div>
    </div>
  )
}

export default NewJobPostPage