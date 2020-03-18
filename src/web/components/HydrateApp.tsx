import React from 'react';
import ReactDOM from 'react-dom';
import { loadableReady } from '@loadable/component'

import { App } from '@root/src/web/components/App';

type Props = {
    CAPI: CAPIBrowserType;
    NAV: NavType;
};

// https://loadable-components.com/docs/server-side-rendering/
// Loadable components loads all your scripts asynchronously to ensure optimal performances.
// All scripts are loaded in parallel, so you have to wait for them to be ready using loadableReady.
export const HydrateApp = ({ CAPI, NAV }: Props) => {
    loadableReady(() => {
        ReactDOM.render(
            <App CAPI={CAPI} NAV={NAV} />,
            document.getElementById('react-root'),
        );
    })
};
