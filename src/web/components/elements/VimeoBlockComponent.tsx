import React from 'react';
import { unescapeData } from '@root/src/lib/escapeData';
import { css } from 'emotion';
// import { border } from '@guardian/src-foundations/palette';
// import { body } from '@guardian/src-foundations/typography';
import { Caption } from '@root/src/web/components/Caption';

const widthOverride = css`
    iframe {
        /* The instagram embed js hijacks the iframe and calculated an incorrect width, which pushed the body out */
        max-width: 620px !important;
    }
`;
export const VimeoBlockComponent: React.FC<{
    element: VideoVimeoBlockElement;
    pillar: Pillar;
}> = ({ element, pillar }) => {
    return (
        <div>
            <div
                className={widthOverride}
                dangerouslySetInnerHTML={{ __html: unescapeData(element.html) }}
            />
            {element.caption && (
                <Caption
                    captionText={element.caption}
                    pillar={pillar}
                    display="standard"
                />
            )}
        </div>
    );
};
