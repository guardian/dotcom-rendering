import { configure, addDecorator, addParameters } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';

// automatically import all files ending in *.stories.tsx
const reqGuui = require.context(
    '@guardian/guui/components/',
    true,
    /\.stories\.tsx$/,
);

const reqDC = require.context(
    '@guardian/frontend-rendering/web/components/',
    true,
    /\.stories\.tsx$/,
);

const viewportOptions = {
    /**
     * name to display in the dropdown
     * @type {String}
     */
    name: 'Responsive',

    /**
     * Inline styles to be applied to the story (iframe).
     * styles is an object whose key is the camelCased version of the style name, and whose
     * value is the style’s value, usually a string
     * @type {Object}
     */
    styles: {
        width: '100%',
        height: '100%',
    },

    /**
     * type of the device (e.g. desktop, mobile, or tablet)
     * @type {String}
     */
    type: 'desktop',
};

function loadStories() {
    reqGuui.keys().forEach(reqGuui);
    reqDC.keys().forEach(reqDC);
}

addDecorator(withA11y);
addParameters({ viewport: viewportOptions });

configure(loadStories, module);
