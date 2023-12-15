import React, { useState } from 'react';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
	const { user } = useAuth();
	const [userDetails, setUserDetails] = useState({});

	useEffect(() => {
		setUserDetails(user);
	}, [user]);

	// const handleChange = (e) => {
	// 	e.preventDefault();
	// 	setValue(e.target.value);
	// }

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(userDetails);
	}

	// TODO : use this function on submit
	// const editUser = async () => {
	// 	e.preventDefault;
	// 		try {
	// 			const resp = await Axios.create({
	// 				baseURL: "http://localhost:80/api/",
	// 				withCredentials: true,
	// 				headers: {
	// 					"Authorization": `Bearer ${token}`
	// 				},
	// 			}).put('/user');
	// 			if (resp.status === 200) {
	// 				//TO DO set item user
	// 			}
	// 		} catch (error) {
	// 			console.log(error);
	// 		};
	// }

	return (
		<div className='w-5/6 flex flex-col gap-10 p-20 self-center'>
			<h1 className='text-4xl font-extrabold'>Profile</h1>
			<div className='flex flex-col gap-6'>
				<h2 className="text-3xl font-bold text-gray-500">Edit profile</h2>
				<form className='flex flex-col' onSubmit={handleSubmit}>
					<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
						Username
					</label>
					<input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" value={userDetails.name} onChange={(e) => {
						setUserDetails({ ...user, name: e.target.value })
					}} />
					<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
						Email
					</label>
					<input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="mail" value={userDetails.email} onChange={(e) => {
						setUserDetails({ ...user, email: e.target.value })
					}} />
					<div className="flex flex-row self-end gap-2 mt-6">
						<button className="focus:outline-none text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Cancel</button>
						<input type="submit" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" value="Save"/>
					</div>
				</form>
			</div>
			<hr className="bg-gray-50 h-1 w-full my-4" />
			<div className='flex flex-col gap-6'>
				<h2 className="text-3xl font-bold text-gray-500">Change password</h2>
				<form className='flex flex-col'>
					<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
						New password
					</label>
					<input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="password" value="" placeholder='********' />
					<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
						Confirm password
					</label>
					<input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="password" value="" placeholder='********' />
					<div className="flex flex-row self-end gap-2 mt-6">
						<input type="submit" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" value="Confirm" />
					</div>
				</form>
			</div>
			<hr className="bg-gray-50 h-1 w-full my-4" />
			<div className='flex flex-col gap-6'>
				<h2 className="text-3xl font-bold text-gray-500">Danger zone</h2>
				<form className='flex flex-col'>
					<input type="submit" className=" w-1/2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" value="Delete account" />
				</form>
			</div>
		</div>
	);
}