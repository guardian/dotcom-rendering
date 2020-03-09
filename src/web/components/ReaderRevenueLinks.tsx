import React, { useState, useEffect } from 'react';
import { css, cx } from 'emotion';

import ArrowRightIcon from '@frontend/static/icons/arrow-right.svg';
import { palette } from '@guardian/src-foundations';
import { brandText } from '@guardian/src-foundations/palette';
import { textSans, headline } from '@guardian/src-foundations/typography';
import { from, until } from '@guardian/src-foundations/mq';

import { getCookie } from '@root/src/web/browser/cookie';

type Props = {
    edition: Edition;
    urls: {
        subscribe: string;
        support: string;
        contribute: string;
    };
    dataLinkNamePrefix: string;
    noResponsive: boolean;
    inHeader?: boolean;
};

const paddingStyles = css`
    ${until.mobileLandscape} {
        padding-left: 10px;
    }
    ${until.tablet} {
        padding-top: 33px;
    }
    ${from.mobileLandscape} {
        padding-left: 20px;
    }
`;

const messageStyles = css`
    color: ${palette.brandYellow.main};
    ${headline.xxsmall({ fontWeight: 'bold' })};
    padding-top: 3px;
    margin-bottom: 3px;

    ${from.desktop} {
        ${headline.xsmall({ fontWeight: 'bold' })}
    }

    ${from.leftCol} {
        ${headline.medium({ fontWeight: 'bold' })}
    }
`;

const linkStyles = css`
    background: ${palette.brandYellow.main};
    border-radius: 16px;
    box-sizing: border-box;
    color: ${palette.neutral[7]};
    float: left;
    ${textSans.small()};
    font-weight: 700;
    height: 32px;
    text-decoration: none;
    padding: 6px 12px 0 12px;
    line-height: 18px;
    position: relative;
    margin-right: 10px;
    margin-bottom: 6px;

    ${from.mobileMedium} {
        padding-right: 34px;
    }

    svg {
        fill: currentColor;
        position: absolute;
        right: 3px;
        top: 50%;
        height: 32px;
        width: 32px;
        transform: translate(0, -50%);
        transition: transform 0.3s ease-in-out;

        ${until.mobileMedium} {
            display: none;
        }
    }

    :hover svg {
        transform: translate(3px, -50%);
    }
`;

const hidden = css`
    display: none;
`;

const hiddenUntilTablet = css`
    ${until.tablet} {
        display: none;
    }
`;

const hiddenFromTablet = css`
    ${from.tablet} {
        display: none;
    }
`;

const subMessageStyles = css`
    color: ${brandText.primary};
    ${textSans.medium()};
    margin-bottom: 5px;
`;

const decideIfRecentContributor: () => boolean = () => {
    const cookieValue = getCookie('gu.contributions.contrib-timestamp');

    if (!cookieValue) {
        return false;
    }

    const now = new Date().getTime();
    const lastContribution = new Date(cookieValue).getTime();
    const diffDays = Math.ceil((now - lastContribution) / (1000 * 3600 * 24));

    return diffDays <= 180;
};

export const ReaderRevenueLinks: React.FC<Props> = ({
    edition,
    urls,
    dataLinkNamePrefix,
    noResponsive,
    inHeader,
}) => {
    const [isPayingMember, setIsPayingMember] = useState<boolean>(false);
    const [isRecentContributor, setIsRecentContributor] = useState<boolean>(
        false,
    );

    useEffect(() => {
        // Is paying member?
        setIsPayingMember(getCookie('gu_paying_member') === 'true');
        // Is recent contributor?
        setIsRecentContributor(decideIfRecentContributor());
    }, []);

    if (!isPayingMember && !isRecentContributor) {
        return (
            <div className={cx(inHeader && paddingStyles)}>
                <div
                    className={cx({
                        [hiddenUntilTablet]: !noResponsive,
                    })}
                >
                    <div className={messageStyles}>
                        Support The&nbsp;Guardian
                    </div>
                    {edition === 'US' ? (
                        <div className={subMessageStyles}>
                            Support our journalism with a year-end gift
                        </div>
                    ) : (
                        <div className={subMessageStyles}>
                            Available for everyone, funded by readers
                        </div>
                    )}
                    <a
                        className={linkStyles}
                        href={urls.contribute}
                        data-link-name={`${dataLinkNamePrefix}contribute-cta`}
                    >
                        Contribute <ArrowRightIcon />
                    </a>
                    <a
                        className={linkStyles}
                        href={urls.subscribe}
                        data-link-name={`${dataLinkNamePrefix}subscribe-cta`}
                    >
                        Subscribe <ArrowRightIcon />
                    </a>
                </div>

                <div
                    className={cx({
                        [hiddenFromTablet]: !noResponsive,
                        [hidden]: noResponsive,
                    })}
                >
                    {edition === 'UK' ? (
                        <a
                            className={linkStyles}
                            href={urls.contribute}
                            data-link-name={`${dataLinkNamePrefix}contribute-cta`}
                        >
                            Contribute <ArrowRightIcon />
                        </a>
                    ) : (
                        <a
                            className={linkStyles}
                            href={urls.support}
                            data-link-name={`${dataLinkNamePrefix}support-cta`}
                        >
                            Support us <ArrowRightIcon />
                        </a>
                    )}
                </div>
            </div>
        );
    }
    return null;
};
