import React, { useEffect, useState } from 'react';
import ErrorBanner from '../components/ErrorBanner';
import Heading from '../components/Heading';
import Movies from '../components/Movies';
import { Movie } from '../components/SearchResults';
import SkeletonMovieCard from '../components/SkeletonMovieCard';
import { useAuth } from '../contexts/AuthContext';

const LastReviews = () => {
    const { token } = useAuth();
    const [movieList, setMovieList] = useState<Movie[]>([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        // Fetch options
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + token
            }
        };
    
        // Fetch from Tmdb
        fetch(import.meta.env.VITE_API_URL + 'movies', options)
            .then(response => response.json())
            .then((data) => {
                setMovieList(data.data);
            })
            .catch((err) => {
                console.error(err);
                setError(err);
            })
            .finally(() => {
                setIsPending(false);
            })
        

    }, [])

    if (error) {
        return <ErrorBanner isError={Boolean(error)} error="It's been a problem while fetching data" />;
    }
    
    if (movieList) {
        console.log(movieList);
    }

    return (
        <main className="flex justify-center flex-col">
            <Heading variant='large'>Last reviews:</Heading>
            <div className="flex flex-col items-center mt-8">
            {isPending && 
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((skeleton, index) =>
                <li key={index}><SkeletonMovieCard /></li>
            )}
            </ul>}
                {!isPending && movieList && <Movies movieList={movieList}/>}
            </div>
        </main>
    );
};

export default LastReviews;