import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import Button from './Button';
import { useAuth } from '../contexts/AuthContext';

type Props = {
    field: "email" | "name" | "password",
    id: number,
    user: object
}

const formSchema = {
    email: Yup.string().email('Invalid email').required('Required'),
    name: Yup.string().min(2, 'Min. 2 characters').max(20, 'Max. 20 characters').required('Required'),
    password: Yup.string().min(8, 'Min. 8 characters').matches(/[0-9]/, 'Requires a number')
        .matches(/[a-z]/, 'Requires a lowercase letter')
        .matches(/[A-Z]/, 'Requires an uppercase letter')
        .matches(/[^\w]/, 'Requires a special character').required('Required')
}

const EditForm = ({ field, id, user }: Props) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const { token, setUser, csrfToken } = useAuth();
    const userInfo = {
        ...user,
        password: ''
    }

    const fieldToType = {
        email: "email",
        name: "text",
        password: isPasswordVisible ? "text" : "password"
    }

    const editFormSchema = Yup.object().shape({
        [field]: formSchema[field]
    });

    return (
        <Formik
            initialValues={{
                [field]: userInfo[field],
            }}
            validationSchema={editFormSchema}
            onSubmit={async values => {
                const options = {
                    method: 'PUT',
                    withCredential: true,
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: 'Bearer ' + token
                    },
                    body: JSON.stringify({
                        ...values
                    })
                };
                fetch(import.meta.env.VITE_API_URL + 'users/' + id, options)
                    .then(response => response.json())
                    .then((data) => {
                        setUser(data.data);
                        toast("Your " + field + " as been correctly updated");
                    })
                    .catch((err) => {
                        toast('Error while updating user: ' + err)
                    })
            }}
        >
            {({ errors, touched, isValid, resetForm, values, initialValues }) => (
                <Form>
                    <label id={field} className='uppercase text-gray-700 text-xs font-bold mb-2'>Your {field === "password" && "new"} {field}</label>
                    <div className='flex gap-2 items-center justify-center'>
                        <Field aria-labelledby={field} type={fieldToType[field]} name={field} className="appearance-none w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:ring-primary focus:border-primary" />
                        {field !== "password" && <Button disabled={values === initialValues} type="button" onClick={() => resetForm()} variant="secondary" value="Cancel" />}
                        <Button disabled={!isValid} type="submit" variant="primary" value="Save" />
                    </div>
                    {field === "password" && <div className='flex items-center gap-2 text-xs my-2'>
                        <input aria-labelledby="showPassword" type="checkbox" name="showPassword" className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2" onChange={(e) => setIsPasswordVisible(e.target.checked)} />
                        <label id="showPassword" className={isPasswordVisible ? 'text-primary' : 'text-gray-300'}>Show password</label>
                    </div>}
                    {touched[field] && errors[field] && <div className='text-sm text-primary'>{errors[field]}</div>}
                </Form>
            )}
        </Formik>
    );
};

export default EditForm;