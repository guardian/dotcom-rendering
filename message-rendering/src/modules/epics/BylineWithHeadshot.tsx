import React from 'react';
import { css } from '@emotion/react';
import { body } from '@guardian/src-foundations/typography';
import { BylineWithImage } from '../sdcShared/types';

interface BylineWithHeadshotProps {
    bylineWithImage: BylineWithImage;
}

const bylineWithImageContainer = css`
    margin: 0;
    padding: 0;
    position: relative;
    width: 100%;
    height: 130px;
`;

const bylineCopyContainer = css`
    width: 70%;
    position: absolute;
    bottom: 20px;
    left: 0;
`;

const bylineImageContainer = css`
    width: 30%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
`;

const bylineName = css`
    ${body.medium({ fontWeight: 'bold' })};
    margin: 0;
`;

const bylineDescription = css`
    ${body.medium({ fontStyle: 'italic' })};
    margin: 0;
`;

const bylineHeadshotImage = css`
    height: 100%;
    width: 100%;
    object-fit: cover;
`;

const bylineBottomDecoration = css`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-repeat: repeat-x;
    background-position: top;
    background-size: 1px calc(0.25rem * 4 + 1px);
    height: calc(0.25rem * 4 + 1px);
    background-image: repeating-linear-gradient(
        to bottom,
        #dcdcdc,
        #dcdcdc 1px,
        transparent 1px,
        transparent 0.25rem
    );
`;

export const BylineWithHeadshot: React.FC<BylineWithHeadshotProps> = ({
    bylineWithImage,
}: BylineWithHeadshotProps) => {
    const { name, description, headshot } = bylineWithImage;
    const { mainUrl, altText } = headshot;
    return (
        <div css={bylineWithImageContainer}>
            <div css={bylineCopyContainer}>
                <p css={bylineName}>{name}</p>
                <p css={bylineDescription}>{description}</p>
            </div>
            <div css={bylineBottomDecoration}></div>
            <div css={bylineImageContainer}>
                <img src={mainUrl} alt={altText} css={bylineHeadshotImage} />
            </div>
        </div>
    );
};
