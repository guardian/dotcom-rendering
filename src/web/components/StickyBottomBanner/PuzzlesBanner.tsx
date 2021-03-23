import React, { useEffect, useState } from 'react';
import * as emotion from 'emotion';
import * as emotionCore from '@emotion/core';
import * as emotionTheming from 'emotion-theming';
import { useHasBeenSeen } from '@root/src/web/lib/useHasBeenSeen';
import {
	getWeeklyArticleHistory,
	logView,
} from '@root/node_modules/@guardian/automat-client';
import {
	shouldHideSupportMessaging,
	getArticleCountConsent,
} from '@root/src/web/lib/contributions';
import {
	sendOphanComponentEvent,
	submitComponentEvent,
} from '@root/src/web/browser/ophan/ophan';
import { getCookie } from '@root/src/web/browser/cookie';
import { getZIndex } from '@root/src/web/lib/getZIndex';
import { trackNonClickInteraction } from '@root/src/web/browser/ga/ga';
import { WeeklyArticleHistory } from '@root/node_modules/@guardian/automat-client/dist/types';
import { CanShowResult } from '@root/src/web/lib/messagePicker';

const checkForErrors = (response: Response) => {
	if (!response.ok) {
		throw Error(
			response.statusText ||
				`SlotBanner | An api call returned HTTP status ${response.status}`,
		);
	}
	return response;
};

type HasBeenSeen = [boolean, (el: HTMLDivElement) => void];

type BaseProps = {
	isSignedIn: boolean;
	contentType: string;
	sectionName?: string;
	shouldHideReaderRevenue: boolean;
	isMinuteArticle: boolean;
	isPaidContent: boolean;
	isSensitive: boolean;
	tags: TagType[];
	contributionsServiceUrl: string;
	alreadyVisitedCount: number;
	engagementBannerLastClosedAt?: string;
	subscriptionBannerLastClosedAt?: string;
	weeklyArticleHistory?: WeeklyArticleHistory;
};

type BuildPayloadProps = BaseProps & {
	countryCode: string;
	hasConsentedToArticleCounts: boolean;
};

type CanShowProps = BaseProps & {
	asyncCountryCode: Promise<string>;
	remotePuzzlesBannerConfig: boolean;
};

// TODO specify return type (need to update client to provide this first)
const buildPayload = (props: BuildPayloadProps) => {
	return {
		tracking: {
			ophanPageId: window.guardian.config.ophan.pageViewId,
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
			subscriptionBannerLastClosedAt:
				props.subscriptionBannerLastClosedAt,
			mvtId: Number(getCookie('GU_mvt_id')),
			countryCode: props.countryCode,
			weeklyArticleHistory: getWeeklyArticleHistory(),
			hasOptedOutOfArticleCount: !props.hasConsentedToArticleCounts,
		},
	};
};

const getPuzzlesBanner = (
	meta: { [key: string]: any },
	url: string,
): Promise<Response> => {
	const json = JSON.stringify(meta);
	return fetch(url, {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: json,
	});
};

export const canShow = async ({
	remotePuzzlesBannerConfig,
	isSignedIn,
	asyncCountryCode,
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
	subscriptionBannerLastClosedAt,
}: CanShowProps): Promise<CanShowResult> => {
	const isPuzzlesPage =
		window.guardian.config.page.section === 'crosswords' ||
		window.guardian.config.page.series === 'Sudoku';

	if (shouldHideReaderRevenue) {
		// We never serve Reader Revenue banners in this case
		return { result: false };
	}

	if (isPuzzlesPage && remotePuzzlesBannerConfig) {
		// TODO: add check of puzzlesBanner switch when this has been added
		const countryCode = await asyncCountryCode;
		const hasConsentedToArticleCounts = await getArticleCountConsent();
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
			subscriptionBannerLastClosedAt,
			hasConsentedToArticleCounts,
		});
		return getPuzzlesBanner(
			bannerPayload,
			`${contributionsServiceUrl}/puzzles`,
		)
			.then(checkForErrors)
			.then((response) => response.json())
			.then((json: { data?: any }) => {
				if (!json.data) {
					return { result: false };
				}

				const { module, meta } = json.data;

				return { result: true, meta: { module, meta } };
			});
	}

	return { result: false };
};

type Props = {
	meta: any;
	module: { url: string; name: string; props: any[] };
};

export const PuzzlesBanner = ({ meta, module }: Props) => {
	const [Banner, setBanner] = useState<React.FC>();

	const [hasBeenSeen, setNode] = useHasBeenSeen({
		threshold: 0,
		debounce: true,
	}) as HasBeenSeen;

	useEffect(() => {
		if (module === undefined || meta === undefined) {
			return;
		}

		window.guardian.automat = {
			react: React,
			preact: React,
			emotionCore,
			emotionTheming,
			emotion,
		};

		window
			.guardianPolyfilledImport(module.url)
			.then((bannerModule: { [key: string]: JSX.Element }) => {
				setBanner(() => bannerModule[module.name]); // useState requires functions to be wrapped
				sendOphanComponentEvent('INSERT', meta);
			})
			.catch((error) =>
				// eslint-disable-next-line no-console
				console.log(`banner - error is: ${error}`),
			);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Should only run once
	useEffect(() => {
		if (hasBeenSeen && meta) {
			const { abTestName, componentType } = meta;

			logView(abTestName);

			sendOphanComponentEvent('VIEW', meta);

			// track banner view event in Google Analytics for subscriptions banner
			if (componentType === 'ACQUISITIONS_PUZZLES_BANNER') {
				trackNonClickInteraction('puzzles-banner : display');
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hasBeenSeen]);

	if (Banner) {
		return (
			// The css here is necessary to put the container div in view, so that we can track the view
			<div
				ref={setNode}
				className={emotion.css`width: 100%; ${getZIndex('banner')}`}
			>
				{/* eslint-disable react/jsx-props-no-spreading */}
				<Banner
					{...module.props}
					// @ts-ignore
					submitComponentEvent={submitComponentEvent}
				/>
				{/* eslint-enable react/jsx-props-no-spreading */}
			</div>
		);
	}

	return null;
};
