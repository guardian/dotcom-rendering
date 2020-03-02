import React from 'react';

import { SignedInAs } from './SignedInAs';

const aUser = {
    userId: 'abc123',
    displayName: 'Jane Smith',
    webUrl: '',
    apiUrl: '',
    avatar: '',
    secureAvatarUrl: '',
    badge: [],
    privateFields: {
        canPostComment: true,
        isPremoderated: false,
        hasCommented: true,
    },
};

export default {
    component: SignedInAs,
    title: 'Components/SignedInAs',
};

export const SignedIn = () => {
    return <SignedInAs commentCount={3} user={aUser} />;
};
SignedIn.story = { name: 'signed in' };

export const NotSignedIn = () => {
    return <SignedInAs commentCount={32} />;
};
NotSignedIn.story = { name: 'not signed in' };
