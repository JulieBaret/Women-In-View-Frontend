import React from 'react';
import Footer from '../components/Footer';
import Heading from '../components/Heading';
import SearchInput from '../components/SearchInput';


const Home = () => {

    return (
        <div className='flex flex-col items-center'>
            <div className="flex flex-col md:flex-row md:h-[93vh] md:justify-evenly items-evenly md:items-center mt-10 md:mt-0">
                <div className='flex flex-col gap-6 w-[90vw] md:w-1/3'>
                    <h1 className='text-4xl lg:text-5xl 2xl:text-6xl font-black font-fraunces'>The collaborative initiative
                        that puts female characters
                        in perspective</h1>
                    <h2 className='text-lg lg:text-xl 2xl:text-2xl font-medium leading-tight'>Find out which films pass or fail
                        the <a className="underline decoration-dotted underline-offset-4 decoration-primary" href="#bechdelTest">Bechdel Test</a> and test movies
                        yourself!</h2>
                    <div className='block w-fit bg-primary rounded-full'>
                        <SearchInput />
                    </div>
                </div>
                <img className='w-[90vw] md:w-[50vw] xl:w-[40vw] py-10' alt="Sketches of female characters from Thelma and Louise, Portrait of a Lady on Fire, Woman King and The Purple Color" src="hero.png" />
            </div>
            <div className='bg-secondary sticky opacity-50 h-16 flex items-center pb-1 w-full'><p className='text-3xl text-light font-black font-fraunces overflow-hidden whitespace-nowrap'>men in view. women in view. women in view. women in view. women in view. women in view. women in view. women in view. women in view. women in view. women in view. women in view.</p></div>
            <main id="bechdelTest" className='flex flex-col gap-4'>
                <article className='flex flex-col self-center gap-10 text-lg text-justify lg:w-5/6'>
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
                            <img className="w-10 rounded-full" src="https://meme-pas-mal.fr/wp-content/uploads/2016/11/portraits-auteurs_alison.jpg" alt="profile picture" />
                            <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-500">
                                <cite className="pe-3 font-medium leading-tight text-dark">Alison Bechdel</cite>
                                <cite className="px-3 text-sm text-grey">Dykes to Watch Out For, 1985</cite>
                            </div>
                        </figcaption>
                    </figure>
                    <p>Originally conceived as a humorous observation on the portrayal of women in films, the test was then emphasized by Liz Wallace in an essay about women and cinema and has since evolved into a powerful tool for dissecting gender bias in media. Despite its straightforwardness, passing the test remains a significant challenge for many films and TV shows, revealing the persistent tendency to sideline female characters and prioritize male-centric narratives.</p>
                    <div className='flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-0'>
                        <p className='text-left text-2xl md:text-4xl md:font-extrabold font-bold font-fraunces text-secondary'>50% of movies fail the Bechdel Test</p>
                        <img className="w-[50vw]" alt="extract of The Rule comic strip" src="comic.png" />
                    </div>
                    <p>Despite its basic criteria, FiveThirtyEight.com found out in 2014 that <span className="font-black text-primary underline underline-offset-4">half of the films released between 1970 and 2013 did not pass the Bechdel test</span> (out of approximately 2,000 films analyzed).</p>
                    <p>By highlighting the absence of meaningful interactions between female characters and exposing the pervasive gender biases embedded in storytelling, the "Bechdel-Wallace Test" has sparked vital conversations about representation, diversity, and gender equality in the media landscape. Even though it does determines a film's quality or feminist credentials, it serves as a starting point for deeper analysis and discussion about the complexities of gender representation and intersectionality in media.</p>
                    <div className='flex flex-col gap-2'>
                        <h3 className='text-2xl font-bold font-fraunces'>Ressources:</h3>
                        <ol className='flex flex-col gap-1'>
                            <li><a className="underline italic decoration-dotted underline-offset-4 decoration-primary" href="https://s26162.pcdn.co/wp-content/uploads/2021/09/bechdeltestcartoon.jpeg" target="_blank">The Rule</a>, the original comic strip from Alison Bechdel's comic book <span className='italic'>Dykes to Watch Out For</span></li>
                            <li><a className="underline italic decoration-dotted underline-offset-4 decoration-primary" href="https://bechdeltest.com/" target="_blank">Bechdel Test Movie List</a>, a website that maintains a database of thousands of films that have passed or failed the Bechdel Test (and is an inspiration for the <span className='italic'>Women in view</span> initiative)</li>
                            <li><a className="underline italic decoration-dotted underline-offset-4 decoration-primary" href="https://www.vox.com/2014/7/1/5860562/half-of-2014s-movies-fail-this-basic-test-of-sexism" target="_blank">Half of 2014's movies fail this basic test of sexism</a>, an article from <span className='italic'>Vox</span></li>
                            <li><a className="underline italic decoration-dotted underline-offset-4 decoration-primary" href="https://www.thenews.com.pk/magazine/instep-today/96432-What-is-the-Bechdel-Test-Many-movies-have-failed-it-and-for-a-good-reason" target="_blank">What is the Bechdel Test? Many movies have failed it, and for a good reason</a>, an article from <span className='italic'>The News</span></li>
                        </ol>
                    </div>
                </article>
            </main>
            <Footer />
        </div>
    );
};

export default Home;