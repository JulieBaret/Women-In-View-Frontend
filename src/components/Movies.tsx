import React from 'react';
import MovieCard from './MovieCard';
import { Movie } from './SearchResults';

type Props = {
    movieList: Array<Movie>
}

const Movies = ({ movieList }: Props) => {
    return (
        <ul className="gridCard">
            {movieList.map((movie, index) =>
                <li key={index}>
                    <MovieCard movie={movie} />
                </li>
            )}
        </ul>
    );
};

export default Movies;