import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

// Components
import Heading from '../../components/Heading';
import TestedMovieResults from './TestedMovieResults';

const index = () => {
    return (
        <main className="flex flex-col justify-center gap-10">
            <div>
                <Heading variant='large'>Tested movies:</Heading>
                <p className="text-lg text-gray-400">According to <Link className="external-link" to="/#bechdelTest">Bechdel Test criteria</Link></p>
            </div>
            <TestedMovieResults />
        </main>
    );
};

export default index;