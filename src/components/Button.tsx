import React from 'react';

type Props= {
    type: string,
    value: string,
    variant: string,
    disabled?: any,
    onClick: any,
}

const Button = ({type = "submit", value, variant, disabled, onClick}: Props) => {
    const variantToClasses = {
        primary: "bg-primary hover:bg-secondary",
        secondary: "bg-purple-700 hover:bg-purple-800 focus:ring-purple-300",
        cancel: "bg-gray-700 hover:bg-gray-800 focus:ring-gray-300",
        danger: "bg-red-700 hover:bg-red-800 focus:ring-red-300"
    }
    return (
        <input type={type} className={`disabled:opacity-50 focus:outline-none cursor-pointer text-white transition ease-in-out ${variantToClasses[variant]} focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mb-2`}
        value={value} disabled={disabled} onClick={onClick}/>
    );
};

export default Button;