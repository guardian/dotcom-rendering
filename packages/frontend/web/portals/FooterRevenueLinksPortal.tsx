import React from 'react';
import { createPortal } from 'react-dom';

import { ReaderRevenueLinks } from '@frontend/web/components/ReaderRevenueLinks';

export const FooterRevenueLinksPortal = ({
    CAPI,
}: {
    CAPI: CAPIType;
}): React.ReactPortal | null => {
    const ReaderRevenueLinksRoot = document.getElementById(
        'reader-revenue-links-footer-portal',
    );
    if (!ReaderRevenueLinksRoot) {
        return null;
    }
    return createPortal(
        <ReaderRevenueLinks
            urls={CAPI.nav.readerRevenueLinks.footer}
            edition={CAPI.editionId}
            dataLinkNamePrefix={'footer : '}
            noResponsive={true}
            inHeader={false}
        />,
        ReaderRevenueLinksRoot,
    );
};
