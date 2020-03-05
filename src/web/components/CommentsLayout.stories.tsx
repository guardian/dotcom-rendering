import React from 'react';

import { CommentsLayout } from './CommentsLayout';

/* tslint:disable */
export default {
    component: CommentsLayout,
    title: 'Components/CommentsLayout',
};
/* tslint:enable */

export const Default = () => <CommentsLayout commentCount={345} />;
Default.story = { name: 'default' };
