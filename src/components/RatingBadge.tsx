import React from 'react';
import BrokenHeartIcon from './icons/BrokenHeartIcon';
import EditIcon from './icons/EditIcon';
import PelliculeIcon from './icons/PelliculeIcon';

type Props = {
    rating: number;
}

const RatingBadge = ({ rating }: Props) => {

    const style = `absolute left-0 top-0 text-sm ${rating === 3 && 'bg-primary'} ${(rating === 0 || rating === 1 || rating === 2) && 'bg-secondary'} ${rating === -1 && 'bg-grey'} text-light font-semibold px-4 py-2 rounded-r-lg shadow-lg flex flex-row gap-1`

    return (
        <div className={style}>
            {rating === 3 &&
                <>
                    <span>Pass</span><span className="hidden sm:block">the Bechdel Test</span>
                    <div className="ml-1 w-4 sm:w-5">
                        <PelliculeIcon />
                    </div>
                </>}
            {(rating === 0 || rating === 1 || rating === 2) &&
                <>
                    <span>Fail</span><span className="hidden sm:block">the Bechdel Test</span>
                    <div className="ml-1 w-4 sm:w-5">
                        <BrokenHeartIcon />
                    </div>
                </>}
            {rating === -1 &&
                <>
                    <span>Let's test it</span>
                    <div className="ml-1 w-5">
                        <EditIcon />
                    </div>
                </>
            }
        </div>
    );
};

export default RatingBadge;