import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

// Hooks
import { useAuth } from '../../contexts/AuthContext';

// Icons
import Loading from '../../components/Loading';

// Components
import Heading from '../../components/Heading';
import InfoCard from '../../components/InfoCard';

// External components
import { Pagination } from 'flowbite-react';

// Utils
import { paginationCustomTheme } from '../../utils';
import ErrorBanner from '../../components/ErrorBanner';
import SkeletonInfoCard from '../../components/SkeletonInfoCard';

type User = {
    id: number,
    name: string,
    email: string
}

const Users = () => {
    const { token } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState("");
    const [searchParams,] = useSearchParams();
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
    const navigate = useNavigate();
    const [totalPages, setTotalPages] = useState(0);
    const [reload, doReload] = useState(false);

    const onPageChange = (selectedPage: number) => {
        setIsPending(true);
        setPage(selectedPage);
        navigate(`/admin/users?page=${encodeURIComponent(selectedPage)}`);
    }

    // Fetching user data from DB
    useEffect(() => {
        const options = {
            method: 'GET',
            withCredential: true,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + token
            }
        };
        fetch(import.meta.env.VITE_API_URL + 'users?page=' + page, options)
            .then(response => response.json())
            .then((data) => {
                setTotalPages(data.meta.last_page);
                setUsers(data.data);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setIsPending(false);
            })
    }, [page, reload]);

    if (error) {
        return (
            <div className="px-10">
                <ErrorBanner isError={Boolean(error)} error="It's been a problem while fetching data" />
            </div>
        )
    }

    if (isPending) {
        return (
            <div className="p-10">
                <Heading variant="medium">Users:</Heading>
                <ul className="mt-8 rounded-lg shadow flex flex-col divide-y divide-gray-200">
                    {Array.from({ length: 12 }).map((skeleton, index) =>
                        <li key={index}><SkeletonInfoCard /></li>
                    )}
                </ul>
            </div>
        )
    }

    if (!users.length) {
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
            <div className="flex overflow-x-auto sm:justify-center py-10">
                <Pagination theme={paginationCustomTheme} currentPage={Number(page)} totalPages={totalPages} onPageChange={onPageChange} showIcons />
            </div>
        </div>
    );
};

export default Users;