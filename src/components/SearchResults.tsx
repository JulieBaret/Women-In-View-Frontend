import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Loading from './Loading';
import MovieCard from './MovieCard';
import Heading from './Heading';

type Props = {
    dataFromOmdb: dataFromOmdb,
    isPending: boolean,
    setIsPending: (value: boolean) => void;
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

const SearchResults = ({ dataFromOmdb, isPending, setIsPending }: Props) => {
    const [movieList, setMovieList] = useState<MovieList>([]);
    const [hasNoResults, setHasNoResults] = useState(false);

    // Formatting data and matching both APIs
    useEffect(() => {
        setHasNoResults(dataFromOmdb && dataFromOmdb.Response === 'False');
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
            });
            setMovieList(tempMovieList);
            setIsPending(false);
        }
    }, [dataFromOmdb]);

    return (
        <>
        {hasNoResults ? 
        <span className="text-center"><Heading variant="medium">Oups, no result found...</Heading></span>
            : isPending ? 
                <div className="w-full h-full flex justify-center items-center">
                    <Loading label="Fetching data..." />
                </div> 
                :
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