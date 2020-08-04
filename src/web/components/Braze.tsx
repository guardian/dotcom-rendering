import React, { useEffect, useState } from 'react';
import { onIabConsentNotification } from '@guardian/consent-management-platform';
import { IabPurposeState } from '@guardian/consent-management-platform/dist/tcf/types';

type Props = {
    brazeUuid: null | string;
};

export const Braze = ({ brazeUuid }: Props) => {
    const { brazeSwitch } = window.guardian.config.switches;
    const apiKey = window.guardian.config.page.brazeApiKey;
    const [hasGivenConsent, setHasGivenConsent] = useState<boolean | null>(
        null,
    );
    const [testValue, setTestValue] = useState<string | null>(null);

    useEffect(() => {
        onIabConsentNotification((state: IabPurposeState) => {
            const consentState =
                state[1] && state[2] && state[3] && state[4] && state[5];
            setHasGivenConsent(consentState);
        });
    }, []);

    useEffect(() => {
        if (brazeSwitch && apiKey && brazeUuid && hasGivenConsent) {
            import(
                /* webpackChunkName: "braze-web-sdk" */ '@braze/web-sdk'
            ).then(({ default: appboy }) => {
                appboy.initialize(apiKey, {
                    enableLogging: true,
                    noCookies: true,
                    baseUrl: 'https://sdk.fra-01.braze.eu/api/v3',
                    enableHtmlInAppMessages: true,
                    // Controls how soon we'll show a Braze message again, useful for local dev:
                    // sessionTimeoutInSeconds: 1,
                });

                appboy.subscribeToInAppMessage((config: BrazeMessageConfig) => {
                    setTestValue(config.extras['test-key']);
                });

                appboy.changeUser(brazeUuid);
                appboy.openSession();
            });
        }
    }, [brazeSwitch, apiKey, brazeUuid, hasGivenConsent]);

    if (testValue) {
        return <div>{testValue}</div>;
    }
    return <div />;
};
