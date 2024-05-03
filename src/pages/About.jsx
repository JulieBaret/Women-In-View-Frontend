import React from 'react';
import Heading from '../components/Heading';

export default function About() {
	return (
		<main className='flex flex-col'>
			<article className='flex flex-col self-center gap-4 text-lg text-justify lg:w-5/6'>
				<Heading variant="large">About us</Heading>
				<p><span className='italic'>Women in View</span> is a school project made by Marielle Koffi and Julie Baret, software developers.</p>
				<p>We are both students at Ada Tech School, a training institution we joined within the Chimamanda Ngozie Adichie promotion, in 2022.</p>
				<Heading variant="medium">A project about gender bias</Heading>
				<p>Our goal is to hightlight the lack of female representation (and well-written female character) in the cinema industry.</p>
				<p>Our project is based on the inspirational idea of our friend, Iris Rossiquet, video editor in Paris.</p>
			</article>
		</main>
	);
}