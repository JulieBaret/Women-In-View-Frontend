import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Loading from './Loading';
import MovieCard from './MovieCard';
import Heading from './Heading';

type Props = {
    dataFromTmdb: dataFromTmdb,
    isPending: boolean,
    setIsPending: (value: boolean) => void;
}

type dataFromTmdb = {
    results: Array<MovieFromTmdb> | [],
    page: number,
    total_pages: number,
    total_results: number
}

type MovieFromTmdb = {
    adult: boolean,
    backdrop_path: string,
    genre_ids: Array<number>,
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: Date,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}

export type MovieList = Array<Movie>

export type Movie = {
    tmdbId: number,
    title: string,
    poster: string,
    backdrop: string,
    date: number,
    overview: string,
    rating: number
}

const SearchResults = ({ dataFromTmdb, isPending, setIsPending }: Props) => {
    const [movieList, setMovieList] = useState<MovieList>([]);
    const [hasNoResults, setHasNoResults] = useState(false);

    // Formatting data
    useEffect(() => {
        if(dataFromTmdb && dataFromTmdb.results){
            if(dataFromTmdb.results.length){
                const tempMovieList: MovieList = dataFromTmdb.results.filter((movie) => movie.title && movie.poster_path && movie.backdrop_path && movie.release_date && movie.overview).map((movie) => {
                    return {
                        tmdbId: movie.id,
                        title: movie.title,
                        poster: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
                        backdrop: `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`,
                        date: new Date(movie.release_date).getFullYear(),
                        overview: movie.overview,
                        rating: -1
                    }
                })
                setMovieList(tempMovieList);
                setIsPending(false);
            } else {
                setHasNoResults(true);
            }
        }
    }, [dataFromTmdb]);

    return (
        <>
        {hasNoResults ? 
        <span><Heading variant="medium">Oups, nothing was found...</Heading></span>
            : isPending ? 
                <div className="w-full h-full flex justify-center items-center">
                    <Loading label="Fetching data..." />
                </div> 
                :
                <ul className="flex flex-wrap gap-4 justify-between">
                    {movieList.map((movie, index) =>
                        <li key={index}>
                            <MovieCard movie={movie} />
                        </li>
                    )}
                </ul>
            }
        </>
    )
};

export default SearchResults;