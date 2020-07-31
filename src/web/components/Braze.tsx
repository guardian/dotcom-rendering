import React, { useEffect, useState } from 'react';
import { onIabConsentNotification } from '@guardian/consent-management-platform';
import { IabPurposeState } from '@guardian/consent-management-platform/dist/tcf/types';

type Props = {
    isSignedIn?: boolean;
};
type BrazeMessageConfig = {
    extras: {
        foo: string;
        'test-value': string;
    };
};

const brazeUuid = 'XXXXX';

export const Braze = ({ isSignedIn }: Props) => {
    const { brazeSwitch } = window.guardian.config.switches;
    const apiKey = window.guardian.config.page.brazeApiKey;
    const [hasGivenConsent, setHasGivenConsent] = useState<boolean | null>(
        null,
    );

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
            ).then((appboy) => {
                // TODO: change session timeout for production from 1 second
                appboy.initialize(apiKey, {
                    enableLogging: true,
                    noCookies: true,
                    baseUrl: 'https://sdk.fra-01.braze.eu/api/v3',
                    enableHtmlInAppMessages: true,
                    sessionTimeoutInSeconds: 1,
                });

                appboy.subscribeToInAppMessage(
                    (configuration: BrazeMessageConfig) => {
                        console.log(configuration);
                        appboy.display.showInAppMessage(configuration);
                        return true;
                    },
                );

                appboy.changeUser(brazeUuid);
                appboy.openSession();
            });
        }
    }, [brazeSwitch, apiKey, isSignedIn, hasGivenConsent]);

    return <div />;
};
