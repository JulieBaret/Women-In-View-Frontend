import React, { useState } from 'react';
import { ReactElement } from 'react';
import { useAuth } from '../contexts/AuthContext';

// Icons
import { HiTrash } from 'react-icons/hi';

// Components
import Button from './Button';

// Flowbite
import { CustomFlowbiteTheme, Modal } from 'flowbite-react';

// External components
import toast, { Toaster } from 'react-hot-toast';

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
    const { token, csrfToken } = useAuth();

    const handleOpenModal = (event: React.KeyboardEvent<SVGElement>) => {
        if (event.key === 'Enter') {
            setOpenModal(true);
        };
    };

    return (
        <div>
            <Toaster />
            <li tabIndex={0} className="flex items-center h-36 py-4 rounded-lg hover:bg-gray-100 px-6 cursor-pointer">
                <div className="flex-1">
                    {children}
                </div>
                <HiTrash tabIndex={0} onKeyDown={handleOpenModal} size="24px" className='text-grey hover:text-primary' onClick={() => {
                    setOpenModal(true)
                }} />
            </li>
            {/* Modal */}
            <Modal show={openModal} onClose={() => setOpenModal(false)} theme={customTheme}>
                <Modal.Header><p className='text-dark font-bold'>{`Are you sure you to delete the following ${itemsType === "users" ? "user" : "movie review"}?`}</p></Modal.Header>
                <Modal.Body>
                    {itemsType === "users" && <p>Delete this account will remove all its contributions from <span>Women in View</span>.</p>}
                    <div className="text-light">
                        {children}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" value="Cancel" variant="secondary" onClick={() => setOpenModal(false)} />
                    <Button type="button" value="Delete" variant="primary" onClick={async () => {
                        setOpenModal(false);
                        const options = {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                Accept: 'application/json',
                                Authorization: 'Bearer ' + token
                            }
                        };
                        await csrfToken();
                        fetch(import.meta.env.VITE_API_URL + `${itemsType}/${itemId}`, options)
                            .then(response => response.json())
                            .then(response => {
                                if (response.success) {
                                    toast(`Your ${itemsType === "users" ? "user" : "movie review"} has been correctly deleted`)
                                }
                            })
                            .catch((err) => {
                                toast("Something went wrong: " + err)
                            })
                            .finally(() => {
                                doReload()
                            })
                    }} />
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default InfoCard;