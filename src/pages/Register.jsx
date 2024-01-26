import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import fetchApi from '../fetchApi';
import { useAuth } from '../contexts/AuthContext';
import Input from '../components/Input';
import HiddenInput from '../components/HiddenInput';
import Button from '../components/Button';
import ErrorBanner from '../components/ErrorBanner';
import Heading from '../components/Heading';

export default function Register() {
	const { setUser, setToken } = useAuth();
	const [error, setError] = useState("");
	const [isPasswordVisible, setIsPasswordVisible] = useState('');

	// register user
	const handleSubmit = async (e) => {
		e.preventDefault();
		const { name, email, password, cpassword } = e.target.elements;
		const body = {
			name: name.value,
			email: email.value,
			password: password.value,
			// password_confirmation: cpassword.value,
		};
		try {
			const resp = await fetchApi.post('/register', body);
			if (resp.status === 200) {
				setUser(resp.data.user);
				setToken(resp.data.token);
				return <Navigate to="/profile" />;
			}
		} catch (error) {
			setError("Please fill all the fields");
		}
	};

	return (
		<section>
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<div className='flex justify-center items-center'>
							<img className='h-16' src='/icon.png' />
						</div>
						<Heading as='h1' variant='medium'>Create an account</Heading>	
						<form
							className="space-y-4 md:space-y-6 flex flex-col"
							onSubmit={handleSubmit}
							>
							<Input id="name" label="username" placeholder="KickA$$" required/>
							<Input id="email" label="Email" type="email" placeholder="name@mail.com" required/>
							<HiddenInput id="password" label="Password" placeholder="********" type={`${isPasswordVisible ? 'text' : 'password'}`} isVisible={isPasswordVisible} onChangeVisibility={(e) => setIsPasswordVisible(e.target.checked)}/>
							<Button variant="primary" value="Create an account"/>
							{error && <ErrorBanner isError={true} error={error}/>}
							<p className="text-sm font-light text-dark">
								Already have an account?{' '}
								<Link
									to="/"
									className="font-medium text-primary hover:underline">
									Login here
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}