import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import router from './router';
import './App.css'

const App = () => {
    return (
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
    );
};

export default App;