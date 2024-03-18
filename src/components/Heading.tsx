import React from 'react';

type Props = {
    children: any,
    variant: string
}

const Heading = ({children, variant}: Props) => {

    const variantToClass = {
        large: 'text-4xl font-black font-fraunces',
        medium: 'text-3xl font-extrabold text-gray-500 font-fraunces'
    }

    return (
        <p className={variantToClass[variant]}>{children}</p>
    );
};

export default Heading;