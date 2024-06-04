import React from 'react';

type Props= {
    type: string,
    value: string,
    variant: string,
    disabled?: any,
    onClick?: any,
}

const Button = ({type = "submit", value, variant, disabled, onClick}: Props) => {
    const variantToClasses = {
        primary: "bg-primary hover:bg-primary-hovered",
        secondary: "bg-secondary hover:bg-secondary-hovered",
        cancel: "bg-gray-700 hover:bg-gray-800",
        danger: "bg-red-700 hover:bg-red-800"
    }
    return (
        <input type={type} className={`disabled:bg-gray-300 disabled:cursor-default focus:outline-none focus:ring-none cursor-pointer text-white transition ease-in-out ${variantToClasses[variant]} focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5`}
        value={value} disabled={disabled} onClick={onClick}/>
    );
};

export default Button;