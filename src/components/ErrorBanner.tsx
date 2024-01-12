import React from 'react';

type Props = {
    isError: boolean,
    error: string
}

const ErrorBanner = ({ isError, error }: Props) => {
    return (
        <>
        {isError && <p className='text-red-700 bg-red-100 w-fit px-2 py-1 rounded'>{error}</p>}
        </>
    );
};

export default ErrorBanner;