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

const Reviews = () => {
    const { token } = useAuth();
    const [reviews, setReviews] = useState<MovieList>([]);
    const [isPending, setIsPending] = useState(true);
    const [reload, doReload] = useState(false);

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
        fetch(import.meta.env.VITE_API_URL + 'movies', options)
            .then(response => response.json())
            .then((data) => {
                setReviews(data.data)
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setIsPending(false);
            })
    }, [reload]);

    return (
        <div className="p-10">
            <Heading variant="medium">Reviews:</Heading>
            {isPending && <div className="flex p-20 h-full items-center justify-center text-grey">
                <Loading />Fetching data...</div>}
                <ul className="mt-8 rounded-lg shadow flex flex-col divide-y divide-gray-200">
                {reviews.map((review) => (
                    <InfoCard key={review.id} itemId={review.id} itemsType="movies" doReload={() => doReload((prev) => !prev)}>
                        <>
                            <h3 className="text-lg font-medium text-gray-800">{review.original_title}</h3>
                            <p className="text-gray-600 text-base">tmdb_id: {review.tmdb_id}</p>
                            <p className="text-gray-600 text-base">rating: {review.rating}</p>
                            <p className="text-gray-600 text-base">reviewed by user: {review.user_id}</p>
                        </>
                    </InfoCard>
                ))}
            </ul>
        </div>
    );
};

export default Reviews;