const ampAccessConfig = {
    authorization: 'http://localhost:3011/epic-api/auth',
    pingback: 'http://localhost:3011/epic-api',
    login: {
        'sign-in':
            'https://ampbyexample.com/components/amp-access/login?rid=READER_ID&url=CANONICAL_URL',
        'sign-out': 'https://ampbyexample.com/components/amp-access/logout',
    },
    authorizationFallbackResponse: {
        loggedIn: false,
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
