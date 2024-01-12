import React from 'react';

type Props = {
    id: string,
    type: string,
    hasLabel: boolean,
    label?: string,
    value: string,
    onChange?: () => void,
    placeholder?: string
}

const Input = ({ id, type, hasLabel, label, value, onChange, placeholder }: Props) => {
    return (
        <div className="flex flex-col gap-2">
            {hasLabel &&
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold">
                    {label}
                </label>}
            <input id={id} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type={type} value={value} placeholder={placeholder}onChange={onChange} />
        </div>
    );
};

export default Input;