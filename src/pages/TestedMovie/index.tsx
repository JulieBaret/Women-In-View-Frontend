import React from 'react';

// Components
import Heading from '../../components/Heading';
import TestedMovieResults from './TestedMovieResults';

const index = () => {
    return (
        <main className="flex flex-col justify-center gap-10">
            <Heading variant='large'>Tested movies:</Heading>
            <TestedMovieResults />
        </main>
    );
};

export default index;