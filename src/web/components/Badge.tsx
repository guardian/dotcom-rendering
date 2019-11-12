import React from 'react';
import { css, cx } from 'emotion';
import { from } from '@guardian/src-foundations/mq';

const badgeSizingStyles = css`
    height: 42px;
    ${from.leftCol} {
        height: 54px;
    }
`;

const badgeWrapper = css`
    float: left;
    ${badgeSizingStyles}
`;

const svgStyles = css`
    svg {
        display: block;
        width: auto;
        ${badgeSizingStyles}
    }
`;

const badgeLink = css`
    text-decoration: none;
`;

type Props = {
    svgSrc: () => JSX.Element;
    linkTo?: string;
};

export const Badge = ({ svgSrc: Svg, linkTo }: Props) => {
    if (linkTo) {
        return (
            <div className={badgeWrapper}>
                <a href={linkTo} className={cx(badgeLink, svgStyles)}>
                    <Svg />
                </a>
            </div>
        );
    }

    return (
        <div className={cx(badgeWrapper, svgStyles)}>
            <Svg />
        </div>
    );
};
