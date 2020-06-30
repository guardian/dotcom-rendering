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

import { getCookie } from '@root/src/web/browser/cookie';
import {fetchTickerDataCached} from "@root/src/lib/fetchTickerData";
import {TickerCountType} from "@root/src/lib/variants";

import highlight = Mocha.utils.highlight;
import {CAPI} from "@root/fixtures/CAPI/CAPI";

type Props = {
    edition: Edition;
    urls: {
        subscribe: string;
        support: string;
        contribute: string;
    };
    dataLinkNamePrefix: string;
    inHeader: boolean;
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
    color: #ffe500;
    font-weight: 700;
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
    inHeader,
}) => {
    const [isDigitalSubscriber, setIsDigitalSubscriber] = useState<boolean>(
        false,
    );
    const [hideSupportMessage, setShouldHideSupportMessage] = useState<boolean>(
        false,
    );

    const [isPayingMember, setIsPayingMember] = useState<boolean>(false);

    const [isRecentContributor, setIsRecentContributor] = useState<boolean>(
        false,
    );

    const [numberOfSupporters, setnumberOfSupporters] = useState<string>(
        '',
    );

    useEffect(() => {
        // Is paying member?
        setIsPayingMember(getCookie('gu_paying_member') === 'true');

        // Should the support messages be shown
        setShouldHideSupportMessage(
            getCookie('gu_hide_support_messaging') === 'true',
        );

        // Is recent contributor?
        setIsRecentContributor(decideIfRecentContributor());

        fetchTickerDataCached(TickerCountType.people).then(td => setnumberOfSupporters(td.total.toLocaleString()));

        // Is digital subscriber?
        setIsDigitalSubscriber(getCookie('gu_digital_subscriber') === 'true');
    }, []);

    /*
        Changed to OR statement as it's likely that at least one will will be false.
        Default response is to show the banners
    */
    if (
        isDigitalSubscriber ||
        isPayingMember ||
        isRecentContributor ||
        hideSupportMessage
    ) {
        <div className={subMessageStyles}>
            { edition === 'UK' ?
                (
                    <div>
                        We're funded by
                        <span className={headerYellowHighlight}>
                            {` ${numberOfSupporters} `}
                        </span>
                        readers across Australia.<br />
                        Thank you for supporting us
                    </div>
                )
                : null}
        </div>
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
                    {edition === 'AU' && CAPI.config.switches.ausMomentEnabled ?
                        (
                            <div>
                                We're funded by
                                <span className={headerYellowHighlight}>
                                    {` ${numberOfSupporters} `}
                                </span>
                                    readers across Australia.<br />
                                Thank you for supporting us
                            </div>
                        )
                        : ( <div>  Available for everyone, funded by readers</div>)}
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
                {edition === 'AU' && CAPI.config.switches.ausMomentEnabled ? (
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
};
