import React, { useState } from 'react';
import { useEffect } from 'react';
import Loading from '../components/Loading';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import ErrorBanner from '../components/ErrorBanner';

const Home = () => {
    const [value, setValue] = useState("");
    const [dataFromTmdb, setDataFromTmdb] = useState({});
    const [isPending, setIsPending] = useState(false);
    const [errorFromTmdb, setErrorFromTmdb] = useState("");
    const [lengthError, setLengthError] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (value.length < 3) {
            setLengthError(true);
            return;
        }
        setIsPending(true);

        // Fetch from Tmdb
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
            }
        };
        fetch(`https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=en-US&page=1`, options)
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            setDataFromTmdb(data)
        })
        .catch((err) => {
            console.error(err);
            setErrorFromTmdb(error);
        });
    };


    return (
        <div className='w-full flex flex-col gap-6'>
            <div className="w-full md:w-4/6 self-center">
                <SearchBar onSubmit={handleSearch} onChange={(e) => setValue(e.target.value)} value={value} label="Search" placeholder="Search for a movie title..." />
            </div>
            {lengthError && <ErrorBanner isError={lengthError} error="You must type at least 3 characters" />}
            {errorFromTmdb && <ErrorBanner isError={errorFromTmdb} error="It's been a problem while fetching data" />}
            {!lengthError && !errorFromTmdb && dataFromTmdb && <SearchResults dataFromTmdb={dataFromTmdb} isPending={isPending} setIsPending={setIsPending} />}
        </div>
    );
};

export default Home;