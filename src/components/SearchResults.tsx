import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Loading from './Loading';
import MovieCard from './MovieCard';

type Props = {
    dataFromOmdb: dataFromOmdb,
    dataFromBechdel: dataFromBechdel,
    isPending: boolean,
    setIsPending: (value: boolean) => void;
}

type dataFromBechdel = Array<MovieFromBechdel>

type MovieFromBechdel = {
    ddate: string,
    dubious: string,
    id: number,
    imdbid: string,
    rating: number,
    submitterid: number,
    title: string,
    visible: string,
    year: number
}

type dataFromOmdb = {
    Search: Array<MovieFromOmdb>,
    totalResult: any,
    Response: any
}

type MovieFromOmdb = {
    Title: string,
    Year: string,
    imdbID: string,
    Type: string,
    Poster: string
}

export type MovieList = Array<Movie>

export type Movie = {
    imdbId: string,
    title: string,
    picture: string,
    year: string,
    type: string,
    rating: number,
    ratingOrigin: string | null,
}

const SearchResults = ({ dataFromOmdb, dataFromBechdel, isPending, setIsPending }: Props) => {
    const [movieList, setMovieList] = useState<MovieList>([]);

    // Formatting data and matching both APIs
    useEffect(() => {
        if (dataFromOmdb && dataFromOmdb.Search && dataFromOmdb.Search.length) {
            const tempMovieList: MovieList = dataFromOmdb.Search.filter((movie) => movie.Poster.length > 3 && movie.Title && movie.Year).map((movie) => {
                return {
                    imdbId: movie.imdbID,
                    title: movie.Title,
                    picture: movie.Poster,
                    year: movie.Year,
                    type: movie.Type,
                    rating: -1,
                    ratingOrigin: null,
                }
            }).map(movie => {
                const matchingMovie = dataFromBechdel.find(
                    movieWithRating => `tt${movieWithRating.imdbid}` === movie.imdbId
                );
                if (matchingMovie) {
                    return {
                        ...movie,
                        rating: matchingMovie.rating,
                    };
                } else {
                    return movie;
                }
            });
            setMovieList(tempMovieList);
            const timeoutId = setTimeout(() => {
                setIsPending(false);
            }, 1000);
            return () => clearTimeout(timeoutId);
        }
    }, [dataFromOmdb, dataFromBechdel]);

    return (
        <>
            {isPending ? <div className="w-full h-full flex justify-center items-center"><Loading label="Fetching data..." /></div> :
                <ul className="flex gap-4 flex-wrap justify-center">
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