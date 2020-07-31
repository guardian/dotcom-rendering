import React, { useEffect, useState } from 'react';
import { onIabConsentNotification } from '@guardian/consent-management-platform';
import { IabPurposeState } from '@guardian/consent-management-platform/dist/tcf/types';

type Props = {
    isSignedIn?: boolean;
};

const brazeUuid = 'XXXX';

export const Braze = ({ isSignedIn }: Props) => {
    const { brazeSwitch } = window.guardian.config.switches;
    const apiKey = window.guardian.config.page.brazeApiKey;
    const [hasGivenConsent, setHasGivenConsent] = useState<boolean | null>(
        null,
    );
    const [testValue, setTestValue] = useState<string | null>(null);

    console.log({ apiKey, brazeSwitch, isSignedIn, hasGivenConsent });

    useEffect(() => {
        onIabConsentNotification((state: IabPurposeState) => {
            const consentState =
                state[1] && state[2] && state[3] && state[4] && state[5];
            setHasGivenConsent(consentState);
        });
    }, []);

    useEffect(() => {
        if (brazeSwitch && apiKey && isSignedIn && hasGivenConsent) {
            console.log('Hi from Braze');
            import(
                /* webpackChunkName: "braze-web-sdk" */ '@braze/web-sdk'
            ).then(({ default: appboy }) => {
                // TODO: change session timeout for production from 1 second
                appboy.initialize(apiKey, {
                    enableLogging: true,
                    noCookies: true,
                    baseUrl: 'https://sdk.fra-01.braze.eu/api/v3',
                    enableHtmlInAppMessages: true,
                    sessionTimeoutInSeconds: 1,
                });

                appboy.subscribeToInAppMessage((config: BrazeMessageConfig) => {
                    console.log(config);
                    setTestValue(config.extras['test-key']);
                });

                appboy.changeUser(brazeUuid);
                appboy.openSession();
            });
        }
    }, [brazeSwitch, apiKey, isSignedIn, hasGivenConsent]);

    if (testValue) {
        return <div>{testValue}</div>;
    }
    return <div />;
};
