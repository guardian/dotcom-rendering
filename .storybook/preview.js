// .storybook/preview.js

import { breakpoints } from '@guardian/src-foundations';


const customViewports = {
    desktop: {
      name: 'Desktop',
      styles: {
        width: breakpoints.desktop,
        height: '963px',
        },
    },    
    tablet: {
      name: 'Tablet',
      styles: {
        width: breakpoints.tablet,
        height: '963px',
        },
    },      
    phablet: {
      name: 'Phablet',
      styles: {
        width: breakpoints.phablet,
        height: '963px',
        },
    },    
    mobileLandscape: {
      name: 'Mobile Medium',
      styles: {
        width:  breakpoints.mobileLandscape,
        height: '963px',
        },
    },     mobileMedium: {
      name: 'Mobile Medium',
      styles: {
        width:  breakpoints.mobileMedium,
        height: '963px',
        },
    },    
    mobile: {
      name: "Mobile",
      styles: {
        width: breakpoints.mobile,
        height: '963px',
        },
    },
};

export const parameters = {
    layout: 'fullscreen',
    viewport: {
        viewports: {
            ...customViewports
        }
    },
};