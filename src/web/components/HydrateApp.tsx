import React from 'react';
import ReactDOM from 'react-dom';

import { App } from '@root/src/web/components/App';

export const HydrateApp = ({ CAPI, NAV }: { CAPI: CAPIType; NAV: NavType }) => {
    ReactDOM.render(
        <App CAPI={CAPI} NAV={NAV} />,
        document.getElementById('react-root'),
    );
};
