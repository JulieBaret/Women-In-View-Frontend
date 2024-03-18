import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Heading from './Heading';
import SkeletonMovieCard from './SkeletonMovieCard';
import Movies from './Movies';

type Props = {
    data: Data,
    isPending: boolean,
    setIsPending: (value: boolean) => void;
}

type Data = {
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
    id: number,
    tmdb_id: number,
    original_title: string,
    poster_path: string,
    backdrop_path: string,
    release_date: Date,
    overview: string,
    rating: number,
    user_id: number
}

const SearchResults = ({ data, isPending, setIsPending }: Props) => {
    const [movieList, setMovieList] = useState<MovieList>([]);
    const [hasNoResults, setHasNoResults] = useState(false);

    // Formatting data
    useEffect(() => {
        if (data && data.results) {
            if (data.results.length) {
                const tempMovieList: MovieList = data.results.filter((movie) => movie.title && movie.poster_path && movie.backdrop_path && movie.release_date && movie.overview).map((movie) => {
                    return {
                        id: -1,
                        tmdb_id: movie.id,
                        original_title: movie.title,
                        poster_path: movie.poster_path,
                        backdrop_path: movie.backdrop_path,
                        release_date: movie.release_date,
                        overview: movie.overview,
                        rating: -1,
                        user_id: -1
                    }
                })
                setMovieList(tempMovieList);
                setIsPending(false);
                setHasNoResults(false);
            } else {
                setHasNoResults(true);

            }
        }
    }, [data]);

    if (hasNoResults) {
        return <Heading variant="medium">Oups, nothing was found...</Heading>;
    }

    if (isPending) {
        return <ul className="flex flex-wrap gap-4 justify-around">
            {Array.from({ length: 12 }).map((skeleton, index) =>
                <li key={index}><SkeletonMovieCard /></li>
            )}
        </ul>;
    }

    return (
        <div className='flex flex-col items-center'>
            <Movies movieList={movieList} />
        </div>
    )
};

export default SearchResults;