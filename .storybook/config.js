import isChromatic from 'chromatic/isChromatic';

import fetchMock from 'fetch-mock';
import { configure, addParameters } from '@storybook/react';

import { sharecount } from '@root/fixtures/article';
import { commentCount } from '@root/fixtures/commentCounts';

import { defaults } from './default-css';

import 'reset-css';

import { Lazy } from '@root/src/web/components/Lazy';
import { Picture } from '@root/src/web/components/Picture';

// Prevent components being lazy rendered when we're taking Chromatic snapshots
Lazy.disabled = isChromatic();
Picture.disableLazyLoading = isChromatic();

// Add base css for the site
// let css = `${getFontsCss()}${defaults}`;
let head = document.getElementsByTagName('head')[0];
let style = document.createElement('style');
head.appendChild(style);
style.type = 'text/css';
style.appendChild(document.createTextNode(defaults));

const guardianViewports = {
    mobileMedium: {
        name: 'mobileMedium',
        styles: {
            width: '375px',
            height: '800px',
        },
    },
    mobileLandscape: {
        name: 'mobileLandscape',
        styles: {
            width: '480px',
            height: '800px',
        },
    },
    phablet: {
        name: 'phablet',
        styles: {
            width: '660px',
            height: '800px',
        },
    },
    tablet: {
        name: 'tablet',
        styles: {
            width: '740px',
            height: '800px',
        },
    },
    desktop: {
        name: 'desktop',
        styles: {
            width: '980px',
            height: '800px',
        },
    },
    leftCol: {
        name: 'leftCol',
        styles: {
            width: '1140px',
            height: '800px',
        },
    },
    wide: {
        name: 'wide',
        styles: {
            width: '1300px',
            height: '800px',
        },
    },
};

export const viewports = [375, 480, 660, 740, 980, 1140, 1300];

fetchMock
    .restore()
    // Comment count
    .get(
        'begin:https://api.nextgen.guardianapps.co.uk/discussion/comment-counts.json?shortUrls=',
        {
            status: 200,
            body: commentCount,
        },
        {
            overwriteRoutes: false,
        },
    )
    // Share count
    .get(
        'begin:https://api.nextgen.guardianapps.co.uk/sharecount/',
        {
            status: 200,
            body: sharecount,
        },
        {
            overwriteRoutes: false,
        },
    );

addParameters({
    viewport: {
        viewports: guardianViewports,
        defaultViewport: 'wide',
    },
});

// automatically import all files ending in *.stories.tsx
configure(require.context('../', true, /\.stories\.tsx?$/), module);
