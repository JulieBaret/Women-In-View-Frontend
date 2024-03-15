import React, { useState } from 'react';
import { useEffect } from 'react';
import Heading from '../components/Heading';
import { useAuth } from '../contexts/AuthContext';

// icons
import Loading from '../components/Loading';

// Components
import InfoCard from '../components/InfoCard';


type User = {
    id: number,
    name: string,
    email: string
}

const Users = () => {
    const { token } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [isPending, setIsPending] = useState(true);
    const [reload, doReload] = useState(false);

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
    }, [reload]);

    if(isPending) {
        return (
            <div className="p-10">
                <Heading variant="medium">Users:</Heading>
                <div className="flex p-20 h-full items-center justify-center text-grey">
                <Loading />Fetching data...</div>
            </div>
        )
    }

    if(!users.length) {
        return (
            <div className="p-10">
                <Heading variant="medium">Users:</Heading>
                <p className="mt-2">There is no users...</p>
            </div>
        )
    }

    return (
        <div className="p-10">
            <Heading variant="medium">Users:</Heading>
            <ul className="mt-8 rounded-lg shadow flex flex-col divide-y divide-gray-200">
                {users.length && users.map((user) => (
                    <InfoCard key={user.id} itemId={user.id} itemsType="users" doReload={() => doReload((prev) => !prev)}>
                        <>
                            <h3 className="text-lg font-medium text-gray-800">{user.name}</h3>
                            <p className="text-gray-600 text-base">{user.email}</p>
                            <p className="text-gray-600 text-base">id: {user.id}</p>
                        </>
                    </InfoCard>
                ))}
            </ul>
        </div>
    );
};

export default Users;