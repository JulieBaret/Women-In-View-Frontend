import React, { useEffect, useState } from 'react';
import ErrorBanner from '../components/ErrorBanner';
import Heading from '../components/Heading';
import Movies from '../components/Movies';
import { Movie } from '../components/SearchResults';
import SkeletonMovieCard from '../components/SkeletonMovieCard';
import { useAuth } from '../contexts/AuthContext';
import { CustomFlowbiteTheme, Pagination } from 'flowbite-react';
import { useParams } from 'react-router-dom';

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

const LastReviews = () => {
    const { token } = useAuth();
    const [movieList, setMovieList] = useState<Movie[]>([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const onPageChange = (page: number) => {
        setIsPending(true);
        setCurrentPage(page);
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
        fetch(import.meta.env.VITE_API_URL + 'movies?page=' + currentPage, options)
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


    }, [currentPage])

    if (error) {
        return <ErrorBanner isError={Boolean(error)} error="It's been a problem while fetching data" />;
    }

    if (isPending) {
        return (
            <main className="flex justify-center flex-col">
                <Heading variant='large'>Tested movies:</Heading>
                <div className="flex flex-col items-center mt-8">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
            <div className="flex overflow-x-auto sm:justify-center mt-6">
                <Pagination theme={customTheme} currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} showIcons />
            </div>
        </main>
    );
};

export default LastReviews;