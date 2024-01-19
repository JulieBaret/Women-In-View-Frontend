import React from 'react';

type Props = {
    id: string,
    type: string,
    label?: string,
    value: string,
    onChange?: () => void,
    placeholder?: string
}

const Input = ({ id, type, label, value, onChange, placeholder }: Props) => {
    return (
        <div className="flex flex-col gap-2">
            {label &&
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold">
                    {label}
                </label>}
            <input id={id} className="appearance-none block w-full bg-light text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:ring-primary focus:border-primary" type={type} value={value} name={id} placeholder={placeholder} onChange={onChange} />
        </div>
    );
};

export default Input;