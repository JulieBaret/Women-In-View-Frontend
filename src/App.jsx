import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import router from './router';
import './App.css'
import FullScreenLoading from './components/FullScreenLoading';

const App = () => {
    return (
		<AuthProvider>
			<RouterProvider router={router} fallbackElement={<FullScreenLoading />} />
		</AuthProvider>
    );
};

export default App;