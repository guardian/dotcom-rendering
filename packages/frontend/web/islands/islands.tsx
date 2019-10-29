import React from 'react';
import { hydrate } from 'react-dom';

import { Nav } from '@frontend/web/components/Nav/Nav';

export const hydrateIslands = (
    CAPI: CAPIType,
    config: ConfigType,
    NAV: NavType,
) => {
    const navRoot = document.getElementById('nav-root');

    const { pillar } = CAPI;

    if (navRoot) {
        hydrate(React.createElement(Nav, { pillar, nav: NAV }), navRoot);
    }
};
