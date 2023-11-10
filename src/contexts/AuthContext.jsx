import { createContext, useContext, useState } from 'react';
import fetchApi from '../fetchApi';

const AuthContent = createContext({
	user: null,
	setUser: () => {},
	csrfToken: () => {},
});

export const AuthProvider = ({ children }) => {
	const [user, _setUser] = useState(
		JSON.parse(localStorage.getItem('user')) || null
	);

	// set user to local storage
	const setUser = (user) => {
		if (user) {
			localStorage.setItem('user', JSON.stringify(user));
		} else {
			localStorage.removeItem('user');
		}
		_setUser(user);
	};

	// csrf token generation for guest methods
	const csrfToken = async () => {
		await fetchApi.get('http://localhost:80/sanctum/csrf-cookie');
		return true;
	};

	return (
		<AuthContent.Provider value={{ user, setUser, csrfToken }}>
			{children}
		</AuthContent.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContent);
};