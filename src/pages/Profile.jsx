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
            })
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
            })
		)
	}

	const updatePassword = async (e) => {
		e.preventDefault();
		if (isPasswordMatching) {
			console.log(password);
			// TODO: send API request
		}
	}

	const deleteUser = async (e) => {
		e.preventDefault();
		console.log("delete user");
		// TODO: send API request and relocation to /home
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
							setNewUsername(e.target.value );
						}} />
						<div className="flex flex-row self-end gap-2 mt-2">
							<Button type="button" variant="cancel" value="Cancel" onClick={handleResetUsername} />
							<Button value="Save" variant="secondary" />
						</div>
						</form>
						<form className='flex flex-col' onSubmit={updateEmail}>
						<Input id="email" type="mail" label="Email" value={newEmail} onChange={(e) => {
							setNewEmail(e.target.value );
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
				</div>
			</div>
		</main>
	);
}