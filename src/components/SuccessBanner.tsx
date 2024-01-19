import React from 'react';

type Props = {
    isSuccess: boolean,
    success: string
}

const SuccessBanner = ({ isSuccess, success }: Props) => {
    return (
        <>
        {isSuccess && <p className='text-green-700 bg-green-100 w-fit px-2 py-1 rounded'>{success}</p>}
        </>
    );
};

export default SuccessBanner;