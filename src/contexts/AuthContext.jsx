import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import fetchApi from '../utils/fetchApi';

const AuthContent = createContext();

export const AuthProvider = ({ children }) => {
	const [user, _setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
	const [token, _setToken] = useState(() => JSON.parse(localStorage.getItem('token')) || null);

	// set user to local storage
	const setUser = useCallback((newUser) => {
		if (newUser) {
			localStorage.setItem('user', JSON.stringify(newUser));
		} else {
			localStorage.removeItem('user');
		}
		_setUser(newUser);
	}, []);

	// set token to local storage
	const setToken = useCallback((newToken) => {
		if (newToken) {
			localStorage.setItem('token', JSON.stringify(newToken));
		} else {
			localStorage.removeItem('token');
		}
		_setToken(newToken);
	}, []);

	// csrf token generation
	const csrfToken = useCallback(async () => {
		try {
			await fetchApi.get('http://localhost:80/sanctum/csrf-cookie');
			return true;
		} catch (error) {
			console.error('Error fetching CSRF token:', error);
			return false;
		}
	}, []);

	// Context values with useMemo to avoid unnecessary renders
	const authValue = useMemo(() => ({
		user,
		token,
		setUser,
		setToken,
		csrfToken
	}), [user, token, setUser, setToken, csrfToken]);

	return (
		// Uses AuthContent context to provide authentication values to all children
		<AuthContent.Provider value={authValue}>
			{children}
		</AuthContent.Provider>
	);
};

// Custom hook to access authentication values
export const useAuth = () => {
	const context = useContext(AuthContent);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};