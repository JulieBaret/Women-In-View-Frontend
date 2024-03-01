import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ErrorBanner from '../components/ErrorBanner';
import Heading from '../components/Heading';
import SearchResults from '../components/SearchResults';

const Results = () => {
    const params = useParams();
    const { query } = params;
    const [dataFromTmdb, setDataFromTmdb] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [errorFromTmdb, setErrorFromTmdb] = useState("");

    useEffect(() => {
        // Fetch options
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + import.meta.env.VITE_TMDB_TOKEN
            }
        };
    
        // Fetch from Tmdb
        fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`, options)
            .then(response => response.json())
            .then((data) => {
                setDataFromTmdb(data);
            })
            .catch((err) => {
                console.error(err);
                setErrorFromTmdb(err);
            });
        

    }, [query])

    if (errorFromTmdb) {
        return <ErrorBanner isError={Boolean(errorFromTmdb)} error="It's been a problem while fetching data" />;
    }
    return (
        <main className="flex justify-center flex-col">
            <Heading variant='large'>Results for «{query}»:</Heading>
            <div className="mt-8">
                {!errorFromTmdb && dataFromTmdb && <SearchResults dataFromTmdb={dataFromTmdb} isPending={isPending} setIsPending={setIsPending} />}
            </div>
        </main>
    );
};

export default Results;