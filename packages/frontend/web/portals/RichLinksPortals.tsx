import React from 'react';
import { createPortal } from 'react-dom';

import { RichLinkComponent } from '@frontend/web/components/elements/RichLinkComponent';

export const RichLinkPortals = ({
    CAPI,
    config,
}: {
    CAPI: CAPIType;
    config: ConfigType;
}): React.ReactPortal[] | any => {
    // Using any here because of https://github.com/DefinitelyTyped/DefinitelyTyped/issues/27805
    const portals: React.ReactPortal[] = [];
    const elements = CAPI.blocks[0] ? CAPI.blocks[0].elements : [];
    elements.forEach((element, i) => {
        if (
            element._type ===
            'model.dotcomrendering.pageElements.RichLinkBlockElement'
        ) {
            const richLinkRoot = document.getElementById(
                `rich-link-${i}-portal`,
            );
            if (!richLinkRoot) {
                return null;
            }
            portals.push(
                createPortal(
                    <RichLinkComponent
                        key={i}
                        element={element}
                        pillar={CAPI.pillar}
                        ajaxEndpoint={config.ajaxUrl}
                    />,
                    richLinkRoot,
                ),
            );
        }
    });

    return portals;
};
