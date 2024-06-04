import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function GuestLayout() {
	const { user, token } = useAuth();

	// if user is logged in, redirect to home page
	if (user && token) {
		return <Navigate to="/" />;
	}
	
	return (
		<div className='guest-container'>         
			<Outlet />
		</div>
	);
}