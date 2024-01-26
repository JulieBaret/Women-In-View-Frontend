import React from 'react';
import Heading from './Heading';

type Props={
    label: string;
}

const FullScreenLoading = ({label}: Props) => {
    return (
        <div className="fixed h-screen w-screen bg-black bg-opacity-80 z-20 flex justify-center items-center">
            <div className="flex text-gray-400">

                <svg fill='none' className="w-10 h-10 animate-spin" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                    <path clipRule='evenodd'
                        d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                        fill='currentColor' fillRule='evenodd' />
                </svg>
                <Heading variant="medium">{label}</Heading>
            </div>
        </div>
    );
};

export default FullScreenLoading;