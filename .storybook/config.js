import { configure, addParameters, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';

import { defaults } from './default-css';

import 'reset-css';

// Add base css for the site
// let css = `${getFontsCss()}${defaults}`;
let head = document.getElementsByTagName('head')[0];
let style = document.createElement('style');
head.appendChild(style);
style.type = 'text/css';
style.appendChild(document.createTextNode(defaults));

addDecorator(withA11y);

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

addParameters({
    viewport: {
        viewports: guardianViewports,
        defaultViewport: 'wide',
    },
});

// automatically import all files ending in *.stories.tsx
configure(require.context('../', true, /\.stories\.tsx?$/), module);
