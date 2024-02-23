import React from 'react';

const SkeletonMovieCard = () => {
    return (
        <div className={'w-64 h-[400px] rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] animate-pulse bg-gray-300'}>
        </div>
    );
};

export default SkeletonMovieCard;