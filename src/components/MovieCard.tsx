import React from 'react';
import { truncate } from '../utils';
import RatingBadge from './RatingBadge';
import { Movie } from './SearchResults';

type Props = {
    movie: Movie
}

const MovieCard = ({ movie }: Props) => {
    return (

        <div
            className="rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] w-64 h-112">
            <div
                className="relative overflow-hidden bg-cover bg-no-repeat">
                <RatingBadge rating={movie.rating}/>
                <img
                    className="rounded-t-lg object-cover h-[384px]"
                    src={movie.poster}
                    alt={movie.title} />
                <a href="#!">
                    <div
                        className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 flex">
                            {movie.overview && <span className='text-light self-end p-4 bg-black bg-opacity-70'>{truncate(movie.overview, 160)}</span>}
                        </div>
                </a>
            </div>
            <div className="px-4 py-4 flex flex-col gap-2">
                <span className="font-bold text-l">{truncate(movie.title, 28)}</span>
                <span className="self-end bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">{movie.date}</span>
            </div>
        </div>
    );
};

export default MovieCard;