import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { sanitizeInput } from '../utils/sanitize';

export const SPECIAL_CHARS_REGEXP = /[`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi;

const encodeInput = (str) => {
    return encodeURIComponent(str.trim().toLowerCase().replace(SPECIAL_CHARS_REGEXP, ''));
};

const SearchInput = () => {
    const navigate = useNavigate();
    return (
        <Formik
            initialValues={{
                query: '',
            }}
            onSubmit={values => {
                if (values.query.length < 3) {
                    toast('Min. 3 characters')
                    return;
                }
                if (values.query.length > 30) {
                    toast('Max. 30 characters')
                    return;
                }
                const query = encodeInput(sanitizeInput(values.query));
                navigate(`/search/${query}`);
                values.query = '';
            }}
        >
            {({ errors }) => (
                <Form>
                    <div className="relative w-full  sm:w-fit">
                        <Field type="text" name="query" placeholder="Search for a movie..." className="block w-full sm:w-auto md:w-64 min-w-[190px] h-10 px-4 text-sm text-light border border-transparent rounded-full bg-gray-50 bg-opacity-30 focus:ring-primary focus:border-primary placeholder-light font-normal" />
                        <button aria-label="Search for a movie" type="submit" className="text-light absolute end-2 bottom-1.5 bg-primary hover:bg-primary-hovered focus:ring-4 focus:outline-none font-medium rounded-full text-sm px-2 py-2">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default SearchInput;