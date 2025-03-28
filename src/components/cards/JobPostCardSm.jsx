import React from 'react';
import { useNavigate } from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import toast from "react-hot-toast"
import { useConfirm } from 'material-ui-confirm';
import { axiosInstance } from '../../config/axiosInstance';

const JobPostCardSm = ({ job,refreshPage }) => {
    const confirm = useConfirm()
    const navigate = useNavigate()
    function calculateDays(date) {
        const createdDate = new Date(date);
        const currentDate = new Date();
        createdDate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);
        const msDifference = currentDate - createdDate;
        const dateDiffernce = Math.floor(msDifference / (1000 * 60 * 60 * 24));

        if (dateDiffernce === 0) {
            return "today";
        }
        if (dateDiffernce === 1) {
            return "yesterday"
        }
        return `${dateDiffernce} days ago`;
    }
    function handleDeleteJob(jobId, jobTitle) {

        async function deleteJob() {
            toast.dismiss()
            const loading = toast.loading(`Deleting ${jobTitle}`)
            try {
                const response = await axiosInstance({
                    method: "DELETE",
                    url: `/user/myJobPosts/${jobId}`,
                })
                toast.dismiss(loading)
                if (response.status === 200) {
                    refreshPage()
                    toast.success("Job deleted successfully")    
                }else{
                    toast.error("Job deletion failed")
                }
            } catch (err) {
                toast.dismiss(loading)
                toast.error("Job deletion failed")
            }
        }

        confirm({
            title: "Confirm job deletion",
            description: `Deleting ${jobTitle}, this can't be undone.`,
            confirmationText: "Confirm"
        })
            .then(() => {
                deleteJob()
            })          
    }

    return (
        <div className={`flex border-0.5 relative items-center text-center flex-col gap-2 p-4 rounded-md shadow-md  col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3  bg-white dark:bg-dark-input dark:text-dark-text`}>
            <div className="text-lg w-4/5 font-medium text-brand-dark dark:text-dark-text capitalize">
                {job.title}
            </div>

          <div
                className={`${job.verified?"visible":"invisible"}  underline py-1 text-blue-500 hover:text-blue-700 text-sm tracking-wider cursor-pointer`}
                onClick={() =>
                    navigate(`/jobApplications/${job._id}`, {
                        state: { jobTitle: job.title },
                    })
                }
            >
                View applications
            </div>
            {!job.verified &&
                <div className='bg-yellow-400 w-full top-12 mt-1 text-white tracking-wide py-1 text-sm absolute capitalize'>Verification: Pending</div>
            }
            <div className="capitalize text-sm ">
                status:{" "}
                <span
                    className={`${job.status === "open"
                        ? "text-green-500"
                        : "text-red-500"
                        }`}
                >
                    {job.status}
                </span>
            </div>
            <div className="flex w-full justify-between mt-4">
                <div
                    className="text-blue-500 cursor-pointer text-sm hover:underline"
                    onClick={() => navigate(`/updateJobPost/${job._id}`)}
                >
                    Update
                </div>
                <div className="text-xs flex items-end text-gray-500">
                    Posted {calculateDays(job.createdAt)}
                </div>
            </div>

            <DeleteForeverIcon onClick={()=>handleDeleteJob(job._id,job.title)} titleAccess='Delete job' fontSize='small' className='absolute top-2 right-2 text-red-500 cursor-pointer' />
        </div>
    )
}

export default JobPostCardSm