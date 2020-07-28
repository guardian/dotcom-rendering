import React, { useEffect } from 'react';
import { onIabConsentNotification } from '@guardian/consent-management-platform';

type Props = {
    isSignedIn?: boolean;
};

export const Braze = ({ isSignedIn }: Props) => {
    const { brazeSwitch } = window.guardian.config.switches;
    const apiKey = window.guardian.config.page.brazeApiKey;

    console.log({ apiKey, brazeSwitch, isSignedIn });

    useEffect(() => {
        if (brazeSwitch && apiKey && isSignedIn) {
            console.log('Hi from Braze');
        }
    }, [brazeSwitch, apiKey, isSignedIn]);

    return <div />;
};
