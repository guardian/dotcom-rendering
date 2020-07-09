import React from 'react';
import { css } from 'emotion';
import { palette, space } from '@guardian/src-foundations';
import { textSans, headline } from '@guardian/src-foundations/typography';
import { Button } from '@guardian/src-button';
import { SvgCheckmark } from '@guardian/src-icons';
import { ThemeProvider } from 'emotion-theming';
import { brand } from '@guardian/src-foundations/themes';
import { JsonScript } from './JsonScript';

const consentUIStyle = css`
    ${textSans.small()};
    color: ${palette.brandText.primary};
    background-color: ${palette.brandBackground.primary};
    max-width: 600px;
    padding: ${space[2]}px;
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
`;

const stack = css`
    & > * {
        margin-top: ${space[2]}px;
    }
`;

export const AdConsent: React.FC<{}> = ({}) => {
    // To debug geolocation in dev, make sure you're on the experimental channel of AMP:
    // https://localhost.cdn.ampproject.org/experiments.html
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
                        consentInstanceId: 'sourcepoint',
                        consentRequired: 'remote',
                        checkConsentHref:
                            'https://wrapper-api.sp-prod.net/tcfv2/v1/amp',
                        // TODO: change this url in PROD
                        promptUISrc: 'https://consent.theguardian.test/',
                        postPromptUI: 'consent-ui',
                        clientConfig: {
                            accountId: 1257,
                            propertyHref: 'https://theguardian.amp',
                            propertyId: 8791,
                            privacyManagerId: 145885,
                            isTCFV2: true,
                            pmTab: 'purposes',
                            stageCampaign: false,
                            targetingParams: {
                                color: 'red',
                            },
                        },
                        geoOverride: {
                            us: {
                                consentRequired: true,
                                checkConsentHref: false,
                                promptUI: 'consent-ui-ccpa',
                                promptUISrc: false,
                                postPromptUI: false,
                            },
                        },
                        // policy: {
                        //     default: {
                        //         waitFor: { sourcepoint: [] },
                        //         timeout: {
                        //             seconds: 5,
                        //             fallbackAction: 'reject',
                        //         },
                        //     },
                        // },
                    }}
                />
                <ThemeProvider theme={brand}>
                    <div id="consent-ui-ccpa" className={consentUIStyle}>
                        <div>
                            <h2>Your privacy</h2>
                            <p>
                                We use cookies to improve your experience on our
                                site and to show you personalised advertising.
                            </p>
                            <p>
                                To find out more, read our{' '}
                                <a href="https://www.theguardian.com/help/privacy-policy">
                                    privacy policy
                                </a>{' '}
                                and{' '}
                                <a href="https://www.theguardian.com/info/cookies">
                                    cookie policy
                                </a>
                                .
                            </p>
                        </div>
                        <div className={stack}>
                            <Button
                                size="small"
                                icon={<SvgCheckmark />}
                                on="tap:the-adconsent-element.accept"
                            >
                                I&apos;m OK with that
                            </Button>
                            <Button
                                size="small"
                                priority="tertiary"
                                on="tap:the-adconsent-element.reject"
                            >
                                I do not want to see personalised ads
                            </Button>
                        </div>
                    </div>
                    <div id="consent-ui" className={consentUIStyle}>
                        <div className="center">
                            <Button
                                size="xsmall"
                                on="tap:consent.prompt(consent=SourcePoint)"
                                priority="tertiary"
                            >
                                Manage privacy settings
                            </Button>
                        </div>
                    </div>
                </ThemeProvider>
            </amp-consent>
        </>
    );
};
