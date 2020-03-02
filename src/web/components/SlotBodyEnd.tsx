import React, { useCallback } from 'react';
import { css } from 'emotion';
import { getBodyEnd, getViewLog, logView } from '@guardian/slot-machine-client';
import {
    shouldShowSupportMessaging,
    isRecurringContributor,
    getLastOneOffContributionDate,
} from '@root/src/web/lib/contributions';
import { useApiFn } from '../lib/api';

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
    // Hardcoding the test ID until we have A/B testing (variants) capability in DCR.
    const epicTestName = 'DotcomRenderingEpic';
    // Load the view log from localStorage so it can be added to the Contributions payload
    const epicViewLog = getViewLog();

    const contributionsPayload = {
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
            countryCode,
        },
        targeting: {
            contentType,
            sectionName: sectionName || '', // TODO update client to reflect that this is optional
            shouldHideReaderRevenue,
            isMinuteArticle,
            isPaidContent,
            tags,
            showSupportMessaging: shouldShowSupportMessaging(),
            isRecurringContributor: isRecurringContributor(isSignedIn),
            lastOneOffContributionDate: getLastOneOffContributionDate(),
            epicViewLog,
        },
    };

    const getSlot: () => Promise<Response> = useCallback(
        () => getBodyEnd(contributionsPayload),
        [], // empty as we only want to call the API once and payload will always fail a reference equality check anyway
    );

    const { data: bodyResponse, error } = useApiFn<{
        data: { html: string; css: string };
    }>(getSlot);

    if (error) {
        window.guardian.modules.sentry.reportError(error, 'slot-body-end');
    }

    if (bodyResponse && bodyResponse.data) {
        // Add a new entry to the view log when we know an Epic is being rendered
        logView(epicTestName);
        const { html: epicHtml, css: epicCss } = bodyResponse.data;
        return (
            <div className={wrapperMargins}>
                {epicCss && <style>{epicCss}</style>}
                <div
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: epicHtml }}
                />
            </div>
        );
    }

    return null;
};
