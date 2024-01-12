import React from 'react';
import Loading from './Loading';
import MovieCard, { Movie } from './MovieCard';

type Props = {
    isPending: boolean,
    error: string,
    data: {
        Search: Array<Movie>,
        totalResult: any,
        Response: any
    }
}

const SearchResults = ({isPending, error, data}: Props) => {
    if(error) {
        console.log(error)
    };
    if(isPending) return <div className="w-full h-full flex justify-center items-center"><Loading label="Fetching data..."/></div>;
    if(!data || !data.Search || !data.Search.length) return null;
    
    return (
        <div className="flex gap-4 flex-wrap justify-center">
            {data.Search.map((movie) => 
            <MovieCard movie={movie}/>)}
        </div>
    )
};

export default SearchResults;