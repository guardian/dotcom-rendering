import React from 'react';

import { CAPI } from '@root/fixtures/CAPI';
import { NAV } from '@root/fixtures/NAV';

import { ShowcaseLayout } from './ShowcaseLayout';
import { StandardLayout } from './StandardLayout';

/* tslint:disable */
export default {
    title: 'Components/Layouts',
};
/* tslint:enable */

export const ShowcaseLayoutRender = () => (
    <ShowcaseLayout CAPI={CAPI} NAV={NAV} />
);

export const StandardLayoutRender = () => (
    <StandardLayout CAPI={CAPI} NAV={NAV} />
);
