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
import LastReviews from './pages/LastReviews';
import AdminLayout from './layouts/AdminLayout';
import Users from './pages/Users';
import Reviews from './pages/Reviews';

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
				<Route path="last-reviews" element={<LastReviews />} />
				<Route path="about" element={<About />} />
				<Route path="profile">
					<Route path=":id" element={<Profile />} />
				</Route>
				<Route path="reviews">
					<Route path=":userId" element={<UserReview />} />
				</Route>
				<Route path="search">
					<Route path=":query" element={<Results />} />
				</Route>
				<Route path="admin" element={<AdminLayout />}>
					<Route path="users" element={<Users />} />
					<Route path="reviews" element={<Reviews />} />
				</Route>
			</Route>
		</Route>
	)
);

export default router;