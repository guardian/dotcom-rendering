import React from 'react';
import ReactDOM from 'react-dom';

import { App } from '@root/src/web/components/App';

type Props = {
    CAPI: CAPIBrowserType;
    NAV: NavType;
};

export const HydrateApp = ({ CAPI, NAV }: Props) => {
    ReactDOM.render(
        <App CAPI={CAPI} NAV={NAV} />,
        document.getElementById('react-root'),
    );
};
