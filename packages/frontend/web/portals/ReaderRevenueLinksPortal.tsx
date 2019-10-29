import React from 'react';
import { createPortal } from 'react-dom';

import { ReaderRevenueLinks } from '@frontend/web/components/ReaderRevenueLinks';

export const ReaderRevenueLinksPortal = ({
    CAPI,
}: {
    CAPI: CAPIType;
}): React.ReactPortal | null => {
    const ReaderRevenueLinksRoot = document.getElementById(
        'reader-revenue-links-portal',
    );
    if (!ReaderRevenueLinksRoot) {
        return null;
    }
    return createPortal(
        <ReaderRevenueLinks
            urls={CAPI.nav.readerRevenueLinks.header}
            edition={CAPI.editionId}
            dataLinkNamePrefix={'nav2 : '}
            noResponsive={false}
        />,
        ReaderRevenueLinksRoot,
    );
};
