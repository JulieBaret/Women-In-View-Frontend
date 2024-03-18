import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Heading from '../components/Heading';
import { Link, Navigate } from 'react-router-dom';
import Button from '../components/Button';
import fetchApi from '../fetchApi';
import { useAuth } from '../contexts/AuthContext';
import ErrorBanner from '../components/ErrorBanner';

const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Min. 2 characters')
        .max(20, 'Max. 20 characters')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .min(8, 'Min. 8 characters or digits')
        .required('Required'),
});

const SignUp = () => {
    const { setUser, setToken } = useAuth();
	const [error, setError] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);



    return (
        <section>
            <div className="flex flex-col items-center justify-center px-6 py-8 lg:py-0">
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <div className='flex justify-center items-center'>
                            <img className='h-28' src='/clap_logo.png' />
                        </div>
                        <Heading as='h1' variant='medium'>Create an account</Heading>
                        <Formik
                            initialValues={{
                                name: '',
                                email: '',
                                password: ''
                            }}
                            validationSchema={SignupSchema}
                            onSubmit={async (values) => {
                                console.log(values);
                                try {
                                    const resp = await fetchApi.post('/register', values);
                                    if (resp.status === 200) {
                                        setUser(resp.data.user);
                                        setToken(resp.data.token);
                                        return <Navigate to="/profile" />;
                                    }
                                } catch (error) {
                                    setError("Error while sign up");
                                }
                            }}
                        >
                            {({ errors, touched, isValid }) => (
                                <Form className="flex flex-col gap-4">
                                    <div className="flex flex-col">
                                        <label className='uppercase text-gray-700 text-xs font-bold mb-2'>username</label>
                                        <Field name="name" className="appearance-none w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:ring-primary focus:border-primary" />
                                        {errors.name && touched.name ? (
                                            <div className='text-sm text-primary'>{errors.name}</div>
                                        ) : null}
                                    </div>
                                    <div className="flex flex-col">
                                        <label className='uppercase text-gray-700 text-xs font-bold mb-2'>email</label>
                                        <Field name="email" type="email" className="appearance-none w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:ring-primary focus:border-primary" />
                                        {errors.email && touched.email ? (
                                            <div className='text-sm text-primary'>{errors.email}</div>
                                        ) : null}
                                    </div>
                                    <div className="flex flex-col">
                                        <label className='uppercase text-gray-700 text-xs font-bold mb-2'>password</label>
                                        <Field name="password" type={isPasswordVisible ? 'text' : 'password'} className="appearance-none w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:ring-primary focus:border-primary" />
                                        {errors.password && touched.password ? (
                                            <div className='text-sm text-primary'>{errors.password}</div>
                                        ) : null}
                                    </div>
                                    <div className='flex items-center gap-2 text-xs'>
                                        <input type="checkbox" name="showPassword" className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2" onChange={(e) => setIsPasswordVisible(e.target.checked)} />
                                        <p className={isPasswordVisible ? 'text-primary' : 'text-gray-300'}>Show password</p>
                                    </div>
                                    <Button disabled={!isValid} type="submit" variant="primary" value="Create an account"/>
                                </Form>
                            )}
                        </Formik>
                        {error && <ErrorBanner isError={true} error={error}/>}
                        <p className="text-sm font-light text-gray-500">
								Already have an account?{' '}
								<Link
									to="/"
									className="font-medium text-primary hover:underline">
									Login here
								</Link>
							</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignUp;