import React, { useState } from 'react';
import Loading from '../components/Loading';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';

const Home = () => {
    const [value, setValue] = useState("");
    const [dataFromOmdb, setDataFromOmdb] = useState({});
    const [dataFromBechdel, setDataFromBechdel] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [errorFromOmdb, setErrorFromOmdb] = useState("");
    const [errorFromBechdel, setErrorFromBechdel] = useState("");

    // TODO : replace white spaces by '-' or trim value before fetching API

    const handleSearch = async (e) => {
        e.preventDefault();
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
        }

        // Fetch from Bechdel
        const apiUrl = `http://bechdeltest.com/api/v1/getMoviesByTitle?title=${value}`;
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        try {
            const responseFromBechdel = await fetch(`${proxyUrl}${apiUrl}`);
            if (!responseFromBechdel.ok) throw new Error(response.statusText);
            const jsonFromBechdel = await responseFromBechdel.json();
            setDataFromBechdel(jsonFromBechdel);
            setErrorFromBechdel(null);
        } catch (error) {
            setErrorFromBechdel(`${error} Could not Fetch Data `);
        }
        setIsPending(false);
    }

    return (
        <div className='w-full flex flex-col gap-6'>
            <div className="w-full md:w-4/6 self-center">
                <SearchBar onSubmit={handleSearch} onChange={(e) => setValue(e.target.value)} value={value} label="Search" placeholder="Search for movies..." />
            </div>
            
            {isPending && <div className="w-full h-full flex justify-center items-center"><Loading label="Fetching data..."/></div>}
            
            {dataFromOmdb && <SearchResults dataFromOmdb={dataFromOmdb} dataFromBechdel={dataFromBechdel} errorFromOmdb={errorFromOmdb} errorFromBechdel={errorFromBechdel}/>}
        </div>
    );
};

export default Home;