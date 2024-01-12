import React from 'react';
import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';

const Home = () => {
    const [searchValue, setSearchValue] = useState("");
    const [data, setData] = useState({});
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState("");
    
    const handleSearch = async (e) => {
        e.preventDefault();
        setIsPending(true);
            try {
                const response = await fetch(`https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&type=movie&page=1&s=${searchValue}`);
                if (!response.ok) throw new Error(response.statusText);
                const json = await response.json();
                setIsPending(false);
                setData(json);
                setError(null);
            } catch (error) {
                setError(`${error} Could not Fetch Data `);
                setIsPending(false);
            }
    }

    return (
        <div className='w-full flex flex-col gap-6'>
            <div className="w-4/6 px-20 py-10 self-center">
                <SearchBar onSubmit={handleSearch} onChange={(e) => setSearchValue(e.target.value)} value={searchValue} label="Search" placeholder="Search for movies..." />
            </div>
            <SearchResults isPending={isPending} error={error} data={data}/>
        </div>
    );
};

export default Home;