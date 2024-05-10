import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-secondary w-full shadow px-6 md:px-20 flex flex-col items-center">
            <div className="w-full lg:w-5/6 py-12">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <NavLink to="/home" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <img src="/clap_logo.webp" className="h-8" alt="Women in view logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap font-fraunces text-light">Women in view</span>
                    </NavLink>
                    <ul className="flex flex-wrap items-center mb-6 font-medium text-light sm:mb-0">
                        <li>
                            <NavLink to="/about" className="hover:underline me-4 md:me-6">About</NavLink>
                        </li>
                        <li>
                            <NavLink to="/legal" className="hover:underline me-4 md:me-6">Privacy Policy</NavLink>
                        </li>
                        <li>
                            <NavLink to="/terms" className="hover:underline me-4 md:me-6">Terms of Use</NavLink>
                        </li>
                        <li>
                            <a href="mailto:womeninview@proton.me" className="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-autolg:my-8" />
                <p className="block sm:text-center text-light">© {currentYear} <NavLink to="/home">WIV</NavLink>. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
