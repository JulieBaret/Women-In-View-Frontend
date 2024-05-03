import React from 'react';
import Heading from '../components/Heading';

const PrivacyPolicy = () => {
    return (
        <main className='flex flex-col'>
            <article className='flex flex-col self-center gap-4 text-lg text-justify lg:w-5/6'>
                <Heading variant="large">Privacy policy</Heading>
                <p>Thank you for visiting Women in View, a project developed by Marielle Koffi and Julie Baret, software developers and students at Ada Tech School. This Privacy Policy outlines how we collect, use, maintain, and disclose information gathered from users of our website.</p>
                <Heading variant="medium">Information Collection and Use</Heading>
                <p>We may collect personal identification information from users in a variety of ways, including but not limited to when users visit our site, register on the site, fill out a form, and in connection with other activities, services, features, or resources we make available on our site. Users may be asked for, as appropriate, name, email address, mailing address, phone number, and other relevant information. We will collect personal identification information from users only if they voluntarily submit such information to us. Users can always refuse to supply personal identification information, except that it may prevent them from engaging in certain site-related activities.</p>
                <Heading variant="medium">Information Protection</Heading>
                <p>We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information, username, password, transaction information, and data stored on our site.</p>
            </article>
        </main>
    );
};

export default PrivacyPolicy;