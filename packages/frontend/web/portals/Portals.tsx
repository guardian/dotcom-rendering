import React from 'react';
import { render } from 'react-dom';

import { MostViewedPortal } from '@frontend/web/portals/MostViewedPortal';
import { EditionDropdownPortal } from '@frontend/web/portals/EditionDropdownPortal';
import { ShareCountPortal } from '@frontend/web/portals/ShareCountPortal';
import { RichLinkPortals } from '@root/packages/frontend/web/portals/RichLinksPortals';
import { ReaderRevenueLinksPortal } from '@frontend/web/portals/ReaderRevenueLinksPortal';

export const renderPortals = (CAPI: CAPIType, config: ConfigType) => {
    const portalRoot = document.getElementById('portalRoot');

    if (portalRoot) {
        render(
            <>
                <MostViewedPortal CAPI={CAPI} config={config} />
                <EditionDropdownPortal CAPI={CAPI} />
                <ShareCountPortal CAPI={CAPI} config={config} />
                <RichLinkPortals CAPI={CAPI} config={config} />
                <ReaderRevenueLinksPortal CAPI={CAPI} />
            </>,
            portalRoot,
        );
    }
};
