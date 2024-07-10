import React from 'react';
import { useParams } from 'react-router-dom';

// Components
import Heading from '../../components/Heading';
import SearchResults from './SearchResults';

const Search = () => {
    const params = useParams();
    const { query } = params;
    const decodedQuery = decodeURI(query || '');
    return (
        <main className="flex flex-col justify-start gap-10">
            <Heading variant='large'>Results for «{decodedQuery}»:</Heading>
            <SearchResults query={decodedQuery} />
        </main>
    );
};

export default Search;