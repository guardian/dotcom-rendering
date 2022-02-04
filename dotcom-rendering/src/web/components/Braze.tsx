import { useState, useEffect } from 'react';
import { ArticleDesign, storage } from '@guardian/libs';
import { BrazeMessagesInterface } from '@guardian/braze-components';
import {
	incrementWeeklyArticleCount,
	getWeeklyArticleHistory,
} from '@guardian/support-dotcom-components';
import { WeeklyArticleHistory } from '@guardian/support-dotcom-components/dist/dotcom/src/types';
import { parse } from 'src/lib/slot-machine-flags';
import { buildBrazeMessages } from '../lib/braze/buildBrazeMessages';
import { SlotBodyEnd } from './SlotBodyEnd/SlotBodyEnd';
import { StickyBottomBanner } from './StickyBottomBanner/StickyBottomBanner';
import { hasOptedOutOfArticleCount } from '../lib/contributions';
import { incrementDailyArticleCount } from '../lib/dailyArticleCount';
import { useOnce } from '../lib/useOnce';

type Props = {
	idApiUrl: string;
	contentType: string;
	sectionName?: string;
	shouldHideReaderRevenue: boolean;
	isMinuteArticle: boolean;
	isPaidContent: boolean;
	tags: TagType[];
	contributionsServiceUrl: string;
	stage: string;
	section: string;
	isPreview: boolean;
	isSensitive: boolean;
	switches: Switches;
	keywordIds: string;
	pageId: string;
	slotMachineFlags?: string;
	format: ArticleFormat;
};

function shouldShowSlotBodyEnd(
	format: ArticleFormat,
	switches: Switches,
	slotMachineFlags?: string,
) {
	if (!switches.slotBodyEnd) return false;
	if (!parse(slotMachineFlags || '').showBodyEnd) return false;

	switch (format.design) {
		case ArticleDesign.Interactive:
		case ArticleDesign.FullPageInteractive:
			return false;
		default:
			return true;
	}
}

export const Braze = ({
	idApiUrl,
	contentType,
	sectionName,
	shouldHideReaderRevenue,
	isMinuteArticle,
	isPaidContent,
	tags,
	contributionsServiceUrl,
	stage,
	section,
	isPreview,
	isSensitive,
	switches,
	keywordIds,
	pageId,
	slotMachineFlags,
	format,
}: Props) => {
	const [brazeMessages, setBrazeMessages] =
		useState<Promise<BrazeMessagesInterface>>();

	const [asyncArticleCount, setAsyncArticleCount] =
		useState<Promise<WeeklyArticleHistory | undefined>>();

	useOnce(() => {
		setBrazeMessages(buildBrazeMessages(idApiUrl));
	}, [idApiUrl]);

	// Log an article view using the Slot Machine client lib
	// This function must be called once per article serving.
	// We should monitor this function call to ensure it only happens within an
	// article pages when other pages are supported by DCR.
	useEffect(() => {
		const incrementArticleCountsIfConsented = async () => {
			const hasOptedOut = await hasOptedOutOfArticleCount();
			if (!hasOptedOut) {
				incrementDailyArticleCount();
				incrementWeeklyArticleCount(
					storage.local,
					pageId,
					keywordIds.split(','),
				);
			}
		};

		setAsyncArticleCount(
			incrementArticleCountsIfConsented().then(() =>
				getWeeklyArticleHistory(storage.local),
			),
		);
	}, [pageId, keywordIds]);

	const showBodyEndSlot = shouldShowSlotBodyEnd(
		format,
		switches,
		slotMachineFlags,
	);

	return (
		<>
			{showBodyEndSlot && (
				<SlotBodyEnd
					contentType={contentType}
					sectionName={sectionName}
					sectionId={section}
					shouldHideReaderRevenue={shouldHideReaderRevenue}
					isMinuteArticle={isMinuteArticle}
					isPaidContent={isPaidContent}
					tags={tags}
					contributionsServiceUrl={contributionsServiceUrl}
					brazeMessages={brazeMessages}
					idApiUrl={idApiUrl}
					stage={stage}
					asyncArticleCount={asyncArticleCount}
				/>
			)}

			<StickyBottomBanner
				brazeMessages={brazeMessages}
				asyncArticleCount={asyncArticleCount}
				contentType={contentType}
				sectionName={sectionName}
				section={section}
				tags={tags}
				isPaidContent={isPaidContent}
				isPreview={!!isPreview}
				shouldHideReaderRevenue={shouldHideReaderRevenue}
				isMinuteArticle={isMinuteArticle}
				isSensitive={isSensitive}
				contributionsServiceUrl={contributionsServiceUrl}
				idApiUrl={idApiUrl}
				switches={switches}
			/>
		</>
	);
};
