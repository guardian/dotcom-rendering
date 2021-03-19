import React, { useEffect, useState } from 'react';
import * as emotion from 'emotion';
import * as emotionCore from '@emotion/core';
import * as emotionTheming from 'emotion-theming';
import { useHasBeenSeen } from '@root/src/web/lib/useHasBeenSeen';
import { logView } from '@root/node_modules/@guardian/automat-client';
import { shouldHideSupportMessaging } from '@root/src/web/lib/contributions';
import {
	sendOphanComponentEvent,
	submitComponentEvent,
} from '@root/src/web/browser/ophan/ophan';
import { getZIndex } from '@root/src/web/lib/getZIndex';
import { trackNonClickInteraction } from '@root/src/web/browser/ga/ga';
import { CanShowResult } from '@root/src/web/lib/messagePicker';

const checkForErrors = (response: Response) => {
	if (!response.ok) {
		throw Error(
			response.statusText ||
				`SlotPuzzlesBanner | An api call returned HTTP status ${response.status}`,
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
	tags: TagType[];
	contributionsServiceUrl: string;
};

type CanShowProps = BaseProps & {
	asyncCountryCode: Promise<string>;
	remoteBannerConfig: boolean;
};

const getPuzzlesBanner = (
	url: string,
): Promise<Response> => {
	return fetch(url, {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
	});
};

export const canShow = async ({
	remoteBannerConfig,
	isSignedIn,
	contentType,
	sectionName,
	shouldHideReaderRevenue,
	tags,
	contributionsServiceUrl
}: CanShowProps): Promise<CanShowResult> => {
	if (!remoteBannerConfig) return { result: false };

	if (shouldHideReaderRevenue) {
		// We never serve Reader Revenue banners in this case
		return { result: false };
	}

	if (
		// TODO: check if is in A/B test
		window.guardian.config.page.section === "crosswords" || window.guardian.config.page.series === "Sudoku"
	) {
		return getPuzzlesBanner(`${contributionsServiceUrl}/puzzles`)
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
