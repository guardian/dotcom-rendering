import React from 'react';

import { mockRESTCalls } from '@root/src/web/lib/mockRESTCalls';

import { CommentsLayout } from './CommentsLayout';

const user: UserProfile = {
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

/* tslint:disable */
export default {
    component: CommentsLayout,
    title: 'Components/CommentsLayout',
};
/* tslint:enable */

mockRESTCalls();

export const Default = () => (
    <CommentsLayout
        baseUrl="https://discussion.theguardian.com/discussion-api"
        pillar="news"
        shortUrl="p/39f5z/"
        commentCount={345}
        isClosedForComments={false}
        enableDiscussionSwitch={true}
        discussionD2Uid="testD2Header"
        discussionApiClientHeader="testClientHeader"
        expanded={false}
        onPermalinkClick={() => {}}
    />
);
Default.story = { name: 'default' };

export const LoggedIn = () => (
    <CommentsLayout
        user={user}
        baseUrl="https://discussion.theguardian.com/discussion-api"
        pillar="news"
        shortUrl="p/39f5z/"
        commentCount={345}
        isClosedForComments={false}
        enableDiscussionSwitch={true}
        discussionD2Uid="testD2Header"
        discussionApiClientHeader="testClientHeader"
        expanded={false}
        onPermalinkClick={() => {}}
    />
);
LoggedIn.story = { name: 'when signed in' };
