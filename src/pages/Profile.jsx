import { Axios } from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import Button from '../components/Button';
import Heading from '../components/Heading';
import EyeIcon from '../components/icons/EyeIcon';
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
		if(isPasswordMatching){
			console.log(password);
			// TODO : send API request
		}
	}

	return (
		<div className='w-5/6 flex flex-col gap-10 p-20 self-center'>
			<Heading as="h1" variant="large">Profile</Heading>
			<div className='flex flex-col gap-6'>
				<Heading as="h2" variant="medium">Edit Profile</Heading>
				<form className='flex flex-col' onSubmit={updateUser}>
					<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
						Username
					</label>
					<input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" value={userDetails.name} onChange={(e) => {
						setUserDetails({ ...userDetails, name: e.target.value })
					}} />
					<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
						Email
					</label>
					<input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="mail" value={userDetails.email} onChange={(e) => {
						setUserDetails({ ...userDetails, email: e.target.value })
					}} />
					<div className="flex flex-row self-end gap-2 mt-6">
						<Button type="button" variant="cancel" value="Cancel" onClick={handleReset}/>
						<Button value="Save" variant="secondary"/>
					</div>
				</form>
			</div>
			<hr className="bg-gray-50 h-1 w-full my-4" />
			<div className='flex flex-col gap-6'>
				<Heading as="h2" variant="medium">Change password</Heading>
				<form className='flex flex-col gap-4' onSubmit={updatePassword}>
					<div>
						<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
							New password
						</label>
						<div className="flex items-center justify-content gap-2">
							<input onChange={(e) => setPassword(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type={`${isNewPasswordVisible ? 'text' : 'password'}`} value={password} placeholder='********' />
							<input type="checkbox" onChange={(e) => setIsNewPasswordVisible(e.target.checked)} className="hidden" id="newPasswordVisibility" />
							<label for="newPasswordVisibility"><EyeIcon isVisible={isNewPasswordVisible} width="30px" strokeColor="gray" /></label>
						</div>
					</div>
					<div>
						<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
							Confirm password
						</label>
						<div className="flex items-center justify-content gap-2">
							<input onChange={(e) => setConfirmedPassword(e.target.value)} className="relative appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type={`${isConfirmedPasswordVisible ? 'text' : 'password'}`} value={confirmedPassword} placeholder='********' />
							<input type="checkbox" onChange={(e) => setIsConfirmedPasswordVisible(e.target.checked)} className="hidden" id="confirmedPasswordVisibility" />
							<label for="confirmedPasswordVisibility"><EyeIcon isVisible={isConfirmedPasswordVisible} width="30px" strokeColor="gray" />
							</label>
						</div>
					</div>
					<div>
						{!isPasswordMatching && <p className='text-red-700 bg-red-100 w-fit px-2 py-1 rounded'>Unmatched password</p>}
					</div>
					<div className="flex flex-row self-end gap-2 mt-6">
						<Button variant="secondary" value="Confirm" disabled={!isPasswordMatching || !password || !confirmedPassword}/>
					</div>
				</form>
			</div>
			<hr className="bg-gray-50 h-1 w-full my-4" />
			<div className='flex flex-col gap-6'>
				<Heading as="h2" variant="medium">Danger Zone</Heading>
				<form className='flex flex-col'>
					<Button variant="danger" value="Delete account"/>
				</form>
			</div>
		</div>
	);
}