import React from 'react'

const SkeletonJobPostCardSm = () => {
    return (
        <div
            className="flex dark:bg-dark-input text-center skeleton flex-col gap-1  p-4 rounded-md shadow-md  col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3  "

        >
            <div className="flex justify-center">
                <div className='skeleton-custom-color h-7 w-52'></div>
            </div>

            <div className="flex justify-center">
                <div className="skeleton-custom-color h-5 w-56"></div>
            </div>

            <div className="flex justify-center">
                <div className="skeleton-custom-color h-6 w-40"></div>
            </div>

            <div className="flex justify-between mt-4">
                <div className="w-28 h-5 skeleton-custom-color"></div>
                <div className="w-28 h-5 skeleton-custom-color"></div>
            </div>
        </div>
    )
}

export default SkeletonJobPostCardSm