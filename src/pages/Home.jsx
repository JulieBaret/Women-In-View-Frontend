import React from 'react';

// Components
import Banner from '../components/Banner';
import Heading from '../components/Heading';
import Hero from '../components/Hero';


const Home = () => {

    return (
        <div className='flex flex-col items-center'>
            <Hero />
            <Banner />
            <main className='flex flex-col gap-4'>
                <article className='flex flex-col self-center gap-10 text-lg sm:text-xl text-justify lg:w-5/6 mb-10'>
                    <Heading variant="large">What is the Bechdel Test?</Heading>
                    <Heading variant="medium">It all started with a joke...</Heading>
                    <p>A joke written by the American and openly gay cartoonist Alison Bechdel in her chronicle (later published as a comic book) <span className='italic'>Dykes to Watch Out For</span>. The American cartoonist, who has been sketching the daily lives of a fictional group of lesbian friends since the 1980s, imagines a conversation between two women. They wonder which movie to go see at the cinema when one of them explains: </p>
                    <figure className="max-w-screen-md mx-auto p-10 text-center">
                        <svg className="w-10 h-10 mx-auto mb-3 text-grey " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                        </svg>
                        <blockquote>
                            <p className='text-2xl md:text-4xl md:font-extrabold font-bold font-fraunces'><span className='italic'>I only go to a movie if it satisfies <span className='underline'>three basic requirements</span>. One, it has to have at least two women in it who, two, talk to each other about, three, something besides a man.</span></p>
                        </blockquote>
                        <figcaption className="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse md:px-0">
                            <img className="fadeInUp-animation w-10 rounded-full" src="https://meme-pas-mal.fr/wp-content/uploads/2016/11/portraits-auteurs_alison.jpg" alt="profile picture" />
                            <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-500">
                                <cite className="pe-3 font-medium leading-tight text-dark">Alison Bechdel</cite>
                                <cite className="px-3 text-sm text-grey">Dykes to Watch Out For, 1985</cite>
                            </div>
                        </figcaption>
                    </figure>
                    <div className='flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-0'>
                        <p className='text-left text-2xl md:text-4xl md:font-extrabold font-bold font-fraunces text-secondary leading-tight'>50% of movies fail the Bechdel Test</p>
                        <img className="w-full sm:w-[50vw]" alt="extract of The Rule comic strip" src="comic.webp" />
                    </div>
                    <p>Inspired by Alison Bechdel's friend Liz Wallace, the Bechdel Test – also known as Wallace-Bechdel Test – has evolved from a comic strip to a powerful tool for dissecting gender bias in media. In 2014, the media <a className="external-link" href="https://fivethirtyeight.com/features/the-dollar-and-cents-case-against-hollywoods-exclusion-of-women/">FiveThirtyEigh</a> analyzed approximately 2,000 films released between 1970 and 2013 and found out that <span className="font-black text-primary underline underline-offset-4">half of the movies did not pass the Bechdel Test</span> despite of its basic criteria.</p>
                    <p>Nowadays, passing the Bechdel Test remains a significant challenge for many films and TV shows, revealing the persistent tendency to sideline female characters and prioritize male-centric narratives. By highlighting the absence of meaningful interactions between female characters and exposing the pervasive gender biases embedded in storytelling, it has since sparked vital conversations about representation, diversity, and gender equality in the media landscape.</p>
                    <p>Even though it does determines a film's quality or feminist credentials, it serves as a starting point for deeper analysis and discussion about the complexities of gender representation and intersectionality in media.</p>
                    <div className='flex flex-col gap-2 text-left'>
                        <h3 className='text-2xl font-bold font-fraunces'>Ressources:</h3>
                        <ol className='flex flex-col gap-1'>
                            <li><a className="external-link" href="https://s26162.pcdn.co/wp-content/uploads/2021/09/bechdeltestcartoon.jpeg" target="_blank">The Rule</a>, the original comic strip from Alison Bechdel's comic book <span className='italic'>Dykes to Watch Out For</span></li>
                            <li><a className="external-link" href="https://bechdeltest.com/" target="_blank">Bechdel Test Movie List</a>, a website that maintains a database of thousands of films that have passed or failed the Bechdel Test (and is an inspiration for the <span className='italic'>Women in view</span> initiative)</li>
                            <li><a className="external-link" href="https://fivethirtyeight.com/features/the-dollar-and-cents-case-against-hollywoods-exclusion-of-women/" target="_blank">The Dollar-And-Cents Case Against Hollywood’s Exclusion of Women</a>, the 2014 study led by <span className='italic'>Five Thirty Eight</span></li>
                            <li><a className="external-link" href="https://www.vox.com/2014/7/1/5860562/half-of-2014s-movies-fail-this-basic-test-of-sexism" target="_blank">Half of 2014's movies fail this basic test of sexism</a>, an article from <span className='italic'>Vox</span></li>
                            <li><a className="external-link" href="https://www.thenews.com.pk/magazine/instep-today/96432-What-is-the-Bechdel-Test-Many-movies-have-failed-it-and-for-a-good-reason" target="_blank">What is the Bechdel Test? Many movies have failed it, and for a good reason</a>, an article from <span className='italic'>The News</span></li>
                        </ol>
                    </div>
                </article>
            </main>
        </div>
    );
};

export default Home;