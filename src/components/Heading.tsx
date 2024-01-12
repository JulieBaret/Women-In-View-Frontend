import React from 'react';

type Props = {
    children: any,
    variant: string
}

const Heading = ({children, variant}: Props) => {

    const variantToClass = {
        large: 'text-4xl font-extrabold',
        medium: 'text-3xl font-bold text-gray-500'
    }

    return (
        <p className={variantToClass[variant]}>{children}</p>
    );
};

export default Heading;