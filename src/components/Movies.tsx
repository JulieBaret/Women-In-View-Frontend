import React from 'react';
import MovieCard from './MovieCard';

type Props = {
    movieList: MovieList;
    doReload: (boolean) => void;
}

export type MovieList = Array<Movie>;

export type Movie = {
    id: number,
    tmdb_id: number,
    original_title: string,
    poster_path: string,
    backdrop_path: string,
    release_date: Date,
    overview: string,
    rating?: number,
    user_id?: number
};

const Movies = ({ movieList, doReload }: Props) => {
    return (
        <ul className="gridCard">
            {movieList.filter((movie) => movie.original_title && movie.poster_path && movie.backdrop_path && movie.release_date && movie.overview).map((movie, index) =>
                <li key={index}>
                    <MovieCard movie={movie} doReload={doReload} />
                </li>
            )}
        </ul>
    );
};

export default Movies;