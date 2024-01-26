import React from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
    label: string,
    location: string
}

const ActiveNavLink = ({ label, location }: Props) => {
    return (
        <NavLink
            to={location}
            className={({ isActive }) =>
                isActive
                    ? 'block py-2 px-4 text-white border-b-2'
                    : 'block py-2 px-4 border-b-2 border-transparent hover:border-b-2 hover:text-white transition ease-in-out'
            }>
            {label}
        </NavLink>
    );
};

export default ActiveNavLink;