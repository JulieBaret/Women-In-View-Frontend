import { Axios } from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import Button from '../components/Button';
import ErrorBanner from '../components/ErrorBanner';
import Heading from '../components/Heading';
import HiddenInput from '../components/HiddenInput';
import EyeIcon from '../components/icons/EyeIcon';
import Input from '../components/Input';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
	const { user, token } = useAuth();
	const [userDetails, setUserDetails] = useState({ id: "", name: "", email: "" });
	const [password, setPassword] = useState("");
	const [confirmedPassword, setConfirmedPassword] = useState("");
	const [isPasswordMatching, setIsPasswordMatching] = useState(true);
	const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
	const [isConfirmedPasswordVisible, setIsConfirmedPasswordVisible] = useState(false);

	useEffect(() => {
		setUserDetails(user);
	}, [user]);

	useEffect(() => {
		if (password && confirmedPassword) {
			setIsPasswordMatching(password === confirmedPassword)
		}
	}, [password, confirmedPassword]);

	const handleReset = (e) => {
		e.preventDefault();
		setUserDetails(user);
	}

	const updateUser = async (e) => {
		e.preventDefault();
		console.log(userDetails);
		try {
			const resp = await Axios.create({
				baseURL: "http://localhost:80/api/",
				withCredentials: true,
				headers: {
					"Authorization": `Bearer ${token}`
				},
			}).put(`/users/${user.id}`);
			if (resp.status === 200) {
				setUser(resp.data.user);
			}
		} catch (error) {
			console.log(error);
		};
	}

	const updatePassword = async (e) => {
		e.preventDefault();
		if (isPasswordMatching) {
			console.log(password);
			// TODO : send API request
		}
	}

	const deleteUser = async (e) => {
		e.preventDefault();
		console.log("delete user");
		// TODO : send API request and relocation to /home
	}

	return (
		<div className='flex flex-col gap-10 self-center w-full'>
			<Heading as="h1" variant="large">Profile</Heading>
			<div className='flex flex-col gap-6'>
				<Heading as="h2" variant="medium">Edit Profile</Heading>
				<form className='flex flex-col gap-2' onSubmit={updateUser}>
					<Input id="username" type="text" label="Username" value={userDetails.name} onChange={(e) => {
						setUserDetails({ ...userDetails, name: e.target.value })
					}} />
					<Input id="email" type="mail" label="Email" value={userDetails.email} onChange={(e) => {
						setUserDetails({ ...userDetails, email: e.target.value })
					}} />
					<div className="flex flex-row self-end gap-2 mt-6">
						<Button type="button" variant="cancel" value="Cancel" onClick={handleReset} />
						<Button value="Save" variant="secondary" />
					</div>
				</form>
			</div>
			<hr className="bg-gray-50 h-1 w-full my-4" />
			<div className='flex flex-col gap-6'>
				<Heading as="h2" variant="medium">Change password</Heading>
				<form className='flex flex-col gap-4' onSubmit={updatePassword}>
					<HiddenInput id="password" type={`${isNewPasswordVisible ? 'text' : 'password'}`} label="New password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="********" isVisible={isNewPasswordVisible} onChangeVisibility={(e) => setIsNewPasswordVisible(e.target.checked)}
					/>
					<HiddenInput id="confirmedPassword" type={`${isConfirmedPasswordVisible ? 'text' : 'password'}`} label="Confirm password" value={confirmedPassword} onChange={(e) => setConfirmedPassword(e.target.value)} placeholder="********" isVisible={isConfirmedPasswordVisible} onChangeVisibility={(e) => setIsConfirmedPasswordVisible(e.target.checked)}
					/>
					<div>
						<ErrorBanner isError={!isPasswordMatching} error="Unmatched password" />
					</div>
					<div className="flex flex-row self-end gap-2 mt-6">
						<Button variant="secondary" value="Confirm" disabled={!isPasswordMatching || !password || !confirmedPassword} />
					</div>
				</form>
			</div>
			<hr className="bg-gray-50 h-1 w-full my-4" />
			<div className='flex flex-col gap-6'>
				<Heading as="h2" variant="medium">Danger Zone</Heading>
				<form onSubmit={deleteUser}>
					<Button variant="danger" value="Delete account"/>
				</form>
			</div>
		</div>
	);
}