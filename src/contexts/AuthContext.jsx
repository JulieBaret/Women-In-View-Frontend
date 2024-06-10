import { createContext, useContext, useState, useCallback, useMemo } from 'react';

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

	// Context values with useMemo to avoid unnecessary renders
	const authValue = useMemo(() => ({
		user,
		token,
		setUser,
		setToken,
	}), [user, token, setUser, setToken]);

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