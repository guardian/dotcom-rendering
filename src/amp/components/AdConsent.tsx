import React from 'react';
import { css } from 'emotion';
import { palette, space } from '@guardian/src-foundations';
import { textSans, headline } from '@guardian/src-foundations/typography';
import { Button } from '@guardian/src-button';
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

const domain = 'sourcepoint.theguardian.test';

const clientConfig = {
    accountId: 1257,
    mmsDomain: `https://${domain}`,
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
                            us: ['us'],
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
                        consentRequired: 'remote',
                        consentInstanceId: 'sourcepoint',
                        checkConsentHref: `https://${domain}/wrapper/tcfv2/v1/amp`,
                        promptUISrc: `https://${domain}/amp/index.html`,
                        // TODO: decide on postPromptUI
                        // postPromptUI: 'consent-ui-manager',
                        clientConfig,
                        geoOverride: {
                            eea: {
                                clientConfig: clientConfigTcfv2,
                            },
                            au: {
                                clientConfig: clientConfigTcfv2,
                            },
                            us: {
                                checkConsentHref: `https://${domain}/ccpa/consent/amp`,
                                clientConfig: clientConfigCcpa,
                            },
                        },
                    }}
                />
                <ThemeProvider theme={brand}>
                    <div id="consent-ui-manager" className={consentUIStyle}>
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
