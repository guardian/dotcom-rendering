import React, { useEffect, useState } from 'react';
import * as emotion from 'emotion';
import * as emotionCore from '@emotion/core';
import * as emotionTheming from 'emotion-theming';
import { onConsentChange } from '@guardian/consent-management-platform';
import { getZIndex } from '@root/src/web/lib/getZIndex';
import { Props as BrazeBannerProps } from '@guardian/braze-components';
import { CanShowResult } from './bannerPicker';

export const brazeVendorId = '5ed8c49c4b8ce4571c7ad801';

type Props = {
    meta: any;
};

const containerStyles = emotion.css`
    position: fixed;
    bottom: -1px;
    width: 100%;
    ${getZIndex('banner')}
`;

export const hasRequiredConsents = (): Promise<boolean> =>
    new Promise((resolve) => {
        onConsentChange(({ tcfv2, ccpa }) => {
            const consentGivenUnderCcpa = ccpa && !ccpa.doNotSell;
            const consentGivenUnderTcfv2 =
                tcfv2 && tcfv2.vendorConsents[brazeVendorId];

            resolve(!!(consentGivenUnderCcpa || consentGivenUnderTcfv2));
        });
    });

export const canShow = async (
    asyncBrazeUuid: Promise<null | string>,
    isDigitalSubscriber: undefined | boolean,
): Promise<CanShowResult> => {
    const { brazeSwitch } = window.guardian.config.switches;
    const apiKey = window.guardian.config.page.brazeApiKey;

    if (!(brazeSwitch && apiKey)) {
        return { result: false };
    }

    if (!isDigitalSubscriber) {
        return { result: false };
    }

    const [brazeUuid, hasGivenConsent] = await Promise.all([
        asyncBrazeUuid,
        hasRequiredConsents(),
    ]);

    if (!(brazeUuid && hasGivenConsent)) {
        return { result: false };
    }

    try {
        const { default: appboy } = await import(
            /* webpackChunkName: "braze-web-sdk-core" */ '@braze/web-sdk-core'
        );

        appboy.initialize(apiKey, {
            noCookies: true,
            baseUrl: 'https://sdk.fra-01.braze.eu/api/v3',
            sessionTimeoutInSeconds: 1,
            minimumIntervalBetweenTriggerActionsInSeconds: 0,
        });

        return new Promise((resolve) => {
            appboy.subscribeToInAppMessage((message) => {
                const meta = (message as any).extras;

                if (meta) {
                    resolve({ result: true, meta });
                }
                resolve({ result: false });
            });

            appboy.changeUser(brazeUuid);
            appboy.openSession();
        });
    } catch {
        return { result: false };
    }
};

export const BrazeBanner = ({ meta }: Props) => {
    const [ExampleComponent, setExampleComponent] = useState<
        React.FC<BrazeBannerProps>
    >();

    useEffect(() => {
        if (meta && meta['test-key']) {
            // TODO: unify the way we handle sharing these deps (this is
            // duplicated in SlotBodyEnd). Probably via the automat client
            // library.
            window.guardian.automat = {
                react: React,
                preact: React,
                emotionCore,
                emotionTheming,
                emotion,
            };

            import(
                /* webpackChunkName: "guardian-braze-components" */ '@guardian/braze-components'
            )
                .then((module) => {
                    setExampleComponent(() => module.ExampleComponent);
                })
                .catch((error) =>
                    window.guardian.modules.sentry.reportError(
                        error,
                        'braze-banner',
                    ),
                );
        }
    }, [meta]);

    if (ExampleComponent && meta && meta['test-key']) {
        return (
            <div className={containerStyles}>
                <ExampleComponent
                    message={meta['test-key']}
                    onButtonClick={() => {}}
                />
                ;
            </div>
        );
    }

    return <div />;
};
