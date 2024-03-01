import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// icons
import { HiUser, HiViewBoards } from 'react-icons/hi';

const AdminLayout = () => {
    const { user } = useAuth();

    // check if user is logged in or not from server
    // WILL BE: if (user.role_id !== 2) {
    if (!user.id) {
        window.location.href = '/';
    }

    return (
        <div className='flex flex-col md:flex-row'>
            <div className="flex flex-col overflow-none md:w-fit w-screen text-grey border-none z-10 md:h-screen ">
                <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
                    <ul className="flex flex-row md:flex md:flex-col py-4 gap-1">
                        <li>
                            <NavLink to="users" className={({ isActive }) =>
                                `${isActive && "bg-secondary text-light"} flex items-center px-4 gap-4 h-11 focus:outline-none hover:bg-secondary text-gray-600 hover:text-light md:rounded-r-lg border-l-4 border-transparent`}>
                                <HiUser />
                                <span className="truncate">Users</span>
                            </NavLink>
                        </li>
                        <li>
                        <NavLink to="reviews" className={({ isActive }) =>
                                `${isActive && "bg-secondary text-light"} flex items-center px-4 gap-4 h-11 focus:outline-none hover:bg-secondary text-gray-600 hover:text-light md:rounded-r-lg border-l-4 border-transparent`}>
                                <HiViewBoards />
                                <span className="truncate">Reviews</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='w-full'>
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;