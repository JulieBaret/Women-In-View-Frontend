import Button from './Button';
import React from 'react';

type Props = {
    movie: Movie
}

export type Movie = {
    Title: string,
    Year: string,
    imdbID: string,
    Type: string,
    Poster: string
}

const MovieCard = ({ movie }: Props) => {
    return (

        <div
            className="rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] w-64 h-112">
            <div
                className="relative overflow-hidden bg-cover bg-no-repeat"
                data-te-ripple-init
                data-te-ripple-color="light">
                <img
                    className="rounded-t-lg object-cover w-full h-full"
                    src={movie.Poster}
                    alt={movie.Title} />
                <a href="#!">
                    <div
                        className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
                </a>
            </div>
            <div className="px-4 py-4">
                <div className="font-bold text-l">{movie.Title}</div>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-2">{movie.Year}</span>
            </div>
        </div>
    );
};

export default MovieCard;