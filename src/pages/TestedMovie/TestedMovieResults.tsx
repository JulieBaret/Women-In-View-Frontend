import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

// Hooks
import { useAuth } from '../../contexts/AuthContext';

// Components
import ErrorBanner from '../../components/ErrorBanner';
import Heading from '../../components/Heading';
import SkeletonMovieCard from '../../components/SkeletonMovieCard';

// External components
import { Pagination } from 'flowbite-react';

// Utils
import { paginationCustomTheme } from '../../utils';

// Types
import MovieGrid, { MovieList } from '../../components/MovieGrid';

const TestedMovieResults = () => {
    const { token } = useAuth();
    const [movieList, setMovieList] = useState<MovieList>([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState("");
    const [searchParams,] = useSearchParams();
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
    const navigate = useNavigate();
    const [totalPages, setTotalPages] = useState(0);
    const [reload, doReload] = useState(false);

    const onPageChange = (selectedPage: number) => {
        setIsPending(true);
        setPage(selectedPage);
        navigate(`/tested-movies?page=${encodeURIComponent(selectedPage)}`);
    }

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

        // Fetch from Tmdb
        fetch(import.meta.env.VITE_API_URL + 'movies?page=' + page, options)
            .then(response => response.json())
            .then((data) => {
                setTotalPages(data.meta.last_page);
                setMovieList(data.data);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setIsPending(false);
            })


    }, [page, reload])

    if (error) {
        return <ErrorBanner isError={Boolean(error)} error="It's been a problem while fetching data" />;
    }

    if (isPending) {
        return (
            <div className="flex flex-col items-center">
                <ul className="gridCard">
                    {Array.from({ length: 12 }).map((skeleton, index) =>
                        <li key={index}><SkeletonMovieCard /></li>
                    )}
                </ul>
            </div>
        )
    }

    if (!movieList.length) {
        return (
            <Heading variant="medium">No movie has been tested yet.</Heading>
        )
    }

    return (
        <>
            <div className="flex flex-col items-center">
                {!isPending && movieList.length && <MovieGrid items={movieList} doReload={doReload} />}
            </div>
            <div className="flex overflow-x-auto sm:justify-center py-10">
                <Pagination tabIndex={0} theme={paginationCustomTheme} currentPage={Number(page)} totalPages={totalPages} onPageChange={onPageChange} showIcons />
            </div>
        </>
    );
};

export default TestedMovieResults;