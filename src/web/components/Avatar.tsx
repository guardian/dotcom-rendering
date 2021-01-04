import React from 'react';
import { css, cx } from 'emotion';
import { pillarPalette } from '@frontend/lib/pillars';

const contributorImage = css`
    border-radius: 100%;
    object-fit: cover;
    height: 100%;
    width: 100%;
`;

const pillarBackground = (pillar: CAPIPillar = 'opinion') =>
    css`
        background-color: ${pillar === 'opinion'
            ? pillarPalette[pillar].main
            : pillarPalette[pillar].bright};
    `;

export const Avatar: React.FC<{
    imageSrc: string;
    imageAlt: string;
    pillar: CAPIPillar;
}> = ({ imageSrc, imageAlt, pillar }) => {
    return (
        <img
            src={imageSrc}
            alt={imageAlt}
            className={cx(pillarBackground(pillar), contributorImage)}
        />
    );
};
