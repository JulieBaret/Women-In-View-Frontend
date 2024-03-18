import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ErrorBanner from '../components/ErrorBanner';
import Heading from '../components/Heading';
import { useAuth } from '../contexts/AuthContext';
import Movies from '../components/Movies';
import SkeletonMovieCard from '../components/SkeletonMovieCard';

const Results = () => {
    const params = useParams();
    const { query } = params;
    const { token } = useAuth();
    const [data, setData] = useState([]);
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
        fetch(import.meta.env.VITE_API_URL + 'search-movies/' + query, options)
            .then(response => response.json())
            .then((data) => {
                setData(Object.values(data.data));
            })
            .catch((err) => {
                console.error(err);
                setError(err);
            })
            .finally(() => {
                setIsPending(false);
            })
    }, [query])

    if (error) {
        return (
            <main className="flex justify-center flex-col">
                <Heading variant='large'>Results for «{query}»:</Heading>
                <div className="mt-8">
                    <ErrorBanner isError={Boolean(error)} error="It's been a problem while fetching data" />
                </div>
            </main>
        )
    }

    if (isPending) {
        return (
            <main className="flex justify-center flex-col">
                <Heading variant='large'>Results for «{query}»:</Heading>
                <div className="mt-8">
                    <ul className="gridCard">
                        {Array.from({ length: 12 }).map((skeleton, index) =>
                            <li key={index}><SkeletonMovieCard /></li>
                        )}
                    </ul>
                </div>
            </main>
        )
    }

    if (!isPending && !data.length) {
        return (
            <main className="flex justify-center flex-col">
                <Heading variant='large'>Results for «{query}»:</Heading>
                <div className="mt-8">
                    <Heading variant="medium">Oups, nothing was found...</Heading>
                </div>
            </main>
        )
    }

    return (
        <main className="flex justify-center flex-col">
            <Heading variant='large'>Results for «{query}»:</Heading>
            <div className="mt-8">
                {!error && data.length && <Movies movieList={data} />}
            </div>
        </main>
    );
};

export default Results;