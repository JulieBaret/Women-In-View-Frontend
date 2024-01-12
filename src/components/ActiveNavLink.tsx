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
                    ? 'block py-2 pl-3 pr-4 text-white underline underline-offset-8'
                    : 'block py-2 pl-3 pr-4 hover:underline underline-offset-8'
            }>
            {label}
        </NavLink>
    );
};

export default ActiveNavLink;