import React from 'react';
import MovieCard from './MovieCard';
import { Movie } from './SearchResults';

type Props = {
    movieList: Array<Movie>
}

const Movies = ({ movieList }: Props) => {
    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {movieList.map((movie, index) =>
                <li key={index}>
                    <MovieCard movie={movie} />
                </li>
            )}
        </ul>
    );
};

export default Movies;