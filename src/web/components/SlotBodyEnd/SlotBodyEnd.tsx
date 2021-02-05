import React, { useState } from 'react';
import { useOnce } from '@root/src/web/lib/useOnce';

import {
	pickMessage,
	SlotConfig,
	MaybeFC,
	CandidateConfig,
} from '@root/src/web/lib/messagePicker';

import {
	ReaderRevenueEpic,
	canShow as canShowReaderRevenueEpic,
} from './ReaderRevenueEpic';

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

const buildReaderRevenueEpicConfig = ({
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
					isSensitive,
					tags,
					contributionsServiceUrl,
				}),
			/* eslint-disable-next-line react/jsx-props-no-spreading */
			show: (meta: any) => () => <ReaderRevenueEpic {...meta} />,
		},
		timeoutMillis: null, // TODO: do we want a timeout?
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
	isSensitive,
	tags,
	contributionsServiceUrl,
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
			isSensitive,
			tags,
			contributionsServiceUrl,
		});
		const epicConfig: SlotConfig = {
			candidates: [readerRevenueEpic],
			name: 'slotBodyEnd',
		};

		pickMessage(epicConfig).then((PickedEpic: () => MaybeFC) =>
			setSelectedEpic(PickedEpic),
		);
	}, [isSignedIn, countryCode]);

	if (SelectedEpic) {
		return <SelectedEpic />;
	}

	return null;
};
