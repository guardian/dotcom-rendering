import React, { useEffect } from 'react';
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
import { useAB } from '@guardian/ab-react';
import {addTrackingCodesToUrl} from "@root/src/web/lib/acquisitions";
import {
    GlobalEoyHeaderTestName,
    GlobalEoyHeaderTestVariant
} from "@root/src/web/experiments/tests/global-eoy-header-test";
import {sendOphanComponentEvent} from "@root/src/web/browser/ophan/ophan";

type Props = {
    edition: Edition;
    urls: {
        subscribe: string;
        support: string;
        contribute: string;
    };
    dataLinkNamePrefix: string;
    inHeader: boolean;
    pageViewId: string;
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
    margin: 5px 0;
`;

const month = new Date().getMonth() + 1;    // js date month begins at 0

export const ReaderRevenueLinks: React.FC<Props> = ({
    edition,
    urls,
    dataLinkNamePrefix,
    inHeader,
    pageViewId,
}) => {
    const ABTestAPI = useAB();

    const getTestVariant = (): GlobalEoyHeaderTestVariant => {
        if (inHeader && edition !== 'US') {
            if (ABTestAPI.isUserInVariant(
                GlobalEoyHeaderTestName,
                'control',
            )) {
                return 'control';
            }
            if (ABTestAPI.isUserInVariant(
                GlobalEoyHeaderTestName,
                'variant',
            )) {
                return 'variant';
            }
        }
        return 'notintest'
    };

    const variantName: GlobalEoyHeaderTestVariant = getTestVariant();

    useEffect(() => {
        if (variantName !== 'notintest') {
            sendOphanComponentEvent('VIEW', {
                abTestName: GlobalEoyHeaderTestName,
                abTestVariant: variantName,
                campaignCode: 'header_support',
                componentType: 'ACQUISITIONS_HEADER',
            });
        }
    }, [variantName]);

    const getHeading = (): string | JSX.Element => {
        if (variantName === 'variant') return month === 12 ? `Support us this December` : 'Support us for 2021';
        return <span>Support The&nbsp;Guardian</span>;
    };

    const subheading = variantName === 'variant' ?
        'Power vital, open, independent journalism' :
        'Available for everyone, funded by readers';

    const getUrl = (rrType: 'contribute' | 'subscribe'): string => {
        if (variantName !== 'notintest') {
            return addTrackingCodesToUrl({
                base: `https://support.theguardian.com/${rrType}`,
                componentType: 'ACQUISITIONS_HEADER',
                componentId: 'header_support',
                campaignCode: 'header_support',
                abTest: {
                    name: GlobalEoyHeaderTestName,
                    variant: variantName,
                },
                pageViewId,
                referrerUrl: window.location.origin + window.location.pathname,
            });
        }
        // Use the normal url
        return urls[rrType];
    };

    if (shouldHideSupportMessaging()) {
        return null;
    }
    return (
        <div className={cx(inHeader && paddingStyles)}>
            <div
                className={cx({
                    [hiddenUntilTablet]: inHeader,
                })}
            >
                <div className={messageStyles}>{getHeading()}</div>
                <div className={subMessageStyles}>
                    <div> {subheading} </div>
                </div>
                <a
                    className={linkStyles}
                    href={getUrl('contribute')}
                    data-link-name={`${dataLinkNamePrefix}contribute-cta`}
                >
                    Contribute <ArrowRightIcon />
                </a>
                <a
                    className={linkStyles}
                    href={getUrl('subscribe')}
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
                        href={getUrl('subscribe')}
                        data-link-name={`${dataLinkNamePrefix}contribute-cta`}
                    >
                        Subscribe <ArrowRightIcon />
                    </a>
                ) : (
                    <a
                        className={linkStyles}
                        href={getUrl('contribute')}
                        data-link-name={`${dataLinkNamePrefix}support-cta`}
                    >
                        Contribute <ArrowRightIcon />
                    </a>
                )}
            </div>
        </div>
    );
};
