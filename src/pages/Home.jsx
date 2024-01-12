import React from 'react';
import { useState } from 'react';
import SearchBar from '../components/SearchBar';

const Home = () => {
    const [searchValue, setSearchValue] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();
        console.log(searchValue);
    }

    return (
        <div className='w-5/6 flex flex-col px-20 py-10 self-center'>
            <SearchBar onSubmit={handleSearch} onChange={(e) => setSearchValue(e.target.value)} value={searchValue} label="Search" placeholder="Search for movies..." />
        </div>
    );
};

export default Home;