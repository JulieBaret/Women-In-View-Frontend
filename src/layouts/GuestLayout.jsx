import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function GuestLayout() {
	const { user } = useAuth();

	// if user is logged in, redirect to profile page
	if (user) {
		return <Navigate to="/home" />;
	}
	return (
		<div className='guest-container'>
            <div className="flex flex-col items-center justify-center px-6 py-8 lg:py-0">
				<Outlet />
			</div>
		</div>
	);
}