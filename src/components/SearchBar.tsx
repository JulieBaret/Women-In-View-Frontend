import React from 'react';

type Props = {
    onSubmit: () => void,
    onChange: () => void,
    value: string,
    label: string,
    placeholder: string
}

const SearchBar = ({ onSubmit, onChange, value, label, placeholder }: Props) => {
    return (
        <form onSubmit={onSubmit}>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                </div>
                <input type="search" id="default-search" className="block w-56 h-10 px-4 text-sm text-light border border-transparent rounded-full bg-gray-50 bg-opacity-30 focus:ring-primary focus:border-primary placeholder-light" placeholder={placeholder} onChange={onChange} value={value} />
                <button type="submit" className="text-light absolute end-2 bottom-1.5 bg-primary hover:bg-primary-hovered focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-2 py-2"><svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg></button>
            </div>
        </form>
    );
};

export default SearchBar;