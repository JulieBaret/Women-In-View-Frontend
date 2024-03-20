import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Hooks
import { useAuth } from '../contexts/AuthContext';

// Components
import ErrorBanner from '../components/ErrorBanner';
import Heading from '../components/Heading';
import Movies from '../components/Movies';
import { Movie } from '../components/SearchResults';
import SkeletonMovieCard from '../components/SkeletonMovieCard';

// External components
import { Pagination } from 'flowbite-react';

// Utils
import { paginationCustomTheme } from '../utils';

const TestedMovies = () => {
    const { token } = useAuth();
    const [movieList, setMovieList] = useState<Movie[]>([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState("");
    const params = useParams();
    const { page } = params;
    const navigate = useNavigate();
    const [totalPages, setTotalPages] = useState(0);
    const [reload, doReload] = useState(false);

    const onPageChange = (selectedPage: number) => {
        setIsPending(true);
        navigate('/tested-movies/' + selectedPage)
    }

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
            <main className="flex justify-center flex-col">
                <Heading variant='large'>Tested movies:</Heading>
                <div className="flex flex-col items-center mt-8">
                    <ul className="gridCard">
                        {Array.from({ length: 12 }).map((skeleton, index) =>
                            <li key={index}><SkeletonMovieCard /></li>
                        )}
                    </ul>
                </div>
            </main>
        )
    }

    if (!movieList.length) {
        return (
            <main className="flex justify-center flex-col">
                <Heading variant='large'>Tested movies:</Heading>
                <Heading variant="medium">No movie has been tested yet.</Heading>
            </main>
        )
    }

    return (
        <main className="flex justify-center flex-col">
            <Heading variant='large'>Tested movies:</Heading>
            <div className="flex flex-col items-center mt-8">
                {!isPending && movieList.length && <Movies movieList={movieList} doReload={doReload}/>}
            </div>
            <div className="flex overflow-x-auto sm:justify-center py-10">
                <Pagination theme={paginationCustomTheme} currentPage={Number(page)} totalPages={totalPages} onPageChange={onPageChange} showIcons />
            </div>
        </main>
    );
};

export default TestedMovies;