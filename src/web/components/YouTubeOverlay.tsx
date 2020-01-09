import React from 'react';
import { css } from 'emotion';

import { MediaMeta } from '@frontend/web/components/MediaMeta';

const BottomLeft = ({
    children,
}: {
    children: JSX.Element | JSX.Element[];
}) => (
    <div
        className={css`
            position: absolute;
            bottom: 12px;
            left: 12px;
        `}
    >
        {children}
    </div>
);

export const YouTubeOverlay = ({
    image,
    pillar,
    duration,
}: {
    image: string;
    pillar: Pillar;
    duration?: number;
}) => (
    <div
        className={css`
            background-image: url(${image});
            background-size: cover;
            background-position: 49% 49%;
            background-repeat: no-repeat;
            z-index: 0;
            text-align: center;
            height: 100%;
            width: 100%;
            position: absolute;
            max-height: 100vh;
            cursor: pointer;
        `}
    >
        <BottomLeft>
            <MediaMeta
                mediaType="Video"
                mediaDuration={duration}
                pillar={pillar}
            />
        </BottomLeft>
    </div>
);
