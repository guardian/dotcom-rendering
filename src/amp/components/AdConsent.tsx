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
    return (
        <>
            <amp-geo layout="nodisplay">
                <JsonScript
                    o={{
                        ISOCountryGroups: {
                            eea: ['preset-eea'],
                            us: ['us', 'ca'],
                            au: ['au', 'nz'],
                        },
                    }}
                />
            </amp-geo>
            <amp-consent
                layout="nodisplay"
                id="the-adconsent-element"
                style={{ background: 'none' }}
            >
                <JsonScript
                    o={{
                        consents: {
                            adconsent: {
                                promptIfUnknownForGeoGroup: 'eea',
                                promptUI: 'adconsent-ui',
                            },
                        },
                        policy: {
                            default: {
                                waitFor: { adconsent: [] },
                                timeout: {
                                    seconds: 5,
                                    fallbackAction: 'reject',
                                },
                            },
                        },
                    }}
                />
                <div id="adconsent-ui" className={consentUIStyle}>
                    <div className={containerDivStyle}>
                        <h2 className={h2Style}>Your privacy</h2>
                        <p className={pStyle}>
                            We use cookies to improve your experience on our
                            site and to show you personalised advertising.
                        </p>
                        <p className={pStyle}>
                            To find out more, read our{' '}
                            <a
                                className={aStyle}
                                href="https://www.theguardian.com/help/privacy-policy"
                            >
                                privacy policy
                            </a>{' '}
                            and{' '}
                            <a
                                className={aStyle}
                                href="https://www.theguardian.com/info/cookies"
                            >
                                cookie policy
                            </a>
                            .
                        </p>
                    </div>
                    <div className={cx(actionsStyle, containerDivStyle)}>
                        <button
                            on="tap:the-adconsent-element.accept"
                            className={cx(buttonStyle, acceptStyle)}
                            role="button"
                        >
                            <Tick /> I'm OK with that
                        </button>
                        <button
                            on="tap:the-adconsent-element.reject"
                            className={cx(buttonStyle, rejectStyle)}
                            role="button"
                        >
                            I do not want to see personalised ads
                        </button>
                    </div>
                </div>
            </amp-consent>
        </>
    );
};
