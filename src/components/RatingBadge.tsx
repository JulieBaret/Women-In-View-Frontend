import React from 'react';
import BrokenHeartIcon from './icons/BrokenHeartIcon';
import EditIcon from './icons/EditIcon';
import PelliculeIcon from './icons/PelliculeIcon';

type Props = {
    rating: number | null;
}

const RatingBadge = ({ rating }: Props) => {

    const style = `absolute left-0 top-0 ${rating === 3 && 'bg-primary'} ${(rating === 0 || rating === 1 || rating === 2) && 'bg-secondary'} ${rating === -1 && 'bg-grey'} text-light font-arial font-semibold px-4 py-2 rounded-r-lg shadow-lg flex flex-row justify-center items-center gap-2`

    return (
        <div className={style}>
            {rating === 3 &&
            <>
                <span className='text-xs'>Passed the Bechdel Test! </span>
                <div className="w-5">
                <PelliculeIcon />
                </div>    
            </>}
            {(rating === 0 || rating === 1 || rating === 2) &&
            <>
                <span className='text-xs'>Failed the Bechdel Test! </span>
                <div className="w-5">
                <BrokenHeartIcon />
                </div>    
            </>}
            {rating === -1 &&
            <>
                <span className='text-xs'>Wait for your review</span>
                <div className="w-5">
                <EditIcon />
                </div>    
            </>
            }
        </div>
    );
};

export default RatingBadge;