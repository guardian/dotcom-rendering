import React, { useEffect, useState } from 'react';
import * as emotion from 'emotion';
import * as emotionCore from '@emotion/core';
import * as emotionTheming from 'emotion-theming';
import {
    getBodyEnd,
    getViewLog,
    logView,
    getWeeklyArticleHistory,
} from '@guardian/automat-client';
import {
    isRecurringContributor,
    getLastOneOffContributionDate, shouldHideSupportMessaging,
} from '@root/src/web/lib/contributions';
import { initPerf } from '@root/src/web/browser/initPerf';
import {sendOphanContributionsComponentEvent, TestMeta} from "@root/src/web/browser/ophan/ophan";
import { getCookie } from '../browser/cookie';
import { useHasBeenSeen } from '../lib/useHasBeenSeen';

const { css } = emotion;

type HasBeenSeen = [boolean, (el: HTMLDivElement) => void];

const checkForErrors = (response: any) => {
    if (!response.ok) {
        throw Error(
            response.statusText ||
                `SlotBodyEnd | An api call returned HTTP status ${response.status}`,
        );
    }
    return response;
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

interface OpenProps {
    buttonCopyAsString: string;
}

const sendOphanReminderOpenEvent = ({ buttonCopyAsString }: OpenProps) => {
    sendOphanReminderEvent('precontribution-reminder-prompt-clicked');
    sendOphanReminderEvent(
        `precontribution-reminder-prompt-copy-${buttonCopyAsString}`,
    );
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
            showSupportMessaging: !shouldHideSupportMessaging(props.isSignedIn || false),
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
    const [Epic, setEpic] = useState<React.FC>();
    const [epicProps, setEpicProps] = useState<{}>();
    const [epicMeta, setEpicMeta] = useState<TestMeta>();

    const [hasBeenSeen, setNode] = useHasBeenSeen({
        rootMargin: '-18px',
        threshold: 0,
        debounce: true,
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
            contributionsServiceUrl,
            isSensitive,
        });

        window.guardian.automat = {
            react: React,
            emotionCore,
            emotionTheming,
            emotion,
        };

        const dataPerf = initPerf('contributions-epic-data');
        dataPerf.start();

        getBodyEnd(
            contributionsPayload,
            `${contributionsServiceUrl}/epic?dataOnly=true`,
        )
            .then(response => {
                dataPerf.end();
                return checkForErrors(response);
            })
            .then(response => response.json())
            .then(json => {
                if (!json.data) {
                    return;
                }

                const { meta, module } = json.data;

                const modulePerf = initPerf('contributions-epic-module');
                modulePerf.start();

                // eslint-disable-next-line no-restricted-globals
                window.guardian.functions
                    .import(module.url)
                    .then(epicModule => {
                        modulePerf.end();
                        setEpicMeta(meta);
                        setEpicProps({
                            ...module.props,
                            onReminderOpen: sendOphanReminderOpenEvent,
                        });
                        setEpic(() => epicModule.ContributionsEpic); // useState requires functions to be wrapped
                        sendOphanContributionsComponentEvent('INSERT', meta, 'ACQUISITIONS_EPIC');
                    })
                    // eslint-disable-next-line no-console
                    .catch(error => console.log(`epic - error is: ${error}`));
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Should only run once
    useEffect(() => {
        if (hasBeenSeen && epicMeta) {
            logView(epicMeta.abTestName);
            sendOphanContributionsComponentEvent('VIEW', epicMeta, 'ACQUISITIONS_EPIC');
        }
    }, [hasBeenSeen, epicMeta]);

    if (Epic) {
        return (
            <div ref={setNode} className={wrapperMargins}>
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <Epic {...epicProps} />
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
