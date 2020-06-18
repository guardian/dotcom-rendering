import React, { useEffect, useState } from 'react';
import * as emotion from 'emotion';
import * as emotionCore from '@emotion/core';
import * as emotionTheming from 'emotion-theming';
import {useHasBeenSeen} from "@root/src/web/lib/useHasBeenSeen";
import {logView} from "@root/node_modules/@guardian/automat-client";

const checkForErrors = (response: any) => {
    if (!response.ok) {
        throw Error(
            response.statusText ||
                `SlotBanner | An api call returned HTTP status ${response.status}`,
        );
    }
    return response;
};

type HasBeenSeen = [boolean, (el: HTMLDivElement) => void];

type OphanAction = 'INSERT' | 'VIEW';

type TestMeta = {
    abTestName: string;
    abTestVariant: string;
    campaignCode: string;
    campaignId: string;
};

const sendOphanBannerEvent = (action: OphanAction, testMeta: TestMeta): void => {
    const componentEvent = {
        component: {
            componentType: 'ACQUISITIONS_BANNER',
            products: ['CONTRIBUTION', 'MEMBERSHIP_SUPPORTER'],
            campaignCode: testMeta.campaignCode,
            id: testMeta.campaignId,
        },
        abTest: {
            name: testMeta.abTestName,
            variant: testMeta.abTestVariant,
        },
        action,
    };

    window.guardian.ophan.record({ componentEvent });
};

type Props = {
    isSignedIn?: boolean;
    countryCode?: string;
    contentType: string;
    sectionName?: string;
    shouldHideReaderRevenue: boolean;
    isMinuteArticle: boolean;
    isPaidContent: boolean;
    isSensitive: boolean;
    tags: TagType[];
    contributionsServiceUrl: string;
};

// TODO specify return type (need to update client to provide this first)
const buildPayload = (props: Props) => {
    return {
        tracking: {
            // TODO stub
        },
        targeting: {
            ...props,
            // TODO stub
        },
    };
};


const MemoisedInner = ({
    isSignedIn,
    countryCode,
    contentType,
    sectionName,
    shouldHideReaderRevenue,
    isMinuteArticle,
    isPaidContent,
    isSensitive,
    tags,
    contributionsServiceUrl,
}: Props) => {
    const [Banner, setBanner] = useState<React.FC>();
    const [bannerProps, setBannerProps] = useState<{}>();
    const [bannerMeta, setBannerMeta] = useState<TestMeta>();

    const [hasBeenSeen, setNode] = useHasBeenSeen({
        threshold: 0,
        debounce: true,
    }) as HasBeenSeen;

    useEffect(() => {
        const bannerPayload = buildPayload({
            isSignedIn,
            countryCode,
            contentType,
            sectionName,
            shouldHideReaderRevenue,
            isMinuteArticle,
            isPaidContent,
            tags,
            contributionsServiceUrl,
            isSensitive,
        });

        window.guardian.automat = {
            react: React,
            emotionCore,
            emotionTheming,
            emotion,
        };

        // TODO replace this with an imported version from the client lib
        const getBanner = (meta: {}, url: string): Promise<Response> => {
            const json = JSON.stringify(meta);
            return fetch(url, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: json,
            });
        };

        getBanner(bannerPayload, `${contributionsServiceUrl}/banner`)
            .then(checkForErrors)
            .then(response => response.json())
            .then(json => {
                if (!json.data) {
                    return;
                }

                const { module, meta } = json.data;

                import(/* webpackIgnore: true */ module.url)
                    .then(bannerModule => {
                        setBannerProps({
                            ...module.props,
                        });
                        setBanner(() => bannerModule.Banner); // useState requires functions to be wrapped
                        setBannerMeta(meta);
                        sendOphanBannerEvent('INSERT', meta);
                    })
                    // eslint-disable-next-line no-console
                    .catch(error => console.log(`banner - error is: ${error}`));
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Should only run once
    useEffect(() => {
        if (hasBeenSeen && bannerMeta) {
            logView(bannerMeta.abTestName);
            sendOphanBannerEvent('VIEW', bannerMeta);
        }
    }, [hasBeenSeen, bannerMeta]);

    if (Banner) {
        return (
            // The css here is necessary to put the container div in view, so that we can track the view
            <div ref={setNode} className={emotion.css`position: fixed; bottom: -1px;`}>
                hello
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <Banner {...bannerProps} />
            </div>
        );
    }

    return null;
};

export const ReaderRevenueBanner = ({
    isSignedIn,
    countryCode,
    contentType,
    sectionName,
    shouldHideReaderRevenue,
    isMinuteArticle,
    isPaidContent,
    isSensitive,
    tags,
    contributionsServiceUrl,
}: Props) => {
    if (isSignedIn === undefined || countryCode === undefined) {
        return null;
    }

    // Memoised as we only ever want to call the Slots API once, for simplicity
    // and performance reasons.
    return (
        <MemoisedInner
            isSignedIn={isSignedIn}
            countryCode={countryCode}
            contentType={contentType}
            sectionName={sectionName}
            shouldHideReaderRevenue={shouldHideReaderRevenue}
            isMinuteArticle={isMinuteArticle}
            isPaidContent={isPaidContent}
            isSensitive={isSensitive}
            tags={tags}
            contributionsServiceUrl={contributionsServiceUrl}
        />
    );
};
