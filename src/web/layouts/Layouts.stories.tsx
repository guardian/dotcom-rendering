import React from 'react';
import fetchMock from 'fetch-mock';

import { CAPI } from '@root/fixtures/CAPI';
import { NAV } from '@root/fixtures/NAV';
import { mockTab1 } from '@root/fixtures/mostViewed';

import { hydrateIslands } from '@frontend/web/islands/islands';
import { ShowcaseLayout } from './ShowcaseLayout';
import { StandardLayout } from './StandardLayout';

/* tslint:disable */
export default {
    title: 'Components/Layouts',
    parameters: {
        chromatic: { delay: 600 },
    },
};
/* tslint:enable */

// In order to render React elements of the Layout we need to use hydrateIslands
// hydrateIslands requires a query selector therefore we need to wrap the function in a setTimeout
// Storybook runs only what is exported in the const, so we need to add the code in each export const
// setTimeout(() => hydrateIslands(CAPI, NAV));

export const ShowcaseLayoutRender = () => {
    fetchMock
        .restore()
        .getOnce(
            'https://api.nextgen.guardianapps.co.uk/most-read-geo.json?dcr=true',
            {
                status: 200,
                body: mockTab1,
            },
        );

    setTimeout(() => hydrateIslands(CAPI, NAV));
    return <ShowcaseLayout CAPI={CAPI} NAV={NAV} />;
};

export const StandardLayoutRender = () => {
    fetchMock
        .restore()
        .getOnce(
            'https://api.nextgen.guardianapps.co.uk/most-read-geo.json?dcr=true',
            {
                status: 200,
                body: mockTab1,
            },
        );

    setTimeout(() => hydrateIslands(CAPI, NAV));
    return <StandardLayout CAPI={CAPI} NAV={NAV} />;
};
