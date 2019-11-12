import React from 'react';
import { css } from 'emotion';
import { palette } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';

const badgeWrapper = css`
    float: left;
    background-color: ${palette.neutral[100]};
`;

const badgeImg = css`
    display: block;
    width: auto;
    height: 42px;
    ${from.wide} {
        height: 54px;
    }
`;

const badgeLink = css`
    text-decoration: none;
`;

type Props = {
    altText: string;
    imgSrc: string;
    linkTo?: string;
};

export const Badge = ({ altText, imgSrc, linkTo }: Props) => {
    if (linkTo) {
        return (
            <div className={badgeWrapper}>
                <a href={linkTo} className={badgeLink}>
                    <img src={imgSrc} alt={altText} className={badgeImg} />
                </a>
            </div>
        );
    }

    return (
        <div className={badgeWrapper}>
            <img src={imgSrc} alt={altText} className={badgeImg} />
        </div>
    );
};
