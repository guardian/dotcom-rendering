import React, { useEffect, useState } from 'react';
import { css } from 'emotion';
import { getBodyEnd, getViewLog } from '@guardian/slot-machine-client';
import {
    shouldShowSupportMessaging,
    isRecurringContributor,
    getLastOneOffContributionDate,
} from '@root/src/web/lib/contributions';
import { getCookie } from '../browser/cookie';

const checkForErrors = (response: any) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
};

const sendOphanInsertEvent = (): void => {
    const componentEvent = {
        component: {
            componentType: 'ACQUISITIONS_EPIC',
            products: ['CONTRIBUTION', 'MEMBERSHIP_SUPPORTER'],
            campaignCode: 'gdnwb_copts_memco_remote_epic_test_api',
            id: 'gdnwb_copts_memco_remote_epic_test_api',
        },
        abTest: {
            name: 'remote_epic_test',
            variant: 'remote',
        },
        action: 'INSERT',
    };

    window.guardian.ophan.record({ componentEvent });
};

const wrapperMargins = css`
    margin: 18px 0;
`;

type Props = {
    isSignedIn: boolean;
    countryCode: string;
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
            campaignCode: 'gdnwb_copts_memco_remote_epic_test_api',
            abTestName: 'remote_epic_test',
            abTestVariant: 'api',
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
            isRecurringContributor: isRecurringContributor(props.isSignedIn),
            lastOneOffContributionDate: getLastOneOffContributionDate(),
            epicViewLog: getViewLog(),
            mvtId: Number(getCookie('GU_mvt_id')),
        },
    };
};

// Warning, we only fetch slot data on initial render and then *never again*.
// This is because we only want to call the Slot API once for both scaling and
// simplicity reasons (monitoring, UX, etc.). So make sure to only call this
// component when you have the data you need.
export const SlotBodyEnd = (props: Props) => {
    const [data, setData] = useState<{
        slot?: {
            html: string;
            css: string;
        };
    }>();

    useEffect(() => {
        const contributionsPayload = buildPayload(props);
        getBodyEnd(contributionsPayload)
            .then(response => response.json())
            .then(checkForErrors)
            .then(json =>
                setData({
                    slot: { html: json.data.html, css: json.data.css },
                }),
            )
            .then(_ => sendOphanInsertEvent())
            .catch(error =>
                window.guardian.modules.sentry.reportError(
                    error,
                    'slot-body-end',
                ),
            );
    }, []); // only ever call once (we'd rather fail then call the API multiple times)

    if (data && data.slot) {
        return (
            <div className={wrapperMargins}>
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
