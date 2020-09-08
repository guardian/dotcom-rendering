/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { css } from 'emotion';
import { unescapeData } from '@root/src/lib/escapeData';
import { Caption } from '@root/src/web/components/Caption';
import { Display } from '@root/src/lib/display';

export const GuVideoBlockComponent: React.FC<{
    html: string;
    pillar: Pillar;
    designType: DesignType;
    display: Display;
    credit: string;
    caption?: string;
}> = ({ html, pillar, designType, display, credit, caption }) => {
    return (
        <div
            className={css`
                width: 100%;
                video {
                    width: 100%;
                }
            `}
        >
            <div dangerouslySetInnerHTML={{ __html: unescapeData(html) }} />

            {caption && (
                <Caption
                    captionText={caption}
                    designType={designType}
                    pillar={pillar}
                    credit={credit}
                    display={display}
                />
            )}
        </div>
    );
};
