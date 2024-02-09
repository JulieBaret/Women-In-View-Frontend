import React, { useState } from 'react';
import { useEffect } from 'react';
import Loading from '../components/Loading';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import ErrorBanner from '../components/ErrorBanner';

const Home = () => {
    const [value, setValue] = useState("");
    const [dataFromOmdb, setDataFromOmdb] = useState({});
    const [isPending, setIsPending] = useState(false);
    const [errorFromOmdb, setErrorFromOmdb] = useState("");
    const [lengthError, setLengthError] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if(value.length < 3) {
            setLengthError(true);
            return;
        } else {
            setLengthError(false);
        }
        setIsPending(true);

        // Fetch from Omdb
        try {
            const responseFromOmdb = await fetch(`https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&type=movie&s=${value}`);
            if (!responseFromOmdb.ok) throw new Error(response.statusText);
            const jsonFromOmdb = await responseFromOmdb.json();
            setDataFromOmdb(jsonFromOmdb);
            setErrorFromOmdb(null);
        } catch (error) {
            setErrorFromOmdb(`${error} Could not Fetch Data `);
            setIsPending(false);
        }
    }

    useEffect(() => {
        if(errorFromOmdb){
            console.log(errorFromOmdb)
        }
    }, [errorFromOmdb]);


    return (
        <div className='w-full flex flex-col gap-6'>
            <div className="w-full md:w-4/6 self-center">
                <SearchBar onSubmit={handleSearch} onChange={(e) => setValue(e.target.value)} value={value} label="Search" placeholder="Search for a movie title..." />
            </div>
            {lengthError && <ErrorBanner isError={lengthError} error="You must type at least 3 characters"/>}
            {errorFromOmdb && <ErrorBanner isError={errorFromOmdb} error="It's been a problem while fetching data" /> }
            {!lengthError && !errorFromOmdb && dataFromOmdb && <SearchResults dataFromOmdb={dataFromOmdb} isPending={isPending} setIsPending={setIsPending}/>}
        </div>
    );
};

export default Home;