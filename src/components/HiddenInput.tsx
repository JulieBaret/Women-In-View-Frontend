import React from 'react';
import EyeIcon from './icons/EyeIcon';

type Props = {
    id: string,
    type: string,
    label?: string,
    value: string,
    onChange?: () => void,
    placeholder?: string
    isVisible?: boolean,
    onChangeVisibility?: () => void
}

const HiddenInput = ({ id, type, label, value, onChange, placeholder, isVisible, onChangeVisibility }: Props) => {
    return (
        <div className="flex flex-col gap-2">
            {label &&
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold">
                    {label}
                </label>}
            <div className="flex items-center justify-content gap-2">
                <input onChange={onChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type={type} value={value} placeholder={placeholder} />
                <input type="checkbox" onChange={onChangeVisibility} className="hidden" id={id} />
                <label htmlFor={id}><EyeIcon isVisible={isVisible} strokeColor="gray" /></label>
            </div>
        </div>
    );
};

export default HiddenInput;