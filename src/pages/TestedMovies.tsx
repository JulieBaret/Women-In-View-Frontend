import React, { useEffect, useState } from 'react';
import ErrorBanner from '../components/ErrorBanner';
import Heading from '../components/Heading';
import Movies from '../components/Movies';
import { Movie } from '../components/SearchResults';
import SkeletonMovieCard from '../components/SkeletonMovieCard';
import { useAuth } from '../contexts/AuthContext';
import { CustomFlowbiteTheme, Pagination } from 'flowbite-react';
import { useNavigate, useParams } from 'react-router-dom';

const customTheme: CustomFlowbiteTheme['pagination'] = {
    pages: {
        previous: {
            base: "ml-0 rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 inline-flex",
        },
        next: {
            base: "rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 inline-flex",
        },
        selector: {
            base: "w-12 border border-gray-300 bg-white py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100",
            active: "bg-primary",
        },
    },

};

const TestedMovies = () => {
    const { token } = useAuth();
    const [movieList, setMovieList] = useState<Movie[]>([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState("");
    const params = useParams();
    const { page } = params;
    const navigate = useNavigate();
    const [totalPages, setTotalPages] = useState(0);
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
                console.error(err);
                setError(err);
            })
            .finally(() => {
                setIsPending(false);
            })


    }, [page])

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
                {!isPending && movieList.length && <Movies movieList={movieList} />}
            </div>
            <div className="flex overflow-x-auto sm:justify-center py-10">
                <Pagination theme={customTheme} currentPage={Number(page)} totalPages={totalPages} onPageChange={onPageChange} showIcons />
            </div>
        </main>
    );
};

export default TestedMovies;