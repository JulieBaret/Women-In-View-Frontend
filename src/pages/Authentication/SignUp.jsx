import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Heading from '../../components/Heading';
import { Link, Navigate } from 'react-router-dom';
import Button from '../../components/Button';
import fetchApi from '../../utils/fetchApi';
import { useAuth } from '../../contexts/AuthContext';
import ErrorBanner from '../../components/ErrorBanner';
import FullScreenLoading from '../../components/FullScreenLoading';

const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Min. 2 characters')
        .max(20, 'Max. 20 characters')
        .matches(/^[a-zA-Z0-9]+$/, 'Letters or digits only')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .min(8, 'Min. 8 characters or digits')
        .max(50, 'Max. 50 characters or digits')
        .matches(/[0-9]/, 'Requires a number')
        .matches(/[a-z]/, 'Requires a lowercase letter')
        .matches(/[A-Z]/, 'Requires an uppercase letter')
        .matches(/[^\w]/, 'Requires a special character')
        .required('Required'),
});

const SignUp = () => {
    const { setUser, setToken, csrfToken } = useAuth();
    const [error, setError] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isPending, setIsPending] = useState(false);

    return (
        <>
            {isPending && <FullScreenLoading label='Welcome!' />}
            <div className="flex flex-col items-center justify-center px-6 py-8 lg:py-0">
                <div className="w-full bg-white rounded-lg shadow-2xl md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <div className='flex justify-center items-center'>
                            <img className='h-28' src='/clap_logo.webp' alt='Women in view clap logo' />
                        </div>
                        <Heading variant='medium'>Create an account</Heading>
                        <Formik
                            initialValues={{
                                name: '',
                                email: '',
                                password: ''
                            }}
                            validationSchema={SignupSchema}
                            onSubmit={async (values) => {
                                setIsPending(true);
                                await csrfToken();
                                try {
                                    const resp = await fetchApi.post('/register', values);
                                    if (resp.status === 200) {
                                        setUser(resp.data.user);
                                        setToken(resp.data.token);
                                        return <Navigate to="/profile" />;
                                    }
                                } catch (error) {
                                    setError(error.response.data.message);
                                } finally {
                                    setIsPending(false);
                                }
                            }}
                        >
                            {({ errors, touched, isValid }) => (
                                <Form className="flex flex-col gap-4">
                                    <div className="flex flex-col">
                                        <label id="username" className='uppercase text-gray-700 text-xs font-bold mb-2'>username</label>
                                        <Field aria-labelledby="username" name="name" className="appearance-none w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:ring-primary focus:border-primary" />
                                        {errors.name && touched.name ? (
                                            <div className='text-sm text-primary'>{errors.name}</div>
                                        ) : null}
                                    </div>
                                    <div className="flex flex-col">
                                        <label id="email" className="uppercase text-gray-700 text-xs font-bold mb-2">email</label>
                                        <Field aria-labelledby="email" name="email" type="email" className="appearance-none w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:ring-primary focus:border-primary" />
                                        {errors.email && touched.email ? (
                                            <div className='text-sm text-primary'>{errors.email}</div>
                                        ) : null}
                                    </div>
                                    <div className="flex flex-col">
                                        <label id="password" className='uppercase text-gray-700 text-xs font-bold mb-2'>password</label>
                                        <Field aria-labelledby="password" name="password" type={isPasswordVisible ? 'text' : 'password'} className="appearance-none w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:ring-primary focus:border-primary" />
                                        {errors.password && touched.password ? (
                                            <div className='text-sm text-primary'>{errors.password}</div>
                                        ) : null}
                                    </div>
                                    <div className='flex items-center gap-2 text-xs'>
                                        <input aria-labelledby="showPassword" type="checkbox" name="showPassword" className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2" onChange={(e) => setIsPasswordVisible(e.target.checked)} />
                                        <label id="showPassword" className={isPasswordVisible ? 'text-primary' : 'text-gray-300'}>Show password</label>
                                    </div>
                                    <Button disabled={!isValid} type="submit" variant="primary" value="Create an account" />
                                </Form>
                            )}
                        </Formik>
                        {error && <ErrorBanner isError={true} error={error} />}
                        <p className="text-sm font-light text-gray-500">
                            Already have an account?{' '}
                            <Link
                                to="/auth/login"
                                className="font-medium text-primary hover:underline">
                                Login here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;