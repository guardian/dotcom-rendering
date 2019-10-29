import React from 'react';
import { createPortal } from 'react-dom';

import { ShareCount } from '@frontend/web/components/ShareCount';

export const ShareCountPortal = ({
    CAPI,
    config,
}: {
    CAPI: CAPIType;
    config: ConfigType;
}): React.ReactPortal | null => {
    const ShareCountRoot = document.getElementById('share-count-portal');
    if (!ShareCountRoot) {
        return null;
    }
    return createPortal(
        <ShareCount config={config} pageId={CAPI.pageId} />,
        ShareCountRoot,
    );
};
