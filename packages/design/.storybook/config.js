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
    name: 'Responsive',
    styles: {
        width: '100%',
        height: '100%',
    },
    type: 'desktop',
};

function loadStories() {
    reqGuui.keys().forEach(reqGuui);
    reqDC.keys().forEach(reqDC);
}

addDecorator(withA11y);
addParameters({ viewport: viewportOptions });

configure(loadStories, module);
