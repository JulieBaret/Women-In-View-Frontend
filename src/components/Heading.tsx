import React from 'react';

type Props = {
    children: any,
    variant: "medium" | "large"
}

const Heading = ({ children, variant }: Props) => {

    const variantToClass = {
        large: 'text-4xl font-black font-fraunces text-left',
        medium: 'text-3xl font-extrabold text-gray-500 font-fraunces text-left'
    }

    if (variant === "medium") {
        return <h2 className={variantToClass[variant]}>{children}</h2>
    } else {
        return <h1 className={variantToClass[variant]}>{children}</h1>
    };
};

export default Heading;