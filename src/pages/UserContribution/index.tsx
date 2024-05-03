import React from 'react';
import { useParams } from 'react-router-dom';

// Components
import Heading from '../../components/Heading';
import UserContributionResults from './UserContributionResults';

const UserContribution = () => {
    const params = useParams();
    const { userId } = params;

    return (
        <main className="flex flex-col gap-10">
            <Heading variant="large">My contributions:</Heading>
            <UserContributionResults userId={userId} />
        </main>
    );
};

export default UserContribution;