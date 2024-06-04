import React from 'react';
import fetchApi from '../../utils/fetchApi';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import ErrorBanner from '../../components/ErrorBanner';
import SuccessBanner from '../../components/SuccessBanner';

const ChangePassword = () => {
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const handleSubmit = async (e) => {
		e.preventDefault();
		const { email } = e.target.elements;
		const body = {
			email: email.value,
		};
		try {
			const resp = await fetchApi.post('/users/forgot-password', body);
			if (resp.status === 200) {
				setSuccess("An email has been sent to you, check your inbox!");
			}
		} catch (error) {
			if (error.status === 403) {
				setError("Invalid email");
			}
		}
	};
	return (
		<section>
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<div className="bg-white w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<div className='flex justify-center items-center'>
							<img className='h-16' src='/clap_logo.webp' />
						</div>
						<Heading variant='medium'>Change your password</Heading>
						<form
							className="space-y-4 md:space-y-6 gap-2 flex flex-col"
							onSubmit={handleSubmit}>
							<Input id="email" label="Your email" type="email" placeholder="name@mail.com" required />
							<Button variant="primary" value="Send an email" />
							<ErrorBanner isError={error} error={error} />
							<SuccessBanner isSuccess={success} success={success} />
							<p className="text-sm font-light text-gray-500">
								Just remember it?{' '}
								<Link
									to="/auth/login"
									className="font-medium text-primary hover:underline">
									← Go back to sign in
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	)
};

export default ChangePassword;