import React from 'react';

import { unescapeData } from '@root/src/lib/escapeData';
import { css } from 'emotion';

const widthOverride = css`
    iframe {
        /* Some embeds can hijack the iframe and calculate an incorrect width, which pushes the body out */
        width: 100% !important;
    }
`;

export const EmbedBlockComponent: React.FC<{
    element: EmbedBlockElement;
}> = ({ element }) => {
    return (
        <div className={widthOverride}>
            <div
                dangerouslySetInnerHTML={{ __html: unescapeData(element.html) }}
            />
            <div>{element.alt}</div>
        </div>
    );
};
