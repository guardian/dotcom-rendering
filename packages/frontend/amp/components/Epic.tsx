import React from 'react';
import { css, cx } from 'emotion';
import { headline, textSans } from '@guardian/pasteup/typography';
import { palette } from '@guardian/pasteup/palette';

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

const url =
    'https://interactive.guim.co.uk/docsdata/1fy0JolB1bf1IEFLHGHfUYWx-niad7vR9K954OpTOvjE.json';

const container = css`
    border-top: 0.0625rem solid ${palette.highlight.main};
    background-color: ${palette.neutral[97]};
    margin-top: 1.5rem;
    padding: 0.25rem 0.3125rem 0.75rem;
`;

const heading = css`
    line-height: 1.5rem;
    font-weight: 900;
    margin-bottom: 0.75rem;
    ${headline(5)};
`;

const paragraph = css`
    ${textSans(5)};
`;

const template = `
    <div>
        <h1 class=${heading}>{{ heading }}</h1>
        <p class=${paragraph}> {{ paragraphs }}</p>
    </div>
`;
// tslint:disable:react-no-dangerous-html
export const Epic = () => {
    return (
        <div amp-access="loggedIn">
            <div>
                <div className={container}>
                    <amp-list
                        layout="fixed-height"
                        height="815px"
                        items="sheets.control"
                        src={url}
                    >
                        <template type="amp-mustache">
                            <div
                                dangerouslySetInnerHTML={{ __html: template }}
                            />
                        </template>
                    </amp-list>
                </div>
            </div>
        </div>
    );
};
