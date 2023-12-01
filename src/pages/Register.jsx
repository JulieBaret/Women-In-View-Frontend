import React from 'react';
import { Link } from 'react-router-dom';
import fetchApi from '../fetchApi';
import { useAuth } from '../contexts/AuthContext';

export default function Register() {
	const { setUser, setToken } = useAuth();
	const [nameError, setNameError] = React.useState('');
	const [emailError, setEmailError] = React.useState('');
	const [passwordError, setPasswordError] = React.useState('');
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
			if (error.response.status === 422) {
				console.log(error.response.data.errors);
				if (error.response.data.errors.name) {
					setNameError(error.response.data.errors.name[0]);
				} else {
					setNameError('');
				}
				if (error.response.data.errors.email) {
					setEmailError(error.response.data.errors.email[0]);
				} else {
					setEmailError('');
				}
				if (error.response.data.errors.password) {
					setPasswordError(error.response.data.errors.password[0]);
				} else {
					setPasswordError('');
				}
			}
		}
	};

	return (
		<section className="bg-gradient-to-r from-primary to-secondary">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<a
					href="#"
					className="flex items-center mb-6 text-2xl font-semibold text-white">
					{/* <img
						className="w-8 h-8 mr-2"
						src=""
						alt="logo"
					/> */}
					Women in View
				</a>
				<div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-dark md:text-2xl">
							Create and account
						</h1>
						<form
							className="space-y-4 md:space-y-6"
							action="#"
							method="post"
							onSubmit={handleSubmit}>
							<div>
								<label
									htmlFor="name"
									className="block mb-2 text-sm font-medium text-dark">
									Full Name
								</label>
								<input
									type="text"
									name="name"
									id="name"
									className="bg-light border border-light text-dark sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
									placeholder="Jane Doe"
									required
								/>
								{nameError && (
									<p className="text-sm text-red-600">{nameError}</p>
								)}
							</div>
							<div>
								<label
									htmlFor="email"
									className="block mb-2 text-sm font-medium text-dark">
									Your email
								</label>
								<input
									type="email"
									name="email"
									id="email"
									className="bg-light border border-light text-dark sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
									placeholder="name@company.com"
									required
								/>
								{emailError && (
									<p className="text-sm text-red-600">{emailError}</p>
								)}
							</div>
							<div>
								<label
									htmlFor="password"
									className="block mb-2 text-sm font-medium text-dark">
									Password
								</label>
								<input
									type="password"
									name="password"
									id="password"
									placeholder="••••••••"
									className="bg-light border border-light text-dark sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
									required
								/>
								{passwordError && (
									<p className="text-sm text-red-600">{passwordError}</p>
								)}
							</div>
							{/* <div>
								<label
									htmlFor="cpassword"
									className="block mb-2 text-sm font-medium text-dark">
									Confirm password
								</label>
								<input
									type="password"
									name="cpassword"
									id="cpassword"
									placeholder="••••••••"
									className="bg-light border border-light text-dark sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
									required
								/>
							</div> */}

							<button
								type="submit"
								className="w-full text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center">
								Create an account
							</button>
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