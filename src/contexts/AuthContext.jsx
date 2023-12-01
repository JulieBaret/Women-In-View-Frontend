import { createContext, useContext, useState } from 'react';
import fetchApi from '../fetchApi';

const AuthContent = createContext({
	user: null,
	setUser: () => {},
	token: null,
	setToken: () => {},
	csrfToken: () => {},
});

export const AuthProvider = ({ children }) => {
	const [user, _setUser] = useState(
		JSON.parse(localStorage.getItem('user')) || null
	);

	const [token, _setToken] = useState(
		JSON.parse(localStorage.getItem('token')) || null
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

	// set token to local storage
	const setToken = (token) => {
		if (token) {
			localStorage.setItem('token', JSON.stringify(token));
		} else {
			localStorage.removeItem('token');
		}
		_setToken(token);
		};

	// csrf token generation for guest methods
	const csrfToken = async () => {
		await fetchApi.get('http://localhost:80/sanctum/csrf-cookie');
		return true;
	};

	return (
		<AuthContent.Provider value={{ user, token, setToken, setUser, csrfToken }}>
			{children}
		</AuthContent.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContent);
};