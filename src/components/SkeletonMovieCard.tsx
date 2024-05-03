import React from 'react';

const SkeletonMovieCard = () => {
    return (
        <div className="rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] animate-pulse w-[300px]">
            <div className="relative bg-gray-300 rounded-t-lg h-[400px]"></div> {/* Ajustez la hauteur ici */}
            <div className="px-4 py-4 flex flex-col gap-2 h-20 justify-between"> {/* Ajustez la hauteur ici */}
                <div className="h-6 bg-gray-300 rounded w-[80%]"></div> {/* Ajustez la largeur ici */}
                <div className="h-6 bg-gray-200 rounded-full w-16"></div>
            </div>
        </div>
    );
};

export default SkeletonMovieCard;