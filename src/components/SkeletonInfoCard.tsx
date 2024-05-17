import React from 'react';

const SkeletonInfoCard = () => {
    return (
<div className="h-36 rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] animate-pulse bg-gray-300 py-4 px-6 flex items-center gap-4">
            <div className="h-24 w-16 bg-gray-400 rounded"></div>
            <div className="flex flex-col flex-1 gap-2">
                <div className="h-6 bg-gray-400 rounded w-3/4"></div>
                <div className="h-4 bg-gray-400 rounded w-1/2"></div>
                <div className="flex items-center gap-2">
                    <div className="h-4 bg-gray-400 rounded w-1/4"></div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonInfoCard;