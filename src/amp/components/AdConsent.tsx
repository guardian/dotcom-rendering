import React from 'react';
import { css } from 'emotion';
import { palette, space } from '@guardian/src-foundations';
import { textSans, headline } from '@guardian/src-foundations/typography';
import { Button } from '@guardian/src-button';
import { ThemeProvider } from 'emotion-theming';
import { brand } from '@guardian/src-foundations/themes';
import { SvgCheckmark } from '@guardian/src-icons';
import { JsonScript } from './JsonScript';

const consentUIStyle = css`
    ${textSans.small()};
    color: ${palette.brandText.primary};
    background-color: ${palette.brandBackground.primary};
    max-width: 600px;
    padding: ${space[4]}px;
    margin: 0 auto;
    overflow-x: hidden;

    h2 {
        color: ${palette.brandText.primary};
        ${headline.small()};
    }

    a {
        color: inherit;
    }

    .center {
        text-align: center;
    }

    .center button {
        margin: ${space[2]}px;
    }
`;

const sourcepointDomain = 'sourcepoint.theguardian.com';

const clientConfig = {
    accountId: 1257,
    mmsDomain: `https://${sourcepointDomain}`,
    propertyId: 8791,
    pmTab: 'purposes',
    stageCampaign: false,
};

const clientConfigTcfv2 = {
    privacyManagerId: 145885,
    isTCFV2: true,
    propertyHref: 'https://theguardian.amp',
    targetingParams: {
        framework: 'tcfv2',
    },
};

const clientConfigCcpa = {
    privacyManagerId: '5eba7ef78c167c47ca8b433d',
    isCCPA: true,
    siteHref: 'https://theguardian.amp',
    getDnsMsgMms: true,
    alwaysDisplayDns: false,
    showNoticeUntilAction: true,
    targetingParams: {
        framework: 'ccpa',
    },
};

export const AdConsent: React.FC<{}> = ({}) => {
    // To debug geolocation in dev, make sure you're on the experimental channel of AMP:
    // https://cdn.ampproject.org/experiments.html
    // Then you can load the url with #amp-geo=XX, where XX is the country code
    return (
        <>
            <amp-geo layout="nodisplay">
                <JsonScript
                    o={{
                        ISOCountryGroups: {
                            eea: ['preset-eea', 'unknown'],
                            us: ['us', 'ca'],
                            au: ['au', 'nz'],
                            tcfv2: ['preset-eea', 'ca', 'au', 'nz', 'unknown'],
                            ccpa: ['us'],
                        },
                    }}
                />
            </amp-geo>
            <amp-consent
                layout="nodisplay"
                id="consent"
                style={{ background: 'none' }}
            >
                <JsonScript
                    o={{
                        consentRequired: 'remote',
                        consentInstanceId: 'sourcepoint',
                        checkConsentHref: `https://${sourcepointDomain}/wrapper/tcfv2/v1/amp`,
                        promptUISrc: `https://${sourcepointDomain}/amp/index.html`,
                        // TODO: decide on postPromptUI
                        // postPromptUI: 'consent-ui-manager',
                        clientConfig,
                        geoOverride: {
                            tcfv2: {
                                clientConfig: clientConfigTcfv2,
                            },
                            tcfv1: {
                                consentRequired: true,
                                promptUI: 'consent-ui',
                                clientConfig: false,
                            },
                            ccpa: {
                                checkConsentHref: `https://${sourcepointDomain}/ccpa/consent/amp`,
                                clientConfig: clientConfigCcpa,
                            },
                        },
                        // TODO: decide wether we want a fallback policy
                        policy: {
                            default: {
                                waitFor: { sourcepoint: [] },
                                timeout: {
                                    seconds: 5,
                                    fallbackAction: 'reject',
                                },
                            },
                        },
                    }}
                />
                <ThemeProvider theme={brand}>
                    <div id="consent-ui" className={consentUIStyle}>
                        <h2>Your Privacy</h2>
                        <p>
                            We use cookies to improve your experience on our
                            site and to show you personalised advertising.
                        </p>
                        <p>
                            To find out more, read our{' '}
                            <a href="https://www.theguardian.com/info/privacy">
                                privacy policy
                            </a>{' '}
                            and{' '}
                            <a href="https://www.theguardian.com/info/cookies">
                                cookie policy
                            </a>
                            .
                        </p>
                        <div className="center">
                            <Button
                                size="xsmall"
                                icon={<SvgCheckmark />}
                                on="tap:consent.accept"
                            >
                                I&apos;m okay with that
                            </Button>
                            <Button
                                size="xsmall"
                                priority="tertiary"
                                on="tap:consent.reject"
                            >
                                I do not want to see personalised ads
                            </Button>
                        </div>
                    </div>
                </ThemeProvider>
            </amp-consent>
        </>
    );
};
