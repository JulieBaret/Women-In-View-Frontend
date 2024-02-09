import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import ActiveNavLink from '../components/ActiveNavLink';
import { Avatar, Dropdown } from 'flowbite-react';
import FullScreenLoading from '../components/FullScreenLoading';

export default function DefaultLayout() {
	const { user, token } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleOpenMenu = () => {
		setIsMenuOpen((prev) => !prev);
	}

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
			{isLoading && <FullScreenLoading label="We hope to see you soon!" />}
			<nav className="bg-gradient-to-r from-primary to-secondary py-2.5 px-4">
				<div className="flex flex-wrap items-center justify-between">
					<div className='flex gap-2'>
						<img src="/icon.png" className="h-9" alt="Women in view logo" />

						<NavLink
							to="/home"
							className="self-center text-xl font-semibold whitespace-nowrap text-white">
							<span className='text-3xl font-bold text-light'>Women in View</span>
						</NavLink>
					</div>
					<div className="flex md:gap-10">
						<button type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-300 rounded-lg md:hidden hover:text-light focus:outline-none order-last" onClick={handleOpenMenu}>
							{isMenuOpen ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
							</svg>
								: <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
									<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
								</svg>}
						</button>
						<div className="hidden w-full md:block md:w-auto">
							<ul className="flex flex-col md:flex-row text-center text-gray-300 md:mb-0 mb-4">
								<li>
									<ActiveNavLink label="Movies" location="/home" />
								</li>
								<li>
									<ActiveNavLink label="Reviews" location="/reviews" />
								</li>
								<li>
									<ActiveNavLink label="The Bechdel Test" location="/about" />
								</li>
								{/* <li>
								<div className="flex w-[110px]">
									<button
										onClick={handleLogout}
										className="block py-2 pl-3 pr-4 hover:underline underline-offset-8">
										Logout
									</button>
									{isLoading && <Loading />}
								</div>
							</li> */}
							</ul>
						</div>
						<div className='flex gap-2 items-center'>
							<Dropdown
								arrowIcon={false}
								inline
								label={
									<div className='flex gap-2 items-center' onClick={() => setIsMenuOpen((false))}>
										<span className='font-bold text-white hidden w-full lg:block lg:w-auto'>Hi, {user.name}!</span>
										<Avatar alt="User settings" img="/profile.png" rounded />
									</div>
								}
								color="light"
							>
								<Dropdown.Header>
									<span className="block text-sm">{user.name}</span>
									<span className="block truncate text-sm font-medium">{user.email}</span>
								</Dropdown.Header>
								<Dropdown.Item>
									<NavLink to="/profile">
										<div className="flex gap-1 items-center">
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
												<path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
												<path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
											</svg>
											<span>Edit my profile</span>
										</div></NavLink>
								</Dropdown.Item>
								<Dropdown.Divider />
								<Dropdown.Item>
									<div className='flex gap-1'
											onClick={handleLogout}>
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
											<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
										</svg>
										<span>Logout</span>
									</div>
								</Dropdown.Item>
							</Dropdown>
						</div>
					</div>
				</div>
				{isMenuOpen && <div className="h-auto md:hidden">
					<ul className="flex flex-col text-center text-gray-300 gap-2" onClick={handleOpenMenu}>
						<li>
							<ActiveNavLink label="Movies" location="/home" />
						</li>
						<li>
							<ActiveNavLink label="Reviews" location="/reviews" />
						</li>
						<li>
							<ActiveNavLink label="The Bechdel Test" location="/about" />
						</li>
						{/* <li>
								<div className="flex w-[110px]">
									<button
										onClick={handleLogout}
										className="block py-2 pl-3 pr-4 hover:underline underline-offset-8">
										Logout
									</button>
									{isLoading && <Loading />}
								</div>
							</li> */}
					</ul>
				</div>}
			</nav>
			<main className="flex justify-center flex-col items-center mt-6">
				<Outlet />
			</main>
		</>
	);
}