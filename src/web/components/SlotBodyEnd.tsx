import React, { useEffect, useState } from 'react';
import { css } from 'emotion';
import {
    shouldShowSupportMessaging,
    isRecurringContributor,
    getLastOneOffContributionDate,
} from '@root/src/web/lib/contributions';

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
    const [epicContent, setEpicContent] = useState<{ html: string; css: string}>();

    useEffect(() => {
        const callFetch = async () => {
            // Putting together the request payload
            const contributionsPayload = {
                tracking: {
                    ophanPageId: window?.guardian.config.ophan.pageViewId,
                    ophanComponentId: 'ACQUISITIONS_EPIC',
                    platformId: 'GUARDIAN_WEB',
                    campaignCode: 'gdnwb_copts_memco_remote_epic_test_api',
                    abTestName: 'remote_epic_test',
                    abTestVariant: 'api',
                    referrerUrl: window?.location.origin + window?.location.pathname
                },
                localisation: {
                    countryCode
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

            const getEpicContent = () => {
                // const endpointUrl = 'https://contributions.guardianapis.com/epic';
                const endpointUrl = 'http://localhost:8081/epic';
                return fetch(endpointUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(contributionsPayload)
                })
                .then((response) => {
                    if (!response.ok) {
                        const apiError = new Error(response.statusText);
                        window.guardian.modules.sentry.reportError(apiError, 'slot-body-end');
                    }
                    return response;
                })
                .then(response => response.json())
            }
            const epicResponse = await getEpicContent();
            setEpicContent(epicResponse.data);
        };
        callFetch();
    }, [isSignedIn, countryCode]);

    if (epicContent) {
        return (
            <div className={wrapperMargins}>
                {epicContent.css && <style>{epicContent.css}</style>}
                <div
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: epicContent.html }}
                />
            </div>
        );
    }

    return null;
};
