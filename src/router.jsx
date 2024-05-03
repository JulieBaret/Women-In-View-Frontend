import * as React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

// Components
import FullScreenLoading from './components/FullScreenLoading';

// Layouts
const ProtectedLayout = React.lazy(() => import('./layouts/ProtectedLayout'));
const GuestLayout = React.lazy(() => import('./layouts/GuestLayout'));
const AdminLayout = React.lazy(() => import('./layouts/AdminLayout'));

// Pages
const SignIn = React.lazy(() => import('./pages/SignIn'));
const SignUp = React.lazy(() => import('./pages/SignUp'));
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Profile = React.lazy(() => import('./pages/Profile'));
const ForgotPassword = React.lazy(() => import('./pages/ForgotPassword'));
const UserContribution = React.lazy(() => import('./pages/UserContribution/index'));
const Search = React.lazy(() => import('./pages/Search/index'));
const TestedMovies = React.lazy(() => import('./pages/TestedMovies'));
const Users = React.lazy(() => import('./pages/Users'));
const Movies = React.lazy(() => import('./pages/Movies'));

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route path="/" element={
					<React.Suspense fallback={<FullScreenLoading />}>
						<GuestLayout />
					</React.Suspense>
				}>
				<Route path="/" element={
					<React.Suspense fallback={<FullScreenLoading />}>
						<SignIn />
					</React.Suspense>
				} />
				<Route path="register" element={
					<React.Suspense fallback={<FullScreenLoading />}>
						<SignUp />
					</React.Suspense>
				} />
				<Route path="forgot-password" element={
					<React.Suspense fallback={<FullScreenLoading />}>
						<ForgotPassword />
					</React.Suspense>
				} />
			</Route>
			<Route path="/" element={
					<React.Suspense fallback={<FullScreenLoading />}>
						<ProtectedLayout />
					</React.Suspense>
				}>
				<Route path="/home" element={
					<React.Suspense fallback={<FullScreenLoading />}>
						<Home />
					</React.Suspense>
				} />
				<Route path="tested-movies" element={
					<React.Suspense fallback={<FullScreenLoading />}>
						<TestedMovies />
					</React.Suspense>
				} />
				<Route path="about" element={
					<React.Suspense fallback={<FullScreenLoading />}>
						<About />
					</React.Suspense>
				} />
				<Route path="user">
					<Route path="profile">
						<Route path=":id" element={
					<React.Suspense fallback={<FullScreenLoading />}>
						<Profile />
					</React.Suspense>
				} />
					</Route>
					<Route path="contributions">
						<Route path=":userId" element={
					<React.Suspense fallback={<FullScreenLoading />}>
						<UserContribution />
					</React.Suspense>
				} />
					</Route>
				</Route>
				<Route path="search">
					<Route path=":query" element={
					<React.Suspense fallback={<FullScreenLoading />}>
						<Search />
					</React.Suspense>
				} />
				</Route>
				<Route path="admin" element={
					<React.Suspense fallback={<FullScreenLoading />}>
						<AdminLayout />
					</React.Suspense>
				}>
					<Route path="users" element={
					<React.Suspense fallback={<FullScreenLoading />}>
						<Users />
					</React.Suspense>
				} />
					<Route path="movies" element={
					<React.Suspense fallback={<FullScreenLoading />}>
						<Movies />
					</React.Suspense>
				} />
				</Route>
			</Route>
		</Route>
	)
);

export default router;