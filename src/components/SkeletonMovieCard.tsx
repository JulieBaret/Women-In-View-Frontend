import React, { useRef, useState, useEffect } from 'react';

const SkeletonMovieCard = () => {
    const imgEl = React.useRef<HTMLImageElement>(null);
    const [loaded, setLoaded] = React.useState(false);

    const onImageLoaded = () => setLoaded(true);

    useEffect(() => {
        const imgElCurrent = imgEl.current;

        if (imgElCurrent) {
            imgElCurrent.addEventListener('load', onImageLoaded);
            return () => imgElCurrent.removeEventListener('load', onImageLoaded);
        }
    }, [imgEl]);

    return (
        <div className={`rounded-lg bg-white $${ loaded && 'shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]'} w-fit animate-pulse`}>
            <div
                className={`rounded-t-lg relative overflow-hidden ${loaded && 'bg-gray-300'} flex justify-center items-center`}>
                <img
                    ref={imgEl}
                    loading="lazy"
                    src="/placeholder.webp"
                    alt="placeholder" />
            </div>
            <div className="px-4 py-4 flex flex-col gap-2 h-28 justify-between">
                <div className={`h-6 ${loaded && 'bg-gray-300'} rounded w-[80%]`}></div>
                <div className={`self-end h-6 ${loaded && 'bg-gray-300'} rounded-full w-24`}></div>
            </div>
        </div>
    );
};

export default SkeletonMovieCard;