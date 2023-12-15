import React from 'react';

export default function About() {
	return (
		<div className='w-5/6 flex flex-col gap-6 p-20 self-center'>
			<h1 className='text-4xl font-extrabold'>About us</h1>
			<hr className="bg-gray-50 h-1 w-full my-4" />
			<p>
				Women in View is a project about gender bias.
				Our goal is to hightlight the lack of female representation (and well-written female character) in the cinema industry
			</p>
		</div>
	);
}