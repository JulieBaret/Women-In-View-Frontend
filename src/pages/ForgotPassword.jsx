import React, { useState } from 'react';
import fetchApi from '../fetchApi';
import Input from '../components/Input';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import ErrorBanner from '../components/ErrorBanner';
import SuccessBanner from '../components/SuccessBanner';

const ForgotPassword = () => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const handleSubmit = async (e) => {
		e.preventDefault();
		const { email } = e.target.elements;
		const body = {
			email: email.value,
		};
        console.log(body);
		try {
			const resp = await fetchApi.post('/users/forgot-password', body);
			if (resp.status === 200) {
				setSuccess("An email has been sent to you, check your inbox!");
			}
		} catch (error) {
            if (error.status === 403) {
                setError("Invalid email");
            }
			console.log(error);
		}
	};
    return (
        <section className="bg-gradient-to-r from-primary to-secondary h-full">
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
				<div className="bg-white w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
							Forgot your password?
						</h1>
						<form
							className="space-y-4 md:space-y-6 gap-2 flex flex-col"
							onSubmit={handleSubmit}>
							<Input id="email" label="Your email" type="email" placeholder="name@company.com" required />
							<Button variant="primary" value="Send an email" />
                            <ErrorBanner isError={error} error={error}/>
                            <SuccessBanner isSuccess={success} success={success}/>
                            <p className="text-sm font-light text-gray-500">
								Just remember it?{' '}
								<Link
									to="/"
									className="font-medium text-primary hover:underline">
									← Go back to sign in
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
    );
};

export default ForgotPassword;