import React from 'react';
import SearchInput from './SearchInput';

const Hero = () => {
    return (
        <div className="flex flex-col md:flex-row md:h-[calc(100dvh-68px)] md:justify-evenly items-evenly md:items-center mt-10 md:mt-0">
            <div className='flex flex-col gap-6 w-[90vw] md:w-1/3'>
                <h1 className='text-4xl lg:text-5xl 2xl:text-6xl font-black font-fraunces'>The collaborative initiative
                    that puts female characters
                    in perspective</h1>
                <h2 className='text-lg lg:text-xl 2xl:text-2xl font-medium leading-tight'>Find out which films pass or fail
                    the <a className="underline decoration-dotted underline-offset-4 decoration-primary" href="#bechdelTest">Bechdel Test</a> and test movies
                    yourself!</h2>
                <div className='block w-full sm:w-fit bg-primary rounded-full'>
                    <SearchInput />
                </div>
            </div>
            <img className='fadeInUp-animation w-[90vw] md:w-[50vw] xl:w-[40vw] py-10' alt="Sketches of female characters from Thelma and Louise, Portrait of a Lady on Fire, Woman King and The Purple Color" src="hero.webp" />
        </div>
    );
};

export default Hero;