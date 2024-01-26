import React from 'react';
import SadIcon from './icons/SadIcon';
import TrophyIcon from './icons/TrophyIcon';

type Props = {
    rating: number | null;
}

const RatingBadge = ({ rating }: Props) => {

    const style = `absolute z-5 top-3 right-2 ${rating === 3 && 'bg-green-400 rotate-12 border-light border-4'} ${(rating === 0 || rating === 1 || rating === 2) && 'bg-red-400 -rotate-12 border-light border-4'} z-10 text-light font-arial font-semibold inline-block px-4 py-3 rounded-full h-20 w-20 shadow-lg flex flex-col justify-center items-center`

    return (
        <div className={style}>
            {rating === 3 &&
            <>
                <TrophyIcon />
                <span className='text-s'>Pass</span>
                </>}
            {(rating === 0 || rating === 1 || rating === 2) &&
            <>
                <SadIcon />
                <span className='text-s'>Fail</span>
            </>}
        </div>
    );
};

export default RatingBadge;