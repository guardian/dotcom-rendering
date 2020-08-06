import React from 'react';
import { css } from 'emotion';
import { unescapeData } from '@root/src/lib/escapeData';

const widthOverride = css`
    iframe {
        /* The  embed js hijacks the iframe and calculated an incorrect width, which pushed the body out */
        width: 100%;
    }
`;

export const SpotifyBlockComponent: React.FC<{
    element: SpotifyBlockElement;
}> = ({ element }) => {
    return (
        <div className={widthOverride}>
            <div
                data-cy="spotify-embed"
                dangerouslySetInnerHTML={{ __html: unescapeData(element.html) }}
            />
        </div>
    );
};
