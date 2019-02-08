const getServices = (apiUrl: string) => ({
    services: [
        {
            authorizationUrl: `${apiUrl}/oauth`,
            actions: {
                login: `${apiUrl}/login`,
                subscribe: `${apiUrl}/subscribe#viewerUrl=https://google.com`,
            },
        },
        {
            serviceId: `subscribe.google.com`,
        },
    ],
});

export const getSubscribeWithGoogleExtensionScripts = (apiUrl: string) => [
    `<script async custom-element="amp-subscriptions"
src="https://cdn.ampproject.org/v0/amp-subscriptions-0.1.js"></script>`,
    `<script async custom-element="amp-subscriptions-google" src="https://cdn.ampproject.org/v0/amp-subscriptions-google-0.1.js"></script>`,
    `<script type="application/json" id="amp-subscriptions">
${JSON.stringify(getServices(apiUrl))}</script>`,
];
