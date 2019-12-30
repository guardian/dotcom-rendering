import React from 'react';

import CAPI from './__mocks__/CAPI.json';
import NAV from './__mocks__/NAV.json';

import { StandardLayout } from './StandardLayout';
import { ShowcaseLayout } from './ShowcaseLayout';

/* tslint:disable */
export default {
    component: StandardLayout,
    title: 'Layouts/Standard',
};
/* tslint:enable */

export const Standard = () => (
    <StandardLayout CAPI={CAPI as CAPIType} NAV={NAV as NavType} />
);
Standard.story = { name: 'Standard' };

export const Showcase = () => (
    // @ts-ignore
    <ShowcaseLayout CAPI={CAPI as CAPIType} NAV={NAV as NavType} />
);
Showcase.story = { name: 'Showcase' };
