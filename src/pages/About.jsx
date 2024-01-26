import React from 'react';
import Heading from '../components/Heading';

export default function About() {
	return (
		<div className='flex flex-col gap-6 self-center'>
			<Heading as="h1" variant="large">About us</Heading>
			<hr className="bg-gray-50 h-1 w-full my-4" />
			<p>
				Women in View is a project about gender bias.
				Our goal is to hightlight the lack of female representation (and well-written female character) in the cinema industry
			</p>
		</div>
	);
}