import React, { useEffect, useState } from 'react';
import { css } from 'emotion';
import {
    getBodyEnd,
    getViewLog,
    logView,
    getWeeklyArticleHistory,
} from '@guardian/slot-machine-client';
import {
    shouldShowSupportMessaging,
    isRecurringContributor,
    getLastOneOffContributionDate,
} from '@root/src/web/lib/contributions';
import { getCookie } from '../browser/cookie';
import { useHasBeenSeen } from '../lib/useHasBeenSeen';

type HasBeenSeen = [boolean, (el: HTMLDivElement) => void];

const checkForErrors = (response: any) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
};

type OphanAction = 'INSERT' | 'VIEW';

const testName = 'FrontendDotcomRenderingEpic';
const campaignCode = 'gdnwb_copts_memco_frontend_dotcom_rendering_epic_dcr';

const sendOphanEvent = (action: OphanAction): void => {
    const componentEvent = {
        component: {
            componentType: 'ACQUISITIONS_EPIC',
            products: ['CONTRIBUTION', 'MEMBERSHIP_SUPPORTER'],
            campaignCode,
            id: 'epic_frontend_dotcom_rendering_epic',
        },
        abTest: {
            name: testName,
            variant: 'dcr',
        },
        action,
    };

    window.guardian.ophan.record({ componentEvent });
};

const wrapperMargins = css`
    margin: 18px 0;
`;

type Props = {
    isSignedIn?: boolean;
    countryCode?: string;
    contentType: string;
    sectionName?: string;
    shouldHideReaderRevenue: boolean;
    isMinuteArticle: boolean;
    isPaidContent: boolean;
    tags: TagType[];
};

// TODO specify return type (need to update client to provide this first)
const buildPayload = (props: Props) => {
    return {
        tracking: {
            ophanPageId: window.guardian.config.ophan.pageViewId,
            ophanComponentId: 'ACQUISITIONS_EPIC',
            platformId: 'GUARDIAN_WEB',
            campaignCode,
            abTestName: testName,
            abTestVariant: 'dcr',
            referrerUrl: window.location.origin + window.location.pathname,
        },
        localisation: {
            countryCode: props.countryCode,
        },
        targeting: {
            contentType: props.contentType,
            sectionName: props.sectionName || '', // TODO update client to reflect that this is optional
            shouldHideReaderRevenue: props.shouldHideReaderRevenue,
            isMinuteArticle: props.isMinuteArticle,
            isPaidContent: props.isPaidContent,
            tags: props.tags,
            showSupportMessaging: shouldShowSupportMessaging(),
            isRecurringContributor: isRecurringContributor(
                props.isSignedIn || false,
            ),
            lastOneOffContributionDate: getLastOneOffContributionDate(),
            epicViewLog: getViewLog(),
            weeklyArticleHistory: getWeeklyArticleHistory(),
            mvtId: Number(getCookie('GU_mvt_id')),
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
    tags,
}: Props) => {
    const [data, setData] = useState<{
        slot?: {
            html: string;
            css: string;
        };
    }>();

    const [hasBeenSeen, setNode] = useHasBeenSeen({
        threshold: 0.5,
    }) as HasBeenSeen;

    useEffect(() => {
        const contributionsPayload = buildPayload({
            isSignedIn,
            countryCode,
            contentType,
            sectionName,
            shouldHideReaderRevenue,
            isMinuteArticle,
            isPaidContent,
            tags,
        });
        getBodyEnd(contributionsPayload)
            .then(checkForErrors)
            .then(response => response.json())
            .then(json =>
                setData({
                    slot: { html: json.data.html, css: json.data.css },
                }),
            )
            .then(() => sendOphanEvent('INSERT'))
            .catch(error =>
                window.guardian.modules.sentry.reportError(
                    error,
                    'slot-body-end',
                ),
            );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // only ever call once (we'd rather fail then call the API multiple times)

    useEffect(() => {
        // This won't be true until we've successfully fetched the data and
        // rendered the epic (because of how we're wiring up the ref below). And
        // because of the way the hook behaves, it'll only ever go from false ->
        // true once.
        if (hasBeenSeen) {
            // Add a new entry to the view log when we know an Epic is viewed
            logView(testName);
            sendOphanEvent('VIEW');
        }
    }, [hasBeenSeen]);

    if (data && data.slot) {
        return (
            <div ref={setNode} className={wrapperMargins}>
                {data.slot.css && <style>{data.slot.css}</style>}
                <div
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: data.slot.html }}
                />
            </div>
        );
    }

    return null;
};

export const SlotBodyEnd = ({
    isSignedIn,
    countryCode,
    contentType,
    sectionName,
    shouldHideReaderRevenue,
    isMinuteArticle,
    isPaidContent,
    tags,
}: Props) => {
    if (isSignedIn === undefined || countryCode === undefined) {
        return null;
    }

    // FIXME - used temporarily to exclude US from the DCR 5% test.
    // Please check with Slot Machine team if this condition can be removed.
    if (countryCode === 'US') {
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
            tags={tags}
        />
    );
};
