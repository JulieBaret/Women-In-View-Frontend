import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Context
import { useAuth } from '../contexts/AuthContext';

// Components
import Button from '../components/Button';
import Heading from '../components/Heading';
import toast from 'react-hot-toast';

// Flowbite
import { Modal } from 'flowbite-react';
import EditForm from '../components/EditForm';

const customTheme = {
	"content": {
		"base": "relative h-full w-full p-4 md:h-auto",
		"inner": "relative rounded-lg bg-white shadow flex flex-col max-h-[90vh]",
	},
};

export default function Profile() {
	const params = useParams();
	const { id } = params;
	const { token, setUser, user, csrfToken } = useAuth();
	const [openModal, setOpenModal] = useState(false);


	// Fetching user data from DB
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
		fetch(import.meta.env.VITE_API_URL + 'users/' + id, options)
			.then(response => response.json())
			.then((data) => {
				setUser(data.data);
			})
			.catch((err) => {
				toast('Error while updating user: ' + err)
			})
	}, []);

	const deleteUser = async (e) => {
		e.preventDefault();
		setOpenModal(true);
	}

	return (
		<main className="flex justify-center flex-col items-center">
			<div className='flex flex-col gap-10 self-center w-full'>
				<Heading variant="large">Profile</Heading>
				<div className='flex flex-col gap-4'>
					<Heading variant="medium">Edit Profile</Heading>
					<EditForm field="name" id={id} user={user} />
					<EditForm field="email" id={id} user={user} />
					<Heading variant="medium">Change password</Heading>
					<EditForm field="password" id={id} user={user} />
				</div>
				<hr className="bg-gray-50 h-1 w-full my-4" />
				<div className='flex flex-col gap-6'>
					<Heading variant="medium">Danger Zone</Heading>
					<form onSubmit={deleteUser}>
						<Button variant="danger" value="Delete account" />
					</form>
					{/* Modal */}
					<Modal show={openModal} onClose={() => setOpenModal(false)} theme={customTheme}>
						<Modal.Body>
							<p className='text-dark font-bold mb-6'>Are you sure you want to delete your account?
							</p>
							<p>Delete your account will remove all your contributions from <span>Women in View</span>.</p>
						</Modal.Body>
						<Modal.Footer>
							<Button type="button" value="Cancel" variant="secondary" onClick={() => setOpenModal(false)} />
							<Button type="button" value="Delete" variant="primary" onClick={async () => {
								const options = {
									method: 'DELETE',
									withCredential: true,
									headers: {
										'Content-Type': 'application/json',
										Accept: 'application/json',
										Authorization: 'Bearer ' + token
									}
								};
								fetch(import.meta.env.VITE_API_URL + "users/" + user.id, options)
									.then(response => response.json())
									.catch((err) => {
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