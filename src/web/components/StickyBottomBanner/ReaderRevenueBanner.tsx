import React, { useEffect, useState } from 'react';
import * as emotion from 'emotion';
import * as emotionCore from '@emotion/core';
import * as emotionTheming from 'emotion-theming';
import {useHasBeenSeen} from "@root/src/web/lib/useHasBeenSeen";
import {logView} from "@root/node_modules/@guardian/automat-client";
import {shouldHideSupportMessaging} from "@root/src/web/lib/contributions";
import {getCookie} from "@root/src/web/browser/cookie";
import {sendOphanContributionsComponentEvent, TestMeta} from "@root/src/web/browser/ophan/ophan";
import {getZIndex} from "@root/src/web/lib/getZIndex";

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
    alreadyVisitedCount: number;
    engagementBannerLastClosedAt?: string,
};

// TODO specify return type (need to update client to provide this first)
const buildPayload = (props: Props) => {
    return {
        tracking: {
            ophanPageId: window.guardian.config.ophan.pageViewId,
            ophanComponentId: 'ACQUISITIONS_ENGAGEMENT_BANNER',
            platformId: 'GUARDIAN_WEB',
            clientName: 'dcr',
            referrerUrl: window.location.origin + window.location.pathname,
        },
        targeting: {
            alreadyVisitedCount: props.alreadyVisitedCount,
            shouldHideReaderRevenue: props.shouldHideReaderRevenue,
            isPaidContent: props.isPaidContent,
            showSupportMessaging: !shouldHideSupportMessaging(props.isSignedIn),
            engagementBannerLastClosedAt: props.engagementBannerLastClosedAt,
            mvtId: Number(getCookie('GU_mvt_id')),
            countryCode: props.countryCode,
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
    alreadyVisitedCount,
    engagementBannerLastClosedAt,
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
            alreadyVisitedCount,
            engagementBannerLastClosedAt,
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
                        setBanner(() => bannerModule[module.name]); // useState requires functions to be wrapped
                        setBannerMeta(meta);
                        sendOphanContributionsComponentEvent('INSERT', meta, 'ACQUISITIONS_ENGAGEMENT_BANNER');
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
            sendOphanContributionsComponentEvent('VIEW', bannerMeta, 'ACQUISITIONS_ENGAGEMENT_BANNER');
        }
    }, [hasBeenSeen, bannerMeta]);

    if (Banner) {
        return (
            // The css here is necessary to put the container div in view, so that we can track the view
            <div ref={setNode} className={emotion.css`position: fixed; bottom: -1px; width: 100%; ${getZIndex('banner')}`}>
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
    alreadyVisitedCount,
    engagementBannerLastClosedAt,
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
            alreadyVisitedCount={alreadyVisitedCount}
            engagementBannerLastClosedAt={engagementBannerLastClosedAt}
        />
    );
};
