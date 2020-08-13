import React from 'react';
import { JsonScript } from './JsonScript';

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
                            ccpa: {
                                checkConsentHref: `https://${sourcepointDomain}/ccpa/consent/amp`,
                                clientConfig: clientConfigCcpa,
                            },
                            basic: {
                                consentRequired: true,
                                promptUI: 'consent-ui',
                                clientConfig: false,
                                policy: {
                                    default: {
                                        waitFor: { sourcepoint: [] },
                                        timeout: {
                                            seconds: 5,
                                            fallbackAction: 'reject',
                                        },
                                    },
                                },
                            },
                        },
                        // TODO: decide wether we want a fallback policy
                        policy: {
                            default: {
                                waitFor: { sourcepoint: [] },
                                timeout: {
                                    seconds: 60,
                                    fallbackAction: 'reject',
                                },
                            },
                        },
                    }}
                />
            </amp-consent>
        </>
    );
};
