import React from 'react';
import { css } from 'emotion';
import { Caption } from '@root/src/web/components/Caption';

const widthOverride = css`
    width: 100%;
`;

const inner = (maxWidth: number) => css`
    iframe {
        width: 100%;
        height: 400px;
    }
    max-width: ${maxWidth}px;
`;
export const VimeoBlockComponent: React.FC<{
    pillar: Pillar;
    url: string;
    height: number;
    width: number;
    caption: string;
    credit: string;
    title: string;
}> = ({ url, caption, title, pillar, width, height }) => {
    // maxHeight is a value copied from frontend, which is the full height on an iphone X
    const maxHeight = 812;
    const aspectRatio = width / height;
    const maxWidth = maxHeight * aspectRatio;

    return (
        <div className={widthOverride}>
            <div className={inner(maxWidth)}>
                <iframe src={url} title={title} height={height} width={width} />
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
