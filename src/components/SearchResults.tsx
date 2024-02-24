import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import MovieCard from './MovieCard';
import Heading from './Heading';
import SkeletonMovieCard from './SkeletonMovieCard';

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
    date: Date,
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
                        poster: movie.poster_path,
                        backdrop: movie.backdrop_path,
                        date: movie.release_date,
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
                <ul className="flex flex-wrap gap-4 justify-around">
                    {Array.from({length: 12}).map((skeleton, index) =>
                    <li key={index}><SkeletonMovieCard /></li>
                    )}
                </ul>
                :
                <ul className="flex flex-wrap gap-4 justify-around">
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