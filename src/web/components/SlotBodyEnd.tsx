import React from 'react';
import { css } from 'emotion';
import {
    shouldShowSupportMessaging,
    isRecurringContributor,
    getLastOneOffContributionDate,
} from '@root/src/web/lib/contributions';
import { useApi } from '../lib/api';

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
            sectionName,
            shouldHideReaderRevenue,
            isMinuteArticle,
            isPaidContent,
            tags,
            showSupportMessaging: shouldShowSupportMessaging(),
            isRecurringContributor: isRecurringContributor(isSignedIn),
            lastOneOffContributionDate: getLastOneOffContributionDate(),
        },
    };

    const { data: bodyResponse, error } = useApi<{
        data: { html: string; css: string };
    }>('http://localhost:8081/epic', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contributionsPayload),
    });

    if (error) {
        window.guardian.modules.sentry.reportError(error, 'slot-body-end');
    }

    if (bodyResponse && bodyResponse.data) {
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
