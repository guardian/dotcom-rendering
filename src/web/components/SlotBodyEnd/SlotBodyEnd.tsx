import React, { useState } from 'react';
import { useOnce } from '@root/src/web/lib/useOnce';

import {
	pickMessage,
	SlotConfig,
	MaybeFC,
	CandidateConfig,
} from '@root/src/web/lib/messagePicker';

import { BrazeMessagesInterface } from 'src/web/lib/braze/BrazeMessages';
import {
	ReaderRevenueEpic,
	canShow as canShowReaderRevenueEpic,
} from './ReaderRevenueEpic';
import { MaybeBrazeEpic, canShow as canShowBrazeEpic } from './BrazeEpic';

type Props = {
	isSignedIn?: boolean;
	countryCode?: string;
	contentType: string;
	sectionName?: string;
	shouldHideReaderRevenue: boolean;
	isMinuteArticle: boolean;
	isPaidContent: boolean;
	tags: TagType[];
	contributionsServiceUrl: string;
	brazeMessages?: Promise<BrazeMessagesInterface>;
};

const buildReaderRevenueEpicConfig = ({
	isSignedIn,
	countryCode,
	contentType,
	sectionName,
	shouldHideReaderRevenue,
	isMinuteArticle,
	isPaidContent,
	tags,
	contributionsServiceUrl,
}: any): CandidateConfig => {
	return {
		candidate: {
			id: 'reader-revenue-banner',
			canShow: () =>
				canShowReaderRevenueEpic({
					isSignedIn,
					countryCode,
					contentType,
					sectionName,
					shouldHideReaderRevenue,
					isMinuteArticle,
					isPaidContent,
					tags,
					contributionsServiceUrl,
				}),
			show: (meta: any) => () => {
				/* eslint-disable-next-line react/jsx-props-no-spreading */
				return <ReaderRevenueEpic {...meta} />;
			},
		},
		timeoutMillis: null,
	};
};

const buildBrazeEpicConfig = (
	brazeMessages: Promise<BrazeMessagesInterface>,
	contributionsServiceUrl: string,
	countryCode: string,
): CandidateConfig => {
	return {
		candidate: {
			id: 'braze-epic',
			canShow: () => canShowBrazeEpic(brazeMessages),
			show: (meta: any) => () => (
				<MaybeBrazeEpic
					meta={meta}
					contributionsServiceUrl={contributionsServiceUrl}
					countryCode={countryCode}
				/>
			),
		},
		timeoutMillis: null,
	};
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
	contributionsServiceUrl,
	brazeMessages,
}: Props) => {
	const [SelectedEpic, setSelectedEpic] = useState<React.FC | null>(null);
	useOnce(() => {
		const readerRevenueEpic = buildReaderRevenueEpicConfig({
			isSignedIn,
			countryCode,
			contentType,
			sectionName,
			shouldHideReaderRevenue,
			isMinuteArticle,
			isPaidContent,
			tags,
			contributionsServiceUrl,
		});
		const brazeEpic = buildBrazeEpicConfig(
			brazeMessages as Promise<BrazeMessagesInterface>,
			contributionsServiceUrl,
			countryCode as string,
		);
		const epicConfig: SlotConfig = {
			candidates: [readerRevenueEpic, brazeEpic],
			name: 'slotBodyEnd',
		};

		pickMessage(epicConfig)
			.then((PickedEpic: () => MaybeFC) => setSelectedEpic(PickedEpic))
			.catch((e) =>
				console.error(`SlotBodyEnd pickMessage - error: ${e}`),
			);
	}, [isSignedIn, countryCode, brazeMessages]);

	if (SelectedEpic) {
		return <SelectedEpic />;
	}

	return null;
};
