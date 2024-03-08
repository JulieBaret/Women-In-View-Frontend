import React, { useState } from 'react';
import { ReactElement } from 'react';


// Icons
import { HiPencilAlt, HiTrash } from 'react-icons/hi';

// Components
import Button from './Button';

// Flowbite
import { CustomFlowbiteTheme, Modal } from 'flowbite-react';

// External components
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

const customTheme: CustomFlowbiteTheme['modal'] = {
    "content": {
        "base": "relative h-full w-full p-4 md:h-auto",
        "inner": "relative rounded-lg bg-white shadow flex flex-col max-h-[90vh]",
    },
};

type Props = {
    children: ReactElement,
    itemsType: 'users' | 'movies',
    itemId: number,
    doReload: () => void
}

const InfoCard = ({ children, itemId, itemsType, doReload }: Props) => {
    const [openModal, setOpenModal] = useState(false);
    const { token } = useAuth();

    return (
        <>
            <li className="flex items-center py-4 rounded-lg hover:bg-gray-100 px-6 cursor-pointer">
                <div className="flex-1">
                    {children}
                </div>
                <div className='flex gap-2'>
                    <HiTrash size="24px" className='text-grey hover:text-primary' onClick={() => {
                        setOpenModal(true)
                    }} />
                </div>
            </li>
            {/* Modal */}
            <Modal show={openModal} onClose={() => setOpenModal(false)} theme={customTheme}>
                <Modal.Header><p className='text-dark font-bold'>{`Are you sure you to delete the following ${itemsType === "users" ? "user" : "movie review"}?`}</p></Modal.Header>
                <Modal.Body>
                    <Toaster />
                    <div className="text-light">
                        {children}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" value="Cancel" variant="secondary" onClick={() => setOpenModal(false)} />
                    <Button type="button" value="Delete" variant="primary" onClick={() => {
                        setOpenModal(false)
                        const options = {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                Accept: 'application/json',
                                Authorization: 'Bearer ' + token
                            }
                        };
                        fetch(import.meta.env.VITE_API_URL + `${itemsType}/${itemId}`, options)
                            .then(response => response.json())
                            .catch((err) => {
                                console.error(err);
                                toast("Something went wrong...")
                            })
                            .finally(() => {
                                toast("Review deleted with success!")
                                doReload()
                            })
                    }} />
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default InfoCard;