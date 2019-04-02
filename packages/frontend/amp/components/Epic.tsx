import React from 'react';
import { css } from 'emotion';
import { headline, textSans } from '@guardian/pasteup/typography';
import { palette } from '@guardian/pasteup/palette';
import { AmpSubscriptionGoogle } from '@frontend/amp/components/elements/AmpSubscriptionGoogle';

const ampAccessConfig = {
    authorization: 'http://localhost:3011/epic-api/auth',
    pingback: 'http://localhost:3011/epic-api',
    login: {
        'sign-in':
            'https://ampbyexample.com/components/amp-access/login?rid=READER_ID&url=CANONICAL_URL',
        'sign-out': 'https://ampbyexample.com/components/amp-access/logout',
    },
    authorizationFallbackResponse: {
        error: true,
        loggedIn: false,
        powerUser: false,
    },
};

export const getAmpAccessScripts = () => {
    return [
        `<script async custom-element="amp-access" src="https://cdn.ampproject.org/v0/amp-access-0.1.js"></script>`,
        `<script id="amp-access" type="application/json">${JSON.stringify(
            ampAccessConfig,
        )}</script>`,
    ];
};

const epicContentUrl =
    'https://interactive.guim.co.uk/docsdata/1fy0JolB1bf1IEFLHGHfUYWx-niad7vR9K954OpTOvjE.json';

const parseHighlightedText = text => {
    const stringContainingHTMLSource = text
        .replace('%%CURRENCY_SYMBOL%%', '£')
        .replace('&ndash;', '-');
    // const parser = new DOMParser();
    // doc = parser.parseFromString(stringContainingHTMLSource, 'text/html');
    return stringContainingHTMLSource;
};

const container = css`
    /* width: 100%; */
    /* height: 815px; */
    position: relative;
    border-top: 0.0625rem solid ${palette.highlight.main};
    background-color: ${palette.neutral[97]};
    margin-top: 1.5rem;
    padding: 0.25rem 0.3125rem 0.75rem;
`;

const title = css`
    line-height: 1.5rem;
    font-weight: 900;
    margin-bottom: 0.75rem;
    ${headline(5)};
`;

const paragraph = css`
    ${textSans(5)};
    margin-bottom: 16px;
`;

const highlighted = css`
    ${textSans(5)};
    background-color: #ffe500;
    padding: 0.125rem;
    font-weight: bold;
`;
// tslint:disable:react-no-dangerous-html
export const Epic = ({ content }) => {
    return (
        <div amp-access="loggedIn">
            <div>
                <div className={container}>
                    {content.map(
                        ({ heading, paragraphs, highlightedText }, index) => {
                            return (
                                <div key={index}>
                                    <h1 className={title}>{heading}</h1>
                                    <p className={paragraph}> {paragraphs}</p>

                                    {highlightedText ? (
                                        <span className={highlighted}>
                                            {parseHighlightedText(
                                                highlightedText,
                                            )}
                                        </span>
                                    ) : null}
                                </div>
                            );
                        },
                    )}
                    {/* {JSON.stringify(content, null, 2)} */}

                    <AmpSubscriptionGoogle />
                </div>
            </div>
        </div>
    );
};
