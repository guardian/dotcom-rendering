import React from 'react';
import { css } from 'emotion';
import { useApi } from '@root/src/web/components/lib/api';

const wrapperMargins = css`
    margin: 18px 0;
`;

export const SlotBodyEnd = () => {
    // Page properties needed by Contributions service
    // Destructuring for convenience
    const {
        contentType,
        sectionName,
        shouldHideReaderRevenue,
        pageType,
        tags,
    } = window.guardian.app.data.CAPI;

    const { isMinuteArticle, isPaidContent } = pageType;

    // Putting together the request payload
    const postBody = {
        tracking: {
            ophanPageId: window.guardian.config.ophan.pageViewId,
            ophanComponentId: 'ACQUISITIONS_EPIC',
            platformId: 'GUARDIAN_WEB',
            campaignCode: 'gdnwb_copts_memco_remote_epic_test_api',
            abTestName: 'remote_epic_test',
            abTestVariant: 'api',
            referrerUrl: window.location.href.split('?')[0],
        },
        localisation: {
            countryCode: 'GB', // TODO: make this dynamic
        },
        targeting: {
            contentType,
            sectionName,
            shouldHideReaderRevenue,
            isMinuteArticle,
            isPaidContent,
            tags,
        },
    };

    // const endpointUrl = 'https://contributions.guardianapis.com/epic';
    const endpointUrl = 'http://localhost:8081/epic';
    const { data, error } = useApi(endpointUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postBody),
    });

    if (error) {
        window.guardian.modules.sentry.reportError(error, 'slot-body-end');
        return null;
    }

    if (data && data.html) {
        return (
            <div className={wrapperMargins}>
                {data.css && <style>{data.css}</style>}
                <div
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: data.html }}
                />
            </div>
        );
    }

    return null;
};
