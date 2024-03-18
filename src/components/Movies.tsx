import React from 'react';
import MovieCard from './MovieCard';

type Props = {
    movieList: Array<Movie>;
    doReload: (boolean) => void;
}

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
}

const Movies = ({ movieList, doReload }: Props) => {
    return (
        <ul className="gridCard">
            {movieList.map((movie, index) =>
                <li key={index}>
                    <MovieCard movie={movie} doReload={doReload} />
                </li>
            )}
        </ul>
    );
};

export default Movies;