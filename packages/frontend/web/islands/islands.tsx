import React from 'react';
import { hydrate } from 'react-dom';

import { EditionDropdown } from '@frontend/web/components/Header/EditionDropdown';
import { Nav } from '@frontend/web/components/Nav/Nav';

export const hydrateIslands = (
    CAPI: CAPIType,
    config: ConfigType,
    NAV: NavType,
) => {
    const { pillar } = CAPI;
    const navRoot = document.getElementById('nav-root');
    if (navRoot) {
        hydrate(React.createElement(Nav, { pillar, nav: NAV }), navRoot);
    }

    const { editionId } = CAPI;
    const dataLinkName = 'nav2 : topbar : edition-picker: toggle';
    const editionRoot = document.getElementById('edition-root');
    if (editionRoot) {
        hydrate(
            React.createElement(EditionDropdown, {
                dataLinkName,
                edition: editionId,
            }),
            editionRoot,
        );
    }
};
