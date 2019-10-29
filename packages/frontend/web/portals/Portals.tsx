import React from 'react';
import { render } from 'react-dom';

import { MostViewedPortal } from '@frontend/web/portals/MostViewedPortal';
import { ShareCountPortal } from '@frontend/web/portals/ShareCountPortal';
import { RichLinkPortals } from '@root/packages/frontend/web/portals/RichLinksPortals';
import { HeaderRevenueLinksPortal } from '@root/packages/frontend/web/portals/HeaderRevenueLinksPortal';
import { FooterRevenueLinksPortal } from '@root/packages/frontend/web/portals/FooterRevenueLinksPortal';

export const renderPortals = (CAPI: CAPIType, config: ConfigType) => {
    const portalRoot = document.getElementById('portalRoot');

    if (portalRoot) {
        render(
            <>
                <MostViewedPortal CAPI={CAPI} config={config} />
                <ShareCountPortal CAPI={CAPI} config={config} />
                <RichLinkPortals CAPI={CAPI} config={config} />
                <HeaderRevenueLinksPortal CAPI={CAPI} />
                <FooterRevenueLinksPortal CAPI={CAPI} />
            </>,
            portalRoot,
        );
    }
};
