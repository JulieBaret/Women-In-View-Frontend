import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import About from './pages/About';
import Profile from './pages/Profile';
import Register from './pages/Register';
import ProtectedLayout from './layouts/ProtectedLayout';
import GuestLayout from './layouts/GuestLayout';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';
import UserReview from './pages/UserReview';

const router = createBrowserRouter([
	{
		path: '/',
		element: <GuestLayout />,
		children: [
			{
				path: '/',
				element: <Login />,
			},
			{
				path: '/register',
				element: <Register />,
			},
			{
				path: '/forgot-password',
				element: <ForgotPassword />,
			},
		],
	},
	{
		path: '/',
		element: <ProtectedLayout />,
		children: [
			{
				path: '/home',
				element: <Home />,
			},
			{
				path: '/about',
				element: <About />,
			},
			{
				path: '/profile',
				element: <Profile />,
			},
			{
				path: '/reviews',
				element: <UserReview />,
			},
		],
	},
]);

export default router;