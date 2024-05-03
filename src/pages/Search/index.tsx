import React from 'react';
import { useParams } from 'react-router-dom';

// Components
import Heading from '../../components/Heading';
import SearchResults from './SearchResults';

const Search = () => {
    const params = useParams();
    const { query } = params;
    return (
        <main className="flex justify-center flex-col">
            <Heading variant='large'>Results for «{query}»:</Heading>
            <div className="flex flex-col items-center mt-8">
                <SearchResults query={query} />
            </div>
        </main>
    );
};

export default Search;