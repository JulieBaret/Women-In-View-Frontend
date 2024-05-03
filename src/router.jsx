import * as React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

// Components
import FullScreenLoading from './components/FullScreenLoading';

// Layouts
const ProtectedLayout = React.lazy(() => import('./layouts/ProtectedLayout'));
const GuestLayout = React.lazy(() => import('./layouts/GuestLayout'));
const AdminLayout = React.lazy(() => import('./layouts/AdminLayout'));

// Pages
const SignIn = React.lazy(() => import('./pages/Authentication/SignIn'));
const SignUp = React.lazy(() => import('./pages/Authentication/SignUp'));
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Profile = React.lazy(() => import('./pages/Profile'));
const ForgotPassword = React.lazy(() => import('./pages/Authentication/ForgotPassword'));
const UserContribution = React.lazy(() => import('./pages/UserContribution/index'));
const Search = React.lazy(() => import('./pages/Search/index'));
const TestedMovies = React.lazy(() => import('./pages/TestedMovie/index'));
const Users = React.lazy(() => import('./pages/Admin/Users'));
const Movies = React.lazy(() => import('./pages/Admin/Movies'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfUse = React.lazy(() => import('./pages/TermsOfUse'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

const SuspenseFallback = () => <FullScreenLoading />;

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route path="/" element={
				<React.Suspense fallback={<SuspenseFallback />}>
					<GuestLayout />
				</React.Suspense>
			}>
				<Route path="/" element={<React.Suspense fallback={<SuspenseFallback />}><SignIn /></React.Suspense>} />
				<Route path="register" element={<React.Suspense fallback={<SuspenseFallback />}><SignUp /></React.Suspense>} />
				<Route path="forgot-password" element={<React.Suspense fallback={<SuspenseFallback />}><ForgotPassword /></React.Suspense>} />
			</Route>

			<Route path="/" element={
				<React.Suspense fallback={<SuspenseFallback />}>
					<ProtectedLayout />
				</React.Suspense>
			}>
				<Route path="/home" element={<React.Suspense fallback={<SuspenseFallback />}><Home /></React.Suspense>} />
				<Route path="tested-movies" element={<React.Suspense fallback={<SuspenseFallback />}><TestedMovies /></React.Suspense>} />
				<Route path="about" element={<React.Suspense fallback={<SuspenseFallback />}><About /></React.Suspense>} />
				<Route path="legal" element={<React.Suspense fallback={<SuspenseFallback />}><PrivacyPolicy /></React.Suspense>} />
				<Route path="terms" element={<React.Suspense fallback={<SuspenseFallback />}><TermsOfUse /></React.Suspense>} />
				<Route path="user">
					<Route path="profile">
						<Route path=":id" element={<React.Suspense fallback={<SuspenseFallback />}><Profile /></React.Suspense>} />
					</Route>
					<Route path="contributions">
						<Route path=":userId" element={<React.Suspense fallback={<SuspenseFallback />}><UserContribution /></React.Suspense>} />
					</Route>
				</Route>
				<Route path="search">
					<Route path=":query" element={<React.Suspense fallback={<SuspenseFallback />}><Search /></React.Suspense>} />
				</Route>
				<Route path="admin" element={<React.Suspense fallback={<SuspenseFallback />}><AdminLayout /></React.Suspense>}>
					<Route path="users" element={<React.Suspense fallback={<SuspenseFallback />}><Users /></React.Suspense>} />
					<Route path="movies" element={<React.Suspense fallback={<SuspenseFallback />}><Movies /></React.Suspense>} />
				</Route>
			</Route>
			<Route path="*" element={<React.Suspense fallback={<SuspenseFallback />}><NotFound /></React.Suspense>}/>
		</Route>
	)
);

export default router;
