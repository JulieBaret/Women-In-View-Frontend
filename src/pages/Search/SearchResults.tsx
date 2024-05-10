import React, { useEffect, useState } from 'react';

// Components
import ErrorBanner from '../../components/ErrorBanner';
import Heading from '../../components/Heading';
import MovieGrid from '../../components/MovieGrid';
import SkeletonMovieCard from '../../components/SkeletonMovieCard';

// Context
import { useAuth } from '../../contexts/AuthContext';

type Props = {
    query?: string
}

const SearchResults = ({ query }: Props) => {
    const { token } = useAuth();
    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState("");
    const [reload, doReload] = useState(false);

    useEffect(() => {
        // Fetch options
        const options = {
            method: 'GET',
            withCredential: true,
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + token
            }
        };
        fetch(import.meta.env.VITE_API_URL + 'search-movies/' + query, options)
            .then(response => response.json())
            .then((data) => {
                setData(Object.values(data.data));
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setIsPending(false);
            })
    }, [query, reload]);

    if (error) {
        return <ErrorBanner isError={Boolean(error)} error="It's been a problem while fetching data" />
    };

    if (isPending) {
        return (<ul className="gridCard mb-10">
            {Array.from({ length: 6 }).map((skeleton, index) =>
                <li key={index}><SkeletonMovieCard /></li>
            )}
        </ul>)
    };

    if (!data.length) {
        return <Heading variant="medium">Oups, nothing was found...</Heading>
    }

    return (
        <MovieGrid items={data} doReload={doReload} />
    );
};

export default SearchResults;