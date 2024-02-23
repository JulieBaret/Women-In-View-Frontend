import { createBrowserRouter, createRoutesFromElements, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import About from './pages/About';
import Profile from './pages/Profile';
import Register from './pages/Register';
import ProtectedLayout from './layouts/ProtectedLayout';
import GuestLayout from './layouts/GuestLayout';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';
import UserReview from './pages/UserReview';
import Results from './pages/Results';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route path="/" element={<GuestLayout />}>
				<Route path="/" element={<Login />} />
				<Route path="register" element={<Register />} />
				<Route path="forgot-password" element={<ForgotPassword />} />
			</Route>
			<Route path="/" element={<ProtectedLayout />}>
				<Route path="home" element={<Home />} />
				<Route path="about" element={<About />} />
				<Route path="profile" element={<Profile />} />
				<Route path="reviews" element={<UserReview />} />
					<Route path="search">
						<Route path=":query" element={<Results />} />
					</Route>
			</Route>
		</Route>
	)
);

export default router;