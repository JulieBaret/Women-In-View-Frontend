import React, { useEffect, useState } from 'react';

// Icons
import BrokenHeartIcon from '../../components/icons/BrokenHeartIcon';
import PelliculeIcon from '../../components/icons/PelliculeIcon';

// Components
import ErrorBanner from '../../components/ErrorBanner';
import Heading from '../../components/Heading';
import { MovieList } from '../../components/MovieGrid';
import SearchInput from '../../components/SearchInput';
import InfoCard from '../../components/InfoCard';
import SkeletonInfoCard from '../../components/SkeletonInfoCard';

// Context
import { useAuth } from '../../contexts/AuthContext';

type Props = {
    userId?: string;
}

const UserContributionResults = ({ userId }: Props) => {
    const { token, user } = useAuth();
    const [reviews, setReviews] = useState<MovieList>([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState("");
    const [reload, doReload] = useState(false);

    if (!token || !userId || !user) {
        return null
    }

    if (userId != user.id) {
        return <ErrorBanner isError={true} error="You're not authorized to access another user contributions" />
    }

    // Fetching user data from DB
    useEffect(() => {
        setIsPending(true);

        const options = {
            method: 'GET',
            withCredential: true,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + token
            }
        };
        fetch(import.meta.env.VITE_API_URL + 'user-movies/' + userId, options)
            .then(response => response.json())
            .then((data) => {
                setReviews(data);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setIsPending(false);
            })
    }, [reload]);

    if (error) {
        return <ErrorBanner isError={Boolean(error)} error="It's been a problem while fetching data" />
    }

    if (isPending) {
        return (<ul className="rounded-lg shadow flex flex-col divide-y divide-gray-200">
            {Array.from({ length: 12 }).map((skeleton, index) =>
                <li key={index}><SkeletonInfoCard /></li>
            )}
        </ul>)
    }

    if (!reviews.length) {
        return (<div className='mt-2 flex flex-col gap-4'>
            <Heading variant='medium'>You haven't test any movie yet!</Heading>
            <h2 className='text-lg lg:text-xl 2xl:text-2xl font-medium leading-tight'>You can start searching for a movie and submit it to the Bechdel Test:</h2>
            <div className='block w-fit bg-primary rounded-full'>
                <SearchInput />
            </div>
        </div>)
    }

    return (
        <ul className="rounded-lg shadow flex flex-col divide-y divide-gray-200">
            {reviews.map((review) => (
                <InfoCard key={review.id} itemId={review.id} itemsType="movies" doReload={() => doReload((prev) => !prev)}>
                    <div className='flex gap-4 items-center'>
                        <img className='h-24 rounded' src={`https://image.tmdb.org/t/p/w92${review.poster_path}`} />
                        <div className='flex flex-col'>
                            <h3 className="text-lg font-medium text-gray-800 leading-tight md:leading-normal">{review.original_title}</h3>
                            <p className="text-gray-600 text-sm md:text-base">According to your review, this movie</p>
                            <div className={`flex items-center gap-2 text-sm md:text-base font-bold ${review.rating === 3 ? "text-primary" : "text-secondary"}`}>{review.rating === 3 ? <div className='w-4'><PelliculeIcon /></div> : <div className='w-4'><BrokenHeartIcon /></div>}<p>{review.rating === 3 ? "pass" : "fail"} the Bechdel test</p></div>
                        </div>
                    </div>
                </InfoCard>
            ))}
        </ul>
    );
};

export default UserContributionResults;