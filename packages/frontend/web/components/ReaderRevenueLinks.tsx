import React from 'react';
import { css, cx } from 'emotion';

import ArrowRightIcon from '@frontend/static/icons/arrow-right.svg';
import {
    tablet,
    desktop,
    mobileMedium,
    mobileLandscape,
    until,
    leftCol,
    textSans,
    headline,
    palette,
} from '@guardian/src-foundations';
import { getCookie } from '@frontend/web/browser/cookie';
import { AsyncClientComponent } from '@frontend/web/components/lib/AsyncClientComponent';

const padded = css`
    ${until.mobileLandscape} {
        padding-left: 10px;
    }
    ${until.tablet} {
        padding-top: 33px;
    }
    ${mobileLandscape} {
        padding-left: 20px;
    }
`;

const message = css`
    color: ${palette.yellow.main};
    ${headline({ level: 2 })};
    padding-top: 3px;
    margin-bottom: 3px;

    ${desktop} {
        ${headline({ level: 3 })}
    }

    ${leftCol} {
        ${headline({ level: 5 })}
    }
`;

const link = css`
    background: ${palette.yellow.main};
    border-radius: 16px;
    box-sizing: border-box;
    color: ${palette.neutral[7]};
    float: left;
    ${textSans({ level: 2 })};
    font-weight: 700;
    height: 32px;
    text-decoration: none;
    padding: 6px 12px 0 12px;
    line-height: 1;
    position: relative;
    margin-right: 10px;
    margin-bottom: 6px;

    ${mobileMedium} {
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
    ${tablet} {
        display: none;
    }
`;

const subMessage = css`
    color: ${palette.neutral[100]};
    ${textSans({ level: 3 })};
    margin-bottom: 9px;
`;

export const RRButton: React.FC<{
    url: string;
    dataLinkNamePrefix: string;
    dataLinkNameSuffix: string;
    linkText: string;
}> = ({ url, dataLinkNamePrefix, dataLinkNameSuffix, linkText }) => {
    return (
        <a
            className={link}
            href={url}
            data-link-name={`${dataLinkNamePrefix}${dataLinkNameSuffix}`}
        >
            {linkText} <ArrowRightIcon />
        </a>
    );
};

export const ReaderRevenueLinks: React.FC<{
    edition: Edition;
    urls: {
        subscribe: string;
        support: string;
        contribute: string;
    };
    dataLinkNamePrefix: string;
    noResponsive: boolean;
    inHeader?: boolean;
}> = ({ edition, urls, dataLinkNamePrefix, noResponsive, inHeader }) => {
    return (
        <AsyncClientComponent f={shouldShow}>
            {({ data }) => (
                <>
                    {data && (
                        <div className={cx(inHeader && padded)}>
                            <div
                                className={cx({
                                    [hiddenUntilTablet]: !noResponsive,
                                })}
                            >
                                <div className={message}>
                                    Support The&nbsp;Guardian
                                </div>
                                <div className={subMessage}>
                                    Available for everyone, funded by readers
                                </div>
                                <RRButton
                                    url={urls.contribute}
                                    dataLinkNamePrefix={dataLinkNamePrefix}
                                    dataLinkNameSuffix={'contribute-cta'}
                                    linkText={'Contribute'}
                                />
                                <RRButton
                                    url={urls.subscribe}
                                    dataLinkNamePrefix={dataLinkNamePrefix}
                                    dataLinkNameSuffix={'subscribe-cta'}
                                    linkText={'Subscribe'}
                                />
                            </div>

                            <div
                                className={cx({
                                    [hiddenFromTablet]: !noResponsive,
                                    [hidden]: noResponsive,
                                })}
                            >
                                {edition === 'UK' ? (
                                    <RRButton
                                        url={urls.contribute}
                                        dataLinkNamePrefix={dataLinkNamePrefix}
                                        dataLinkNameSuffix={'contribute-cta'}
                                        linkText={'Contribute'}
                                    />
                                ) : (
                                    <RRButton
                                        url={urls.support}
                                        dataLinkNamePrefix={dataLinkNamePrefix}
                                        dataLinkNameSuffix={'support-cta'}
                                        linkText={'Support us'}
                                    />
                                )}
                            </div>
                        </div>
                    )}
                </>
            )}
        </AsyncClientComponent>
    );
};

const shouldShow: () => Promise<boolean> = () =>
    Promise.resolve(!(isRecentContributor() || isPayingMember()));

const isRecentContributor: () => boolean = () => {
    const value = getCookie('gu.contributions.contrib-timestamp');

    if (!value) {
        return false;
    }

    const now = new Date().getTime();
    const lastContribution = new Date(value).getTime();
    const diffDays = Math.ceil((now - lastContribution) / (1000 * 3600 * 24));

    return diffDays <= 180;
};

const isPayingMember: () => boolean = () => {
    return getCookie('gu_paying_member') === 'true';
};
