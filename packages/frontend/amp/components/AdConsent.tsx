import React from 'react';
import { AMPJSON } from './AMPJSON';
import { css, cx } from 'emotion';

const fontFamily =
    "'Guardian Text Sans Web', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif";

const consentUIStyle = css`
    font-family: ${fontFamily};
    font-size: 1rem;
    line-height: 1.25rem;
    color: #f6f6f6;
    background-color: rgb(51, 51, 51);

    max-width: 37.5rem;
    margin: 0 auto;
    overflow-x: hidden;
`;

const containerDivStyle = css`
    margin: 1em;
`;

const h2Style = css`
    margin-bottom: 1em;
    font-size: 1.5em;
`;

const aStyle = css`
    color: #f6f6f6;
    &:hover {
        text-decoration: 0;
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
    margin-top: 1em;
`;

const acceptStyle = css`
    border-radius: 20px;
    border: 0.0625rem solid rgba(255, 255, 255, 0.3);
    background: #ffe500;
    color: #121212;
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
                <AMPJSON
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
                <AMPJSON
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
                                    seconds: 0,
                                    fallbackAction: 'dismiss',
                                },
                            },
                        },
                    }}
                />
                <div id="adconsent-ui" className={consentUIStyle}>
                    <div className={containerDivStyle}>
                        <h2 className={h2Style}>Your pricacy</h2>
                        <p>
                            We use cookies to improve your experience on our
                            personalised advertising.
                        </p>
                        <p>
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
                            className={cx(buttonStyle, acceptStyle, 'blabla')}
                            role="button"
                        >
                            I'm OK with that
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
