import React, { useEffect, useState, useRef } from 'react';
import { css } from 'emotion';
import {
    getBodyEnd,
    getViewLog,
    logView,
    getWeeklyArticleHistory,
} from '@guardian/automat-client';
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

type TestMeta = {
    abTestName: string;
    abTestVariant: string;
    campaignCode: string;
    campaignId: string;
};

const sendOphanEpicEvent = (action: OphanAction, testMeta: TestMeta): void => {
    const componentEvent = {
        component: {
            componentType: 'ACQUISITIONS_EPIC',
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

const sendOphanReminderEvent = (componentId: string): void => {
    const componentEvent = {
        component: {
            componentType: 'ACQUISITIONS_OTHER',
            id: componentId,
        },
        action: 'CLICK',
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
    isSensitive: boolean;
    tags: TagType[];
    contributionsServiceUrl: string;
};

interface InitAutomatJsConfig {
    epicRoot: HTMLElement | null;
    onReminderOpen?: Function;
}

interface AutomatJsCallback {
    buttonCopyAsString: string;
}

// TODO specify return type (need to update client to provide this first)
const buildPayload = (props: Props) => {
    return {
        tracking: {
            ophanPageId: window.guardian.config.ophan.pageViewId,
            ophanComponentId: 'ACQUISITIONS_EPIC',
            platformId: 'GUARDIAN_WEB',
            clientName: 'dcr',
            referrerUrl: window.location.origin + window.location.pathname,
        },
        targeting: {
            contentType: props.contentType,
            sectionName: props.sectionName || '', // TODO update client to reflect that this is optional
            shouldHideReaderRevenue: props.shouldHideReaderRevenue,
            isMinuteArticle: props.isMinuteArticle,
            isPaidContent: props.isPaidContent,
            isSensitive: props.isSensitive,
            tags: props.tags,
            showSupportMessaging: shouldShowSupportMessaging(),
            isRecurringContributor: isRecurringContributor(
                props.isSignedIn || false,
            ),
            lastOneOffContributionDate: getLastOneOffContributionDate(),
            epicViewLog: getViewLog(),
            weeklyArticleHistory: getWeeklyArticleHistory(),
            mvtId: Number(getCookie('GU_mvt_id')),
            countryCode: props.countryCode,
        },
    };
};

type SlotState = {
    html: string;
    css: string;
    js: string;
    meta: TestMeta;
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
    const [data, setData] = useState<{
        slot?: SlotState;
    }>();

    // Debounce the IntersectionObserver callback
    // to ensure the Slot is seen for at least 200ms before registering the view
    const debounce = true;
    const [hasBeenSeen, setNode] = useHasBeenSeen(
        {
            rootMargin: '-18px',
            threshold: 0,
        },
        debounce,
    ) as HasBeenSeen;

    const slotRoot = useRef<HTMLDivElement>(null);

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
            contributionsServiceUrl,
            isSensitive,
        });
        // getBodyEnd(contributionsPayload, `${contributionsServiceUrl}/epic`)
        getBodyEnd(contributionsPayload, 'http://localhost:8081/epic')
            .then(checkForErrors)
            .then(response => response.json())
            .then(json => {
                setData({
                    slot: {
                        html: json.data.html,
                        css: json.data.css,
                        js: json.data.js,
                        meta: json.data.meta,
                    },
                });

                sendOphanEpicEvent('INSERT', json.data.meta);
            })
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
            const meta = data?.slot?.meta;

            if (meta) {
                // Add a new entry to the view log when we know an Epic is viewed
                logView(meta.abTestName);
                sendOphanEpicEvent('VIEW', meta);
            }
        }
        // At the moment, given the information we currently store in data, it's
        // fine to add it as a dependency because it won't ever change after
        // viewing, so we shouldn't ever run the hook multiple times. If we _do_
        // ever have an implementation where information in data could change
        // after viewing, we'll need to revisit this. Perhaps it's clearer to
        // remove data from the dependencies and disable the exhaustive-deps
        // rule, as above.
    }, [hasBeenSeen, data]);

    // Rely on useEffect to run a function that initialises the slot once it's
    // been injected in the DOM.
    useEffect(() => {
        if (data && data.slot && data.slot.js) {
            // This should only be called once
            try {
                // eslint-disable-next-line no-eval
                window.eval(data.slot.js);
                if (typeof window.initAutomatJs === 'function') {
                    const initAutomatJsConfig: InitAutomatJsConfig = {
                        epicRoot: slotRoot.current,
                        onReminderOpen: (callbackParams: AutomatJsCallback) => {
                            const { buttonCopyAsString } = callbackParams;
                            // Track two separate Open events when the Reminder
                            // button is clicked
                            sendOphanReminderEvent(
                                'precontribution-reminder-prompt-clicked',
                            );
                            sendOphanReminderEvent(
                                `precontribution-reminder-prompt-copy-${buttonCopyAsString}`,
                            );
                        },
                    };
                    window.initAutomatJs(initAutomatJsConfig);
                }
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error(error);
                window.guardian.modules.sentry.reportError(
                    error,
                    'slot-body-end',
                );
            }
        }
    }, [data]);

    if (data && data.slot) {
        return (
            <div ref={setNode} className={wrapperMargins}>
                {data.slot.css && <style>{data.slot.css}</style>}
                <div
                    ref={slotRoot}
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
    isSensitive,
    tags,
    contributionsServiceUrl,
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
            isSensitive={isSensitive}
            tags={tags}
            contributionsServiceUrl={contributionsServiceUrl}
        />
    );
};
