import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import MovieCard from './MovieCard';

type Props = {
    dataFromOmdb: dataFromOmdb,
    dataFromBechdel: dataFromBechdel,
    errorFromOmdb: string,
    errorFromBechdel: string
}

export type dataFromBechdel = Array<{
    ddate : string,
    dubious : string,
    id : number,
    imdbid : string,
    rating : number,
    submitterid : number,
    title : string,
    visible : string,
    year : number
}>

export type dataFromOmdb = {
    Search: Array<MovieFromOmdb>,
    totalResult: any,
    Response: any
}

export type MovieFromOmdb = {
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

const SearchResults = ({dataFromOmdb, dataFromBechdel, errorFromOmdb, errorFromBechdel}: Props) => {
    const [matchingMovieList, setMatchingMovieList] = useState([]);
    
    if(errorFromOmdb) console.log(errorFromOmdb)
    if(errorFromBechdel) console.log(errorFromBechdel)
    if(!dataFromOmdb || !dataFromOmdb.Search || !dataFromOmdb.Search.length) return null;

    const movieList: MovieList = dataFromOmdb.Search.map((movie) => {
        return {
            imdbId: movie.imdbID,
            title: movie.Title,
            picture: movie.Poster,
            year: movie.Year,
            type: movie.Type,
            rating: Math.floor(Math.random() * 5) - 1,
            ratingOrigin: null,
        }
    });

    // useEffect(() => {
    //     const tempMovieList = [...movieList];

    //     tempMovieList.forEach(movieFromOmdb => {
    //         const matching = dataFromBechdel.find(movieFromBechdel => movieFromBechdel.imdbid === movieFromOmdb.imdbId);
    //         if(matching) {
    //             movieFromOmdb.rating = matching.rating;
    //         }
    //     });
    //     setMatchingMovieList(tempMovieList);
    // }, []);

    // console.log(movieList);

    // if () return (
    //     <div className="flex justify-center items-center w-full">
    //         <Heading variant="medium">Oups... No results found</Heading>
    //     </div>
    // )

    return (
        <ul className="flex gap-4 flex-wrap justify-center">
                {movieList.map((movie, index) => 
                <li key={index}>
                <MovieCard movie={movie}/>
                </li>
                )}
        </ul>
    )
};

export default SearchResults;