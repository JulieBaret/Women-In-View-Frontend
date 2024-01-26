import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import fetchApi from '../fetchApi';
import { useAuth } from '../contexts/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import Heading from '../components/Heading';
import ErrorBanner from '../components/ErrorBanner';
import FullScreenLoading from '../components/FullScreenLoading';

export default function Login() {
	const { setUser, setToken, csrfToken } = useAuth();
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	// login user
	const handleSubmit = async (e) => {
		e.preventDefault();
		const { email, password } = e.target.elements;
		const body = {
			email: email.value,
			password: password.value,
		};
		setIsLoading(true);
		await csrfToken();
		try {
			const resp = await fetchApi.post('/login', body);
			if (resp.status === 200) {
				setUser(resp.data.user);
				setToken(resp.data.token);
				return <Navigate to="/profile" />;
			}
		} catch (error) {
			if (error.response.status === 401) {
				setError(error.response.data.message);
			}
		}
		setIsLoading(false);
	};

	return (
		<section>
			{isLoading && <FullScreenLoading label='Login'/>}
		
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<div className="bg-white w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<div className='flex justify-center items-center'>
							<img className='h-16' src='/icon.png' />
						</div>
						<Heading as='h1' variant='medium'>Sign in to your account</Heading>
						<form
							className="space-y-4 md:space-y-6 flex flex-col"
							onSubmit={handleSubmit}>
							<Input id="email" label="Your email" type="email" placeholder="name@mail.com" required />
							<div className='flex flex-col gap-1'>
								<Input id="password" label="Your password" type="password" placeholder="••••••••" required />
								<Link
									to="/forgot-password"
									className="text-sm text-gray-500 hover:underline">
									Forgot password?
								</Link>
							</div>
							{error && <ErrorBanner isError={true} error={error}/>}
							<Button variant="primary" value="Sign in" disabled={isLoading} />
							<p className="text-sm font-light text-gray-500">
								Don't have an account yet?{' '}
								<Link
									to="/register"
									className="font-medium text-primary hover:underline">
									Sign up
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}