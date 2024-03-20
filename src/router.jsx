import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import About from './pages/About';
import Profile from './pages/Profile';
import ProtectedLayout from './layouts/ProtectedLayout';
import GuestLayout from './layouts/GuestLayout';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';
import UserReview from './pages/UserReview';
import Results from './pages/Results';
import TestedMovies from './pages/TestedMovies';
import AdminLayout from './layouts/AdminLayout';
import Users from './pages/Users';
import Reviews from './pages/Reviews';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route path="/" element={<GuestLayout />}>
				<Route path="/" element={<SignIn />} />
				<Route path="register" element={<SignUp />} />
				<Route path="forgot-password" element={<ForgotPassword />} />
			</Route>
			<Route path="/" element={<ProtectedLayout />}>
				<Route path="home" element={<Home />} />
				<Route path="tested-movies">
					<Route path=":page" element={<TestedMovies />} />
				</Route>
				<Route path="about" element={<About />} />
				<Route path="user">
					<Route path="profile">
						<Route path=":id" element={<Profile />} />
					</Route>
					<Route path="reviews">
						<Route path=":userId" element={<UserReview />} />
					</Route>
				</Route>
				<Route path="search">
					<Route path=":query" element={<Results />} />
				</Route>
				<Route path="admin" element={<AdminLayout />}>
					<Route path="users">
						<Route path=":page" element={<Users />} />
					</Route>
					<Route path="reviews">
						<Route path=":page" element={<Reviews />} />
					</Route>
				</Route>
			</Route>
		</Route>
	)
);

export default router;