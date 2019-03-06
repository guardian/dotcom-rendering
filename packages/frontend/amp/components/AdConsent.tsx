import React from 'react';
import { AMPJSON } from './AMPJSON';

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
            <amp-consent layout="nodisplay" id="the-adconsent-element">
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
                <div
                    id="adconsent-ui"
                    className="with-uk-frame consent-ui main-body"
                >
                    <div className="adconsent-message">
                        <p>
                            We use cookies to improve your experience on our
                            personalised advertising.
                        </p>
                        <p>
                            To find out more, read our{' '}
                            <a
                                className="u-underline"
                                href="https://www.theguardian.com/help/privacy-policy"
                            >
                                privacy policy
                            </a>
                            and{' '}
                            <a
                                className="u-underline"
                                href="https://www.theguardian.com/info/cookies"
                            >
                                cookie policy
                            </a>
                            .
                        </p>
                    </div>
                    <div className="adconsent-actions">
                        <button
                            on="tap:the-adconsent-element.accept"
                            className="adconsent-accept"
                            role="button"
                        >
                            I'm OK with that
                        </button>
                        <button
                            on="tap:the-adconsent-element.reject"
                            className="u-underline adconsent-reject"
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
