import React, { useState } from 'react'
import { useConfirm } from "material-ui-confirm"
import useFetch from '../../hooks/useFetch';
import { axiosInstance } from '../../config/axiosInstance';
import LoadingDiv from '../LoadingDiv';
import toast from "react-hot-toast"

const JobApplicationsTable = ({ jobId }) => {
    const confirm = useConfirm();
    const [refresh, setRefresh] = useState(false);
    const [applications, error, isLoading] = useFetch(
        `user/jobApplications/${jobId}`,
        [refresh]
    );

    function handleStatus(jobId, applicantId, newStatus) {
        if (newStatus === "in-review") {
            changeStatus()
        } else {
            confirm({
                title: `Confirm ${newStatus === "approved" ? "approval" : "rejection"}`,
                description: `${newStatus === "approved" ? "Once you approved, you cannot change the status" : "Once you reject, the application will be removed"}`,
                confirmationText: "Confirm",
            })
                .then(() => {
                    changeStatus();
                })
        }

        async function changeStatus() {
            toast.dismiss()
            const loading = toast.loading("Updating status")
            try {
                const response = await axiosInstance({
                    method: "PUT",
                    url: `/user/jobApplications/status/${jobId}`,
                    data: { applicantId, newStatus },

                });
                toast.dismiss(loading)
                if (response.status === 200) {
                    toast.success("Status updated successfully")
                    setRefresh(!refresh);
                } else {
                    toast.error("Status updation failed")
                }
            } catch (err) {
                toast.dismiss(loading)
                toast.error("Status updation failed")
            }
        }
    }

    return (
        <>
            {!isLoading ? <table className='w-full bg-white dark:bg-dark-input shadow-sm grid  text-left border-l border-t text-xs sm:text-sm lg:text-base border-brand-dark dark:border-brand-light'>
                <thead className="w-full grid-cols-12 ">
                    <tr className="col-span-12 grid w-full grid-cols-12 text-left">
                        <th className=" col-span-1 p-1 border-b border-r border-brand-dark dark:border-brand-light">S. No.</th>
                        <th className=" col-span-6 p-1 border-b border-r border-brand-dark dark:border-brand-light">Applicant</th>
                        <th className=" col-span-2 p-1 border-b border-r border-brand-dark dark:border-brand-light">Resume</th>
                        <th className=" col-span-3 p-1 border-b border-r border-brand-dark dark:border-brand-light">Action</th>
                    </tr>
                </thead>
                <tbody className="w-full grid-cols-12 ">
                    {applications && applications.length > 0 ?
                        applications.map((application, index) =>
                            <tr key={application._id} className="col-span-12 grid w-full grid-cols-12 text-left  ">
                                <td className=" col-span-1 p-1 border-b border-r border-brand-dark dark:border-brand-light font-medium">{index + 1}</td>
                                <td className=" col-span-6 p-1 border-b border-r border-brand-dark dark:border-brand-light">
                                    <p className="truncate ">{application.applicant?.name}</p>
                                    <div className="truncate "><a title="Send Email" href={`mailto:${application.applicant?.email}`} className="underline text-blue-500 hover:text-blue-600">{application.applicant?.email}</a></div>
                                </td>
                                <td className="bg-red-300-500 col-span-2 p-1 border-b border-r border-brand-dark dark:border-brand-light">
                                    {application.applicant.profile.resume ? <a href={`https://docs.google.com/viewer?url=${application.applicant.profile.resume}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline hover:text-blue-600">Check</a> :
                                        <span className="font-light">N/A</span>}
                                </td>
                                {application.status === "approved" ?

                                    <td className="col-span-3 p-1 border-b border-r border-brand-dark dark:border-brand-light  text-green-500">Approved</td>

                                    : <td className=" col-span-3 p-1 border-b border-r border-brand-dark dark:border-brand-light ">
                                        <button onClick={() =>
                                            handleStatus(
                                                application.job,
                                                application.applicant._id,
                                                "approved"
                                            )} className="btn btn-xs text-xxs text-white border-none bg-green-500 hover:bg-green-600 mx-0.5 my-1 ">Approve</button>
                                        <button onClick={() =>
                                            handleStatus(
                                                application.job,
                                                application.applicant._id,
                                                "in-review"
                                            )} className={`btn btn-xs text-xxs text-white border-none bg-yellow-500  mx-0.5 my-1 ${application.status === "in-review"
                                                ? "cursor-not-allowed opacity-60 hover:bg-yellow-500"
                                                : "opacity-100 hover:bg-yellow-600"}`}>In-review</button>
                                        <button onClick={() =>
                                            handleStatus(
                                                application.job,
                                                application.applicant._id,
                                                "rejected"
                                            )} className="btn btn-xs text-xxs text-white border-none bg-red-500 hover:bg-red-600 mx-0.5 my-1 ">Reject</button>
                                    </td>}
                            </tr>) :


                        <tr className="col-span-12 grid w-full grid-cols-12  text-center">
                            <td className="col-span-12 p-2 border-b border-r border-brand-dark dark:border-brand-light text-center">No applications so far. Come back later.</td>
                        </tr>}
                </tbody>
            </table> :

                <LoadingDiv />

            }
        </>
    )
}

export default JobApplicationsTable