// React
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

// Components
import { useAuth } from '../contexts/AuthContext';
import ActiveNavLink from '../components/ActiveNavLink';
import FullScreenLoading from '../components/FullScreenLoading';

// Icons
import { HiCog, HiLogout, HiFilm, HiTemplate } from 'react-icons/hi';

// External components
import { Dropdown } from 'flowbite-react';
import toast, { Toaster } from 'react-hot-toast';
import SearchInput from '../components/SearchInput';

export default function ProtectedLayout() {
	const { user, setUser, token } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	// if user is not logged in, redirect to login page
	useEffect(() => {
		if (!user || !token) {
		window.location.href = '/';
	}}, [user, token]);

	// check if user is logged in or not from server
	useEffect(() => {
		const options = {
			method: 'GET',
			withCredential: true,
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: 'Bearer ' + token
			}
		};
		fetch(import.meta.env.VITE_API_URL + 'users/' + user.id, options)
			.then(response => response.json())
			.then((data) => {
				setUser(data.data);
			})
			.catch((error) => {
				console.error(error);
				localStorage.removeItem('user');
				localStorage.removeItem('token');
				window.location.href = '/';
			})
	}, []);

	// logout user
	const handleLogout = async () => {
		setIsLoading(true);
		try {
			const response = await fetch(import.meta.env.VITE_API_URL + 'logout', {
				method: 'POST',
				withCredentials: true,
				headers: {
					Accept: 'application/json',
					Authorization: 'Bearer ' + token
				}
			});

			if (!response.ok) {
				throw new Error(`Error! status: ${response.status}`);
			}

			if (response.status === 200) {
				localStorage.removeItem('user');
				localStorage.removeItem('token');
				window.location.href = '/';
			}
		} catch (err) {
			toast('Error while signing out: ' + error);
			setIsLoading(false);
		}
	};

	const handleOpenMenu = () => {
		setIsMenuOpen((prev) => !prev);
	}

	// do not render UI if unlogged
	if (!user || !token) return null;

	return (
		<>
			{isLoading && <FullScreenLoading label="We hope to see you soon!" />}
			<nav className="bg-gradient-to-r from-primary to-secondary py-2.5 px-4 z-20 sticky top-0 w-full shadow-sm font-semibold min-w-[370px]">
				<Toaster />
				<div className="flex flex-wrap items-center justify-between">
					<NavLink className='flex gap-2' to="/home">
						<img src="/clap_logo.webp" className="h-12 pb-1" alt="Women in view logo" />
						<span className='self-center text-3xl font-bold text-light whitespace-nowrap hidden sm:block font-fraunces pb-2'>women in view.</span>
					</NavLink>
					<div className="flex lg:gap-10">
						<button
							aria-label={isMenuOpen ? "closeMenu" : "openMenu"}
							className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-300 rounded-lg lg:hidden hover:text-light order-last"
							onClick={handleOpenMenu}>
							{isMenuOpen ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
							</svg>
								: <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
									<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
								</svg>}
						</button>
						<div className="hidden w-full lg:block lg:w-auto">
							<ul className="flex flex-col lg:flex-row text-center text-gray-300 lg:mb-0 mb-4">
								<li>
									<ActiveNavLink label="home" location="/home" />
								</li>
								<li>
									<ActiveNavLink label="tested movies" location="/tested-movies" />
								</li>
							</ul>
						</div>
						<div className='px-2'>
							<SearchInput />
						</div>
						<div className='flex gap-2 items-center'>
							{/* Dropdown profile menu */}
							<Dropdown
								aria-label="dropdown menu to access profile related features"
								arrowIcon={false}
								inline
								label={
									<div className='flex gap-2 items-center' onClick={() => setIsMenuOpen((false))}>
										<span className='text-white hidden w-full lg:block lg:w-auto font-fraunces font-regular'>Hi, {user.name}!</span>
										<img alt="avatar" src="/avatar.webp" className='h-10 hover:opacity-80 transition ease-in-out' />
									</div>
								}
							>
								<Dropdown.Header>
									<span className="block text-sm">{user.name}</span>
									<span className="block truncate text-sm font-medium">{user.email}</span>
								</Dropdown.Header>
								<Dropdown.Item icon={HiFilm}><NavLink to={`/user/contributions/${user.id}`}>My contributions</NavLink></Dropdown.Item>
								<Dropdown.Item icon={HiCog}><NavLink to={`/user/profile/${user.id}`}>Profile settings</NavLink></Dropdown.Item>
								{user.role_id === 1 && <Dropdown.Item icon={HiTemplate}><NavLink to={`/admin/users`}>Admin page</NavLink></Dropdown.Item>}
								<Dropdown.Divider />
								<Dropdown.Item icon={HiLogout} onClick={handleLogout}>Sign out</Dropdown.Item>
							</Dropdown>
						</div>
					</div>
				</div>
				{isMenuOpen && <div className="h-auto lg:hidden flex flex-col text-center text-gray-300 mt-2">
					<ul onClick={handleOpenMenu}>
						<li>
							<ActiveNavLink label="home" location="/home" />
						</li>

						<li>
							<ActiveNavLink label="tested movies" location="/tested-movies?page=1" />
						</li>
					</ul>
				</div>}
			</nav>
			<>
				<Outlet />
			</>
		</>
	);
}