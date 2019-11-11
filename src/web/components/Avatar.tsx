import React from 'react';
import { css, cx } from 'emotion';
import { from } from '@guardian/src-foundations/mq';

const contributorImage = css`
    border-radius: 100%;
    object-fit: cover;
`;

const contributorImageWrapper = css`
    width: 5rem;
    height: 5rem;
    margin-left: auto;
    margin-right: 0.3rem;
    ${from.wide} {
        width: 8.5rem;
        height: 8.5rem;
    }

    /* TODO remove the default img styling in ArticleBody.tsx - do we need direct element styling? */
    img {
        width: 100%;
        height: 100%;
    }
`;

const pillarBackground: (pillarColour: string) => string = pillarColour => css`
    background-color: ${pillarColour};
`;

export const Avatar: React.FC<{
    imageSrc: string;
    imageAlt: string;
    pillarColour: string;
}> = ({ imageSrc, imageAlt, pillarColour }) => {
    return (
        <div className={contributorImageWrapper}>
            <img
                src={imageSrc}
                alt={imageAlt}
                className={cx(pillarBackground(pillarColour), contributorImage)}
            />
        </div>
    );
};
