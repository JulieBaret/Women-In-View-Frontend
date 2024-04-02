import React from 'react';
import Heading from './Heading';

type Props={
    label: string;
}

const FullScreenLoading = ({label}: Props) => {
    return (
        <div className="fixed h-screen w-screen bg-white z-30 flex justify-center items-center">
            <div className="flex flex-col items-center">
                <div className="loadingio-spinner-wedges-nq4q5u6dq7r"><div className="ldio-x2uulkbinbj">
                    <div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div>
                </div></div>
                <Heading variant="medium">{label}</Heading>
            </div>
        </div>
    );
};

export default FullScreenLoading;