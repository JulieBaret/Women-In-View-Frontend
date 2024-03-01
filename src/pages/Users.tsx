import React, { useState } from 'react';
import { useEffect } from 'react';
import Heading from '../components/Heading';
import { useAuth } from '../contexts/AuthContext';

// icons
import { HiPencilAlt, HiTrash } from 'react-icons/hi';
import Loading from '../components/Loading';

// Flowbite
import { Modal } from 'flowbite-react';
import Button from '../components/Button';


type User = {
    id: number,
    name: string,
    email: string
}

const Users = () => {
    const { token } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [isPending, setIsPending] = useState(true);
    const [openModal, setOpenModal] = useState(false);

    // Fetching user data from DB
    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + token
            }
        };
        fetch(import.meta.env.VITE_API_URL + 'users', options)
            .then(response => response.json())
            .then((data) => {
                setUsers(data)
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setIsPending(false);
            })
    }, []);

    return (
        <div className="p-10">
            <Heading variant="medium">Users:</Heading>
            {isPending && <div className="flex p-20 h-full items-center justify-center text-grey">
                <Loading />Fetching data...</div>}
            <ul className="mt-8 rounded-lg shadow flex flex-col divide-y divide-gray-200">
                {users.map((user, index) => (
                    <li className="flex items-center py-4 rounded-lg hover:bg-gray-100 px-6 cursor-pointer" key={index}>
                        <div className="flex-1">
                            <h3 className="text-lg font-medium text-gray-800">{user.name}</h3>
                            <p className="text-gray-600 text-base">{user.email}</p>
                            <p className="text-gray-600 text-base">id: {user.id}</p>
                        </div>
                        <div className='flex gap-2'>
                            <HiPencilAlt size="24px" className='text-grey hover:text-primary'  />
                            <HiTrash size="24px" className='text-grey hover:text-primary' onClick={() => setOpenModal(true)} />
                        </div>
                        {/* Modal */}
                        <Modal show={openModal} onClose={() => setOpenModal(false)} >
                            <Modal.Header>Are you sure you to delete the following user?</Modal.Header>
                            <Modal.Body>
                                <div className="text-light">
                                    <h3 >{user.name}</h3>
                                    <p>{user.email}</p>
                                    <p>id: {user.id}</p>
                                </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button type="button" value="Cancel" variant="secondary" onClick={() => setOpenModal(false)} />
                                    <Button type="button" value="Delete" variant="primary" onClick={() => setOpenModal(false)} />
                                </Modal.Footer>
                        </Modal>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Users;