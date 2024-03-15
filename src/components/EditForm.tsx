import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import Button from './Button';

type Props = {
    field: string,
    id: number,
    token: string,
    setUser: (object) => void,
    user: object
}

const formSchema = {
    email: Yup.string().email('Invalid email').required('Required'),
    name: Yup.string().min(2, 'Min. 2 characters').max(20, 'Max. 20 characters').required('Required'),
    password: Yup.string().min(8, 'Min. 8 characters').required('Required')
}

const fieldToType = {
    email: "email",
    name: "text",
    password: "password"
}

const EditForm = ({ field, id, token, setUser, user }: Props) => {
    const [error, setError] = useState("");
    const userInfo = {
        ...user,
        password: ''
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
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: 'Bearer ' + token
                    },
                    body: JSON.stringify({
                        ...values
                    })
                };
                // same shape as initial values
                console.log(values);
                fetch(import.meta.env.VITE_API_URL + 'users/' + id, options)
			        .then(response => response.json())
			        .then((data) => {
				        setUser(data.data);
                        toast("Your " + field + " as been correctly updated");
			        })
			        .catch((err) => {
				        console.error(err);
				        toast('Error while updating user: ' + err)
			})
            }}
        >
            {({ errors, touched, isValid }) => (
                <Form>
                    <Toaster />
                    <label className='uppercase text-gray-700 text-xs font-bold mb-2'>Your {field}</label>
                    <Field type={fieldToType[field]} name={field} className="appearance-none w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:ring-primary focus:border-primary" />
                    {/* If this field has been touched, and it contains an error, display it
           */}
                    {touched[field] && errors[field] && <div className='text-sm text-primary'>{errors[field]}</div>}
                    <div className='mt-2'>
                        <Button disabled={!isValid} type="submit" variant="primary" value="Edit"/>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default EditForm;