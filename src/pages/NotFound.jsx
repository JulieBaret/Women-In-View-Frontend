import React from 'react';
import { NavLink } from 'react-router-dom';
import Heading from '../components/Heading';

const NotFound = () => {
    return (
        <main className="flex flex-col h-screen justify-center items-center bg-gray-100">
        <div className="flex flex-col items-center">
            <h1 className="text-[120px] font-extrabold text-secondary font-fraunces">Not Found</h1>
            <p className="text-2xl font-medium text-grey mb-6">Oops! The page you're looking for doesn't exist.</p>
            <a href="/" className="px-4 py-2 font-medium text-white bg-primary rounded-md hover:bg-primary-hovered transition-all duration-200 ease-in-out">
                Go Home
            </a>
        </div>
    </main>
    );
};

export default NotFound;