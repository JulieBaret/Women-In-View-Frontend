import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Context
import { useAuth } from '../contexts/AuthContext';

// Components
import Button from '../components/Button';
import ErrorBanner from '../components/ErrorBanner';
import Heading from '../components/Heading';
import HiddenInput from '../components/HiddenInput';
import Input from '../components/Input';
import toast, { Toaster } from 'react-hot-toast';

// Flowbite
import {  Modal } from 'flowbite-react';

const customTheme = {
    "content": {
        "base": "relative h-full w-full p-4 md:h-auto",
        "inner": "relative rounded-lg bg-white shadow flex flex-col max-h-[90vh]",
    },
};

export default function Profile() {
	const params = useParams();
	const { id } = params;
	const { token, setUser, user } = useAuth();
	const [newUsername, setNewUsername] = useState("");
	const [newEmail, setNewEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmedPassword, setConfirmedPassword] = useState("");
	const [isPasswordMatching, setIsPasswordMatching] = useState(true);
	const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
	const [isConfirmedPasswordVisible, setIsConfirmedPasswordVisible] = useState(false);
	const [openModal, setOpenModal] = useState(false);


	// Fetching user data from DB
	useEffect(() => {
		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: 'Bearer ' + token
			}
		};
		fetch(import.meta.env.VITE_API_URL + 'users/' + id, options)
			.then(response => response.json())
			.then((data) => {
				console.log(data.data);
				setUser(data.data);
			})
			.catch((err) => {
				console.error(err);
				toast('Error while updating user: ' + err)
			})
	}, []);

	useEffect(() => {
		setNewUsername(user.name);
	}, [user.name]);

	useEffect(() => {
		setNewEmail(user.email);
	}, [user.email]);

	useEffect(() => {
		if (password && confirmedPassword) {
			setIsPasswordMatching(password === confirmedPassword)
		}
	}, [password, confirmedPassword]);

	const handleResetUsername = (e) => {
		e.preventDefault();
		setNewUsername(user.name);
		setNewEmail(user.email);
	}

	const handleResetEmail = (e) => {
		e.preventDefault();
		setNewUsername(user.name);
		setNewEmail(user.email);
	}

	// Update username
	const updateUsername = async (e) => {
		e.preventDefault();
		const options = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: 'Bearer ' + token
			},
			body: JSON.stringify({
				name: newUsername
			})
		};
		fetch(import.meta.env.VITE_API_URL + 'users/' + id, options)
			.then(response => response.json())
			.then((data) => {
				setUser(data.data);
			})
			.catch((err) => {
				console.error(err);
				toast('Error while updating user: ' + err)
			}).finally(
				toast('Username updated with success!')
			)
	}

	// Update user email
	const updateEmail = async (e) => {
		e.preventDefault();
		const options = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: 'Bearer ' + token
			},
			body: JSON.stringify({
				email: newEmail
			})
		};
		fetch(fetch(import.meta.env.VITE_API_URL + 'users/' + id, options)
			.then(response => response.json())
			.then((data) => {
				setUser(data.data);
			})
			.catch((err) => {
				console.error(err);
				toast('Error while updating user: ' + err)
			}).finally(
				toast('Email address updated with success!')
			)
		)
	}

	// update password
	const updatePassword = async (e) => {
		e.preventDefault();
		if (isPasswordMatching) {
			const options = {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: 'Bearer ' + token
				},
				body: JSON.stringify({
					password: confirmedPassword
				})
			};
			fetch(fetch(import.meta.env.VITE_API_URL + 'users/' + id, options)
				.then(response => response.json())
				.then((data) => {
					setUser(data.data);
				})
				.catch((err) => {
					console.error(err);
					toast('Error while updating user: ' + err)
				}).finally(
					toast('Password updated with success!')
				)
			)
		}
	}

	const deleteUser = async (e) => {
		e.preventDefault();
		setOpenModal(true);
	}

	return (
		<main className="flex justify-center flex-col items-center">
			<Toaster />
			<div className='flex flex-col gap-10 self-center w-full'>
				<Heading as="h1" variant="large">Profile</Heading>
				<div className='flex flex-col'>
					<Heading as="h2" variant="medium">Edit Profile</Heading>
					<form className='flex flex-col' onSubmit={updateUsername}>
						<Input id="username" type="text" label="Username" value={newUsername} onChange={(e) => {
							setNewUsername(e.target.value);
						}} />
						<div className="flex flex-row self-end gap-2 mt-2">
							<Button type="button" variant="cancel" value="Cancel" onClick={handleResetUsername} />
							<Button value="Save" variant="secondary" />
						</div>
					</form>
					<form className='flex flex-col' onSubmit={updateEmail}>
						<Input id="email" type="mail" label="Email" value={newEmail} onChange={(e) => {
							setNewEmail(e.target.value);
						}} />
						<div className="flex flex-row self-end gap-2 mt-2">
							<Button type="button" variant="cancel" value="Cancel" onClick={handleResetEmail} />
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
						<Button variant="danger" value="Delete account" />
					</form>
					{/* Modal */}
					<Modal show={openModal} onClose={() => setOpenModal(false)} theme={customTheme}>
						<Modal.Body><p className='text-dark font-bold'>Are you sure you want to delete your account?</p></Modal.Body>
						<Modal.Footer>
							<Button type="button" value="Cancel" variant="secondary" onClick={() => setOpenModal(false)} />
							<Button type="button" value="Delete" variant="primary" onClick={() => {
								const options = {
									method: 'DELETE',
									headers: {
										'Content-Type': 'application/json',
										Accept: 'application/json',
										Authorization: 'Bearer ' + token
									}
								};
								fetch(import.meta.env.VITE_API_URL + "users/" + user.id, options)
									.then(response => response.json())
									.catch((err) => {
										console.error(err);
										toast("Something went wrong...")
									})
									.finally(() => {
										toast("User deleted with success!")
										localStorage.removeItem('user');
										localStorage.removeItem('token');
										window.location.href = '/';
									})
							}} />
						</Modal.Footer>
					</Modal>
				</div>
			</div>
		</main>
	);
}