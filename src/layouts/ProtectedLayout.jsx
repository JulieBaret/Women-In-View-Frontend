import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import Loading from '../components/Loading';
import ActiveNavLink from '../components/ActiveNavLink';

export default function DefaultLayout() {
	const { user, token } = useAuth();
	const [isLoading, setIsLoading] = useState(false);

	// if user is not logged in, redirect to login page
	if (!user) {
		return <Navigate to="/" />;
	}

	// logout user
	const handleLogout = async () => {
		setIsLoading(true);
		try {
			const resp = await Axios.create({
				baseURL: "http://localhost:80/api/",
				withCredentials: true,
				headers: {
					"Authorization": `Bearer ${token}`
				},
			}).post('/logout');
			if (resp.status === 200) {
				localStorage.removeItem('user');
				localStorage.removeItem('token');
				window.location.href = '/';
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<nav className="bg-gradient-to-r from-primary to-secondary py-2">
				<div className="container flex flex-wrap items-center justify-between mx-auto">
					<img
						// TODO : add logo
						src=""
						className="h-6 mr-3"
						alt=""
					/>
					<NavLink
						to="/home"
						className="self-center text-xl font-semibold whitespace-nowrap text-white">
						Women in View
					</NavLink>
					<div>
						<ul className="flex flex-row p-4 gap-4 text-gray-400">
							<li>
								<ActiveNavLink label="About" location="/about" />
							</li>
							<li>
								<ActiveNavLink label="Profile" location="/profile" />
							</li>
							<li>
								<div className="flex w-[110px]">
									<button
										onClick={handleLogout}
										className="block py-2 pl-3 pr-4 hover:underline underline-offset-8">
										Logout
									</button>
									{isLoading && <Loading />}
								</div>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			<main className="container flex justify-center flex-col items-center mt-6">
				<Outlet />
			</main>
		</>
	);
}