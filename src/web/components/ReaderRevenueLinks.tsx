import React, { useState, useEffect } from 'react';
import { css, cx } from 'emotion';

import ArrowRightIcon from '@frontend/static/icons/arrow-right.svg';
import {
    brandText,
    brandAlt,
    neutral,
} from '@guardian/src-foundations/palette';
import { textSans, headline } from '@guardian/src-foundations/typography';
import { from, until } from '@guardian/src-foundations/mq';

import { shouldHideSupportMessaging } from '@root/src/web/lib/contributions';
import {fetchTickerData, TickerCountType, TickerData} from "@root/src/lib/fetchTickerData";
import {addForMinutes, getCookie} from "@root/src/web/browser/cookie";

type Props = {
    edition: Edition;
    urls: {
        subscribe: string;
        support: string;
        contribute: string;
    };
    dataLinkNamePrefix: string;
    inHeader: boolean;
    enableAusMoment2020Header: boolean,
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
    color: ${brandAlt[400]};
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
    background: ${brandAlt[400]};
    border-radius: 16px;
    box-sizing: border-box;
    color: ${neutral[7]};
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

const headerYellowHighlight = css`
    color: ${brandAlt[400]};
    font-weight: 700;
`;

const AUS_MOMENT_SUPPORTER_COUNT_COOKIE_NAME = 'gu_aus_moment_supporter_count';

export const ReaderRevenueLinks: React.FC<Props> = ({
    edition,
    urls,
    dataLinkNamePrefix,
    inHeader,
    enableAusMoment2020Header,
}) => {
    const [numberOfSupporters, setnumberOfSupporters] = useState<string>(
        '',
    );
    const showAusMomentHeader = edition === 'AU' && enableAusMoment2020Header;

    useEffect(() => {
        if (showAusMomentHeader) {
            const cookieValue = getCookie(AUS_MOMENT_SUPPORTER_COUNT_COOKIE_NAME);

            if (cookieValue) {
                setnumberOfSupporters(cookieValue.toLocaleString())
            } else {
                fetchTickerData(TickerCountType.people)
                    .then((td: TickerData) => {
                        addForMinutes(AUS_MOMENT_SUPPORTER_COUNT_COOKIE_NAME, `${td.total}`, 60);
                        setnumberOfSupporters(td.total.toLocaleString())
                    });
            }
        }
    }, [showAusMomentHeader]);

    if (shouldHideSupportMessaging()) {
        if (showAusMomentHeader) {
            return (
                <div className={cx(inHeader && paddingStyles)}>
                    <div
                        className={cx({
                            [hiddenUntilTablet]: inHeader,
                        })}
                    >
                        <div className={messageStyles}>Welcome back</div>

                        <div className={subMessageStyles}>
                            We&apos;re funded by
                            <span className={headerYellowHighlight}>
                                {` ${numberOfSupporters} `}
                            </span>
                            readers across Australia.<br />
                            Thank you for supporting us
                        </div>
                    </div>
                </div>
            )
        } 
            return null
        
    }
    return (
        <div className={cx(inHeader && paddingStyles)}>
            <div
                className={cx({
                [hiddenUntilTablet]: inHeader,
            })}
            >
                <div className={messageStyles}>Support The&nbsp;Guardian</div>
                <div className={subMessageStyles}>
                    { showAusMomentHeader ?
                        (
                            <div>
                                We&apos;re funded by
                                <span className={headerYellowHighlight}>
                                    {` ${numberOfSupporters} `}
                                </span>
                                readers across Australia.
                            </div>
)
                        : (<div> Available for everyone, funded by readers</div>)}
                </div>
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
                    [hiddenFromTablet]: inHeader,
                    [hidden]: !inHeader,
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
    )

};
