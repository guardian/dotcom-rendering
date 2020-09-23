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

            resolve(Boolean(consentGivenUnderCcpa || consentGivenUnderTcfv2));
        });
    });

type PreCheckArgs = {
    brazeSwitch: boolean;
    apiKey?: string;
    isDigitalSubscriber?: boolean;
    pageConfig: { [key: string]: any };
};

export const canShowPreChecks = ({
    brazeSwitch,
    apiKey,
    isDigitalSubscriber,
    pageConfig,
}: PreCheckArgs) =>
    Boolean(
        brazeSwitch &&
            apiKey &&
            isDigitalSubscriber &&
            !pageConfig.isPaidContent,
    );

// We can show a Braze banner if:
// - The Braze switch is on
// - We have a Braze API key
// - The user is a digital subscriber
// - We're not on a Glabs paid content page
// - We've got a Braze UUID from the API, given a user's ID Creds
// - The user has given Consent via CCPA or TCFV2
// - The Braze websdk appboy initialisation does not throw an error
// - The Braze app Boy subscription to in app message returns meta info
export const canShow = async (
    asyncBrazeUuid: Promise<null | string>,
    isDigitalSubscriber: undefined | boolean,
): Promise<CanShowResult> => {
    const { brazeSwitch } = window.guardian.config.switches;
    const apiKey = window.guardian.config.page.brazeApiKey;

    if (
        !canShowPreChecks({
            brazeSwitch,
            apiKey,
            isDigitalSubscriber,
            pageConfig: window.guardian.config.page,
        })
    ) {
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

        appboy.initialize(apiKey as string, {
            enableLogging: false,
            noCookies: true,
            baseUrl: 'https://sdk.fra-01.braze.eu/api/v3',
            sessionTimeoutInSeconds: 1,
            minimumIntervalBetweenTriggerActionsInSeconds: 0,
        });

        return new Promise((resolve) => {
            appboy.subscribeToInAppMessage((message: any) => {
                const meta = message.extras;

                const buttonHandler = (buttonId: number) => {
                    const thisButton = new appboy.InAppMessageButton(
                        `Button: ID ${buttonId}`,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        buttonId,
                    );
                    appboy.logInAppMessageButtonClick(thisButton, message);
                };

                const logImpression = () => {
                    // Log the impression with Braze
                    appboy.logInAppMessageImpression(message);
                };

                if (meta) {
                    const newMeta = {
                        ...meta,
                        logImpression,
                        buttonHandler,
                    };
                    resolve({ result: true, meta: newMeta });
                }

                resolve({ result: false });
            });

            appboy.changeUser(brazeUuid);
            appboy.openSession();
        });
    } catch (e) {
        return { result: false };
    }
};

type InnerProps = {
    meta: any;
    BrazeComponent: React.FC<BrazeBannerProps>;
};

const BrazeBannerWithSatisfiedDependencies = ({
    BrazeComponent,
    meta,
}: InnerProps) => {
    useEffect(() => {
        meta.logImpression();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={containerStyles}>
            <BrazeComponent
                onButtonClick={meta.buttonHandler}
                header={meta.header}
                body={meta.body}
            />
        </div>
    );
};

export const BrazeBanner = ({ meta }: Props) => {
    const [BrazeComponent, setBrazeComponent] = useState<
        React.FC<BrazeBannerProps>
    >();

    useEffect(() => {
        if (meta) {
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
                    setBrazeComponent(() => module.DigitalSubscriberAppBanner);
                })
                .catch((error) =>
                    window.guardian.modules.sentry.reportError(
                        error,
                        'braze-banner',
                    ),
                );
        }
    }, [meta]);

    if (BrazeComponent && meta) {
        return (
            <BrazeBannerWithSatisfiedDependencies
                BrazeComponent={BrazeComponent}
                meta={meta}
            />
        );
    }

    return <div />;
};
