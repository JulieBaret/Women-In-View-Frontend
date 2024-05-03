import React from 'react';

// Components
import Heading from '../components/Heading';

const TermsOfUse = () => {
    return (
        <main className='flex flex-col'>
            <article className='flex flex-col self-center gap-4 text-lg text-justify lg:w-5/6'>
                <Heading variant="large">Terms of use</Heading>
                <p>By using this site, you agree to our terms of use. You acknowledge that you are responsible for any use you make of the site and agree to use the site only for legal purposes and in accordance with these terms.</p>
                <Heading variant="medium">Liability</Heading>
                <p>The information provided on this site is for informational purposes only. While we strive to keep it up to date and accurate, we cannot guarantee its completeness or relevance.</p>
            </article>
        </main>
    );
};

export default TermsOfUse;