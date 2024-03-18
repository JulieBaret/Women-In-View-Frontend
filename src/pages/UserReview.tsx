import React, { useState } from 'react';
import { useEffect } from 'react';

// Hooks
import { useAuth } from '../contexts/AuthContext';

// Icons
import { MovieList } from '../components/SearchResults';
import Loading from '../components/Loading';

// Components
import Heading from '../components/Heading';
import InfoCard from '../components/InfoCard';
import { useParams } from 'react-router-dom';
import PelliculeIcon from '../components/icons/PelliculeIcon';
import BrokenHeartIcon from '../components/icons/BrokenHeartIcon';

const UserReview = () => {
    const { token } = useAuth();
    const params = useParams();
    const { userId } = params;
    const [reviews, setReviews] = useState<MovieList>([]);
    const [isPending, setIsPending] = useState(true);
    const [reload, doReload] = useState(false);

    if (!token || !userId) {
        return null
    }

    // Fetching user data from DB
    useEffect(() => {
        const options = {
            method: 'GET',
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
                console.error(err);
            })
            .finally(() => {
                setIsPending(false);
            })
    }, [reload]);

    if(isPending) {
        return (
            <main className="flex flex-col">
                <Heading variant="large">My contributions:</Heading>
                <div className="flex p-20 h-full items-center justify-center text-grey">
                    <Loading />Fetching data...
                </div>
            </main>
        )
    }

    if(!isPending && !reviews.length) {
        return (
            <main className="flex flex-col">
                <Heading variant='medium'>You haven't any movie review yet!</Heading>
                <p className='py-4 font-bold'>You can start testing some films.</p>
            </main>
        )
    }

    return (
        <main className="flex flex-col">
            <Heading variant="large">My contributions:</Heading>
            <ul className="mt-8 rounded-lg shadow flex flex-col divide-y divide-gray-200">
                {reviews.map((review) => (
                    <InfoCard key={review.id} itemId={review.id} itemsType="movies" doReload={() => doReload((prev) => !prev)}>
                        <div className='flex gap-4 items-center'>
                            <img className='h-24 rounded' src={`https://image.tmdb.org/t/p/original/${review.poster_path}`} />
                            <div className='flex flex-col'>
                                <h3 className="text-lg font-medium text-gray-800">{review.original_title}</h3>
                                <p className="text-gray-600 text-base">According to your review, this movie</p>
                                <div className={`flex items-center gap-2 font-bold ${review.rating === 3 ? "text-primary" : "text-secondary"}`}>{review.rating === 3 ? <div className='w-4'><PelliculeIcon /></div> : <div className='w-4'><BrokenHeartIcon /></div>}<p>{review.rating === 3 ? "pass" : "fail"} the Bechdel test</p></div>
                            </div>
                        </div>
                    </InfoCard>
                ))}
            </ul>
        </main>
    );
};

export default UserReview;