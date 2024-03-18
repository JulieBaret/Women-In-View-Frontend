import React from 'react';
import Heading from '../components/Heading';
import SearchInput from '../components/SearchInput';


const Home = () => {

    return (
        <div className='flex flex-col items-center'>
            <div className="flex flex-col md:flex-row md:h-[93vh] md:justify-evenly items-evenly md:items-center mt-10 md:mt-0">
                <div className='flex flex-col gap-6 w-[90vw] md:w-1/3'>
                    <p className='text-4xl lg:text-5xl xl:text-6xl font-black font-fraunces'>The collaborative initiative
                        that puts female characters
                        in perspective</p>
                    <p className='text-lg lg:text-xl xl:text-2xl font-medium leading-tight'>Find out which films pass or fail
                        the <a className="underline decoration-dotted underline-offset-4 decoration-primary" href="#bechdelTest">Bechdel Test</a> and test movies
                        yourself!</p>
                    <div className='block w-fit bg-primary rounded-full'>
                        <SearchInput />
                    </div>
                </div>
                <img className='w-[90vw] md:w-[50vw] py-10' alt="Alison Bechdel cartoon" src="hero.png" />
            </div>
            <div className='bg-secondary sticky opacity-50 h-16 flex items-center pb-1 w-full'><p className='text-3xl text-light font-black font-fraunces overflow-hidden whitespace-nowrap'>men in view. women in view. women in view. women in view. women in view. women in view. women in view. women in view. women in view. women in view. women in view. women in view.</p></div>
            <main id="bechdelTest" className='flex flex-col gap-4'>
                <article className='flex flex-col self-center gap-10 text-lg text-justify lg:w-5/6'>
                    <Heading variant="large">What is the Bechdel Test?</Heading>
                    <Heading variant="medium">It all started with a joke...</Heading>
                    <p>A joke written by the American and openly gay cartoonist Alison Bechdel, in her comic book named "Dykes to Watch Out for", before it was emphasized by Liz Wallace in an essay about women and cinema.</p>
                    <figure className="max-w-screen-md mx-auto p-10 text-center">
                        <svg className="w-10 h-10 mx-auto mb-3 text-grey " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                        </svg>
                        <blockquote>
                            <p className='text-2xl md:text-4xl md:font-extrabold font-bold font-fraunces'><span className='italic'>I only go to a movie if it satisfies <span className='underline'>three basic requirements</span>. One, it has to have at least two women in it who, two, talk to each other about, three, something besides a man.</span></p>
                        </blockquote>
                        <figcaption className="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse md:px-0">
                            <img className="w-10 rounded-full" src="https://meme-pas-mal.fr/wp-content/uploads/2016/11/portraits-auteurs_alison.jpg" alt="profile picture" />
                            <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-500">
                                <cite className="pe-3 font-medium leading-tight text-dark">Alison Bechdel</cite>
                                <cite className="px-3 text-sm text-grey">Conversation between fictional characters in "Dykes to Watch Out For"</cite>
                            </div>
                        </figcaption>
                    </figure>
                    <p>Originally conceived as a humorous observation on the portrayal of women in films, the "Bechdel-Wallace Test" (often called the "Bechdel Test") has since evolved into a powerful tool for dissecting gender bias in media. Despite its straightforwardness, passing the test remains a significant challenge for many films and TV shows, revealing the persistent tendency to sideline female characters and prioritize male-centric narratives.</p>
                    <figure className='py-2'>
                        <img className='lg:px-20 px-4' alt="The Rules strip from Dykes to Watch Out For" src="https://dykestowatchoutfor.com/wp-content/uploads/2014/05/The-Rule-cleaned-up.jpg" />
                        <figcaption className="flex items-center justify-center space-x-3 rtl:space-x-reverse"><cite className='text-xs text-grey'>"The Rules" strip from "Dykes to Watch Out for" published in 1985</cite></figcaption>
                    </figure>
                    <p>By highlighting the absence of meaningful interactions between female characters and exposing the pervasive gender biases embedded in storytelling, the Bechdel-Wallace Test has sparked vital conversations about representation, diversity, and gender equality in the media landscape. Even though it does determines a film's quality or feminist credentials, it serves as a starting point for deeper analysis and discussion about the complexities of gender representation and intersectionality in media.</p>
                </article>
            </main>
        </div>
    );
};

export default Home;