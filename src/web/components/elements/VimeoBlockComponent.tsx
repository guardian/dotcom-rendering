import React from 'react';
import { css } from 'emotion';
// import { border } from '@guardian/src-foundations/palette';
// import { body } from '@guardian/src-foundations/typography';
import { Caption } from '@root/src/web/components/Caption';

const widthOverride = css`
    width: 100%;
    max-width: 1800px;
`;

const inner = css`
    width: 100%;
    position: relative;

    iframe {
        width: 100%;
        height: 400px;
    }
`;
export const VimeoBlockComponent: React.FC<{
    pillar: Pillar;
    url: string;
    height: number;
    width: number;
    caption: string;
    credit: string;
    title: string;
}> = ({ url, caption, title, pillar }) => {
    return (
        <div className={widthOverride}>
            <div className={inner}>
                <iframe src={url} title={title} />
            </div>
            {caption && (
                <Caption
                    captionText={caption}
                    pillar={pillar}
                    display="standard"
                />
            )}
        </div>
    );
};
