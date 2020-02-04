import React from 'react';
import { css } from 'emotion';

import { palette } from '@guardian/src-foundations';
import { headline } from '@guardian/src-foundations/typography';
import { until } from '@guardian/src-foundations/mq';
import { BigNumber } from '@root/src/web/components/BigNumber/BigNumber';
import { AgeWarning } from '@root/src/web/components/AgeWarning';

import { LinkHeadline } from '@root/src/web/components/LinkHeadline';

const gridItem = (position: number) => css`
    position: relative;

    ${until.leftCol} {
        /* Below leftCol always set top border */
        border-top: 1px solid ${palette.neutral[86]};
    }
    /* Above leftCol, don't apply a top border on the 1st and 6th
       items to prevent double borders */
    border-top: ${position !== 1 &&
        position !== 6 &&
        `1px solid ${palette.neutral[86]}`};

    /* The left border is set on the container */
    border-right: 1px solid ${palette.neutral[86]};
    min-height: 3.25rem;

    &:hover {
        cursor: pointer;
    }

    &:hover,
    :focus {
        background: ${palette.neutral[97]};
    }
`;

const bigNumber = css`
    position: absolute;
    top: 0.375rem;
    left: 0.625rem;
    fill: ${palette.neutral[7]};
`;

const headlineHeader = css`
    padding: 0.1875rem 0.625rem 1.125rem 4.6875rem;
    word-wrap: break-word;
    overflow: hidden;
`;

const headlineLink = css`
    text-decoration: none;
    color: ${palette.neutral[7]};
    font-weight: 500;
    ${headline.xxxsmall()};
`;

const ageWarningStyles = css`
    padding-left: 4.6875rem;
    margin-top: -16px;
    margin-bottom: 16px;
`;

type Props = {
    trail: TrailType;
    position: number;
};

export const MostViewedFooterItem = ({ trail, position }: Props) => (
    <li className={gridItem(position)} data-link-name={`${position} | text`}>
        {/* tslint:disable-next-line:react-a11y-anchors */}
        <a className={headlineLink} href={trail.url} data-link-name="article">
            <span className={bigNumber}>
                <BigNumber index={position} />
            </span>
            <div className={headlineHeader}>
                {trail.isLiveBlog ? (
                    <LinkHeadline
                        designType={trail.designType}
                        headlineText={trail.headline}
                        pillar={trail.pillar}
                        size="small"
                        kickerText="Live"
                        showSlash={true}
                        showPulsingDot={true}
                        showQuotes={trail.designType === 'Comment'}
                    />
                ) : (
                    <LinkHeadline
                        designType={trail.designType}
                        headlineText={trail.headline}
                        pillar={trail.pillar}
                        size="small"
                        showQuotes={trail.designType === 'Comment'}
                    />
                )}
            </div>
            {trail.ageWarning && (
                <div className={ageWarningStyles}>
                    <AgeWarning age={trail.ageWarning} size="small" />
                </div>
            )}
        </a>
    </li>
);
