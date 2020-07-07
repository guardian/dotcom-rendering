import React from 'react';
import { css, cx } from 'emotion';
import { palette } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';
import Tick from '@frontend/static/icons/tick.svg';
import { JsonScript } from './JsonScript';

const consentUIStyle = css`
    ${textSans.medium()};
    color: ${palette.neutral[97]};
    background-color: ${palette.neutral[20]};
    max-width: 600px;
    margin: 0 auto;
    overflow-x: hidden;
`;

const containerDivStyle = css`
    margin: 16px;
`;

const h2Style = css`
    margin-bottom: 16px;
    font-size: 24px;
    font-weight: bold;
`;

const pStyle = css`
    margin-bottom: 8px;
`;

const aStyle = css`
    color: ${palette.neutral[97]};
    &:hover {
        text-decoration: none;
    }
`;

const actionsStyle = css`
    text-align: right;
`;

const buttonStyle = css`
    font: inherit;
    border: 0;
    background: transparent;
    color: inherit;
    display: block;
    width: 100%;
    margin-top: 16px;
`;

const acceptStyle = css`
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    background: ${palette.brandYellow.main};
    color: ${palette.neutral[7]};
    padding: 5px 20px;
    font-weight: bold;
`;

const rejectStyle = css`
    text-decoration: underline;
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
                        consents: {
                            sourcepoint: {
                                consentRequired: 'remote',
                                checkConsentHref:
                                    'https://wrapper-api.sp-prod.net/tcfv2/v1/amp',
                                promptUISrc: 'https://amp.sp-prod.net/',
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
                            },
                        },
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
                <div id="consent-ui" className={consentUIStyle}>
                    <button on="tap:consent.prompt(consent=SourcePoint)">
                        Manage privacy settings
                    </button>
                </div>
            </amp-consent>
        </>
    );
};
