import React from 'react';
import { createPortal } from 'react-dom';

import { MostViewed } from '@frontend/web/components/MostViewed/MostViewed';

export const MostViewedPortal = ({
    CAPI,
    config,
}: {
    CAPI: CAPIType;
    config: ConfigType;
}): React.ReactPortal | null => {
    const mostViewedRoot = document.getElementById('most-viewed-portal');
    if (!mostViewedRoot) {
        return null;
    }
    return createPortal(
        <MostViewed
            sectionName={CAPI.sectionName}
            config={config}
            pillar={CAPI.pillar}
        />,
        mostViewedRoot,
    );
};
