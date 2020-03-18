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

export const Image = () => {
    return (
        <SignedInAs
            commentCount={32}
            user={{
                ...aUser,
                secureAvatarUrl: 'https://avatar.guim.co.uk/user/101885881',
            }}
        />
    );
};
Image.story = { name: 'with image' };

export const NoDisplayName = () => {
    return (
        <SignedInAs
            commentCount={32}
            user={{
                ...aUser,
                displayName: '',
            }}
        />
    );
};
NoDisplayName.story = { name: 'before a display name has been set' };

export const NotSignedIn = () => {
    return <SignedInAs commentCount={32} />;
};
NotSignedIn.story = { name: 'not signed in' };

export const DiscussionClosed = () => {
    return (
        <SignedInAs commentCount={32} isClosedForComments={true} user={aUser} />
    );
};
DiscussionClosed.story = { name: 'discussion closed, user signed in' };

export const DiscussionClosedSignedOut = () => {
    return <SignedInAs commentCount={32} isClosedForComments={true} />;
};
DiscussionClosedSignedOut.story = {
    name: 'discussion closed, user not signed in',
};
