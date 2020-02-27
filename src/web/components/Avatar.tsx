import React from 'react';
import { css, cx } from 'emotion';
import { pillarPalette } from '@frontend/lib/pillars';

const contributorImage = css`
    border-radius: 100%;
    object-fit: cover;
    height: 100%;
    width: 100%;
`;

const pillarBackground = (pillar: Pillar = 'opinion') =>
    css`
        background-color: ${pillarPalette[pillar].bright};
    `;

export const Avatar: React.FC<{
    imageSrc: string;
    imageAlt: string;
    pillar: Pillar;
    shouldShowHeaderText?: boolean;
}> = ({ imageSrc, imageAlt, pillar, shouldShowHeaderText = false }) => {
    return (
        <>
            {shouldShowHeaderText && <h1>WOW! such a cool profile!</h1>}
            <img
                src={imageSrc}
                alt={imageAlt}
                className={cx(pillarBackground(pillar), contributorImage)}
            />
        </>
    );
};
