
import { CustomFlowbiteTheme } from 'flowbite-react';

export const truncate = (str: string, lastIndex: number) => {
    return str.length > lastIndex ? str.substring(0, lastIndex-3) + "..." : str;
}

export const paginationCustomTheme: CustomFlowbiteTheme['pagination'] = {
    pages: {
        previous: {
            base: "ml-0 rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 inline-flex",
        },
        next: {
            base: "rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 inline-flex",
        },
        selector: {
            base: "w-12 border border-gray-300 bg-white py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100",
            active: "bg-primary",
        },
    },

};