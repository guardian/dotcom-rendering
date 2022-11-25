import { Hide } from '@guardian/source-react-components';
import type { Switches } from '../../types/config';
import type { TagType } from '../../types/tag';
import { EnhancePinnedPost } from '../components/EnhancePinnedPost.importable';
import { FilterKeyEventsToggle } from '../components/FilterKeyEventsToggle.importable';
import { Island } from '../components/Island';
import { KeyEventsCarousel } from '../components/KeyEventsCarousel.importable';
import { LiveBlock } from '../components/LiveBlock';
import { LiveBlogBlocksAndAdverts } from '../components/LiveBlogBlocksAndAdverts';
import { LiveBlogEpic } from '../components/LiveBlogEpic.importable';
import { PinnedPost } from '../components/PinnedPost';
import {
	hasRelevantTopics,
	TopicFilterBank,
} from '../components/TopicFilterBank.importable';

type Props = {
	format: ArticleFormat;
	blocks: Block[];
	adTargeting: AdTargeting;
	pinnedPost?: Block;
	host?: string;
	pageId: string;
	webTitle: string;
	ajaxUrl: string;
	isAdFreeUser: boolean;
	isSensitive: boolean;
	switches: Switches;
	isLiveUpdate?: boolean;
	section: string;
	shouldHideReaderRevenue: boolean;
	tags: TagType[];
	isPaidContent: boolean;
	keywordIds: string;
	contributionsServiceUrl: string;
	onFirstPage?: boolean;
	keyEvents?: Block[];
	filterKeyEvents?: boolean;
	availableTopics?: Topic[];
	selectedTopics?: Topic[];
};

export const LiveBlogRenderer = ({
	format,
	blocks,
	pinnedPost,
	adTargeting,
	host,
	pageId,
	webTitle,
	ajaxUrl,
	switches,
	isAdFreeUser,
	isSensitive,
	isLiveUpdate,
	section,
	shouldHideReaderRevenue,
	tags,
	isPaidContent,
	keywordIds,
	contributionsServiceUrl,
	onFirstPage,
	keyEvents,
	filterKeyEvents = false,
	availableTopics,
	selectedTopics,
}: Props) => {
	const filtered =
		(selectedTopics && selectedTopics.length > 0) || filterKeyEvents;

	return (
		<>
			{pinnedPost && onFirstPage && !filtered && (
				<>
					<Island clientOnly={true} deferUntil="idle">
						<EnhancePinnedPost />
					</Island>
					<PinnedPost pinnedPost={pinnedPost} format={format}>
						<LiveBlock
							format={format}
							block={pinnedPost}
							pageId={pageId}
							webTitle={webTitle}
							adTargeting={adTargeting}
							host={host}
							ajaxUrl={ajaxUrl}
							isLiveUpdate={isLiveUpdate}
							switches={switches}
							isAdFreeUser={isAdFreeUser}
							isSensitive={isSensitive}
							isPinnedPost={true}
						/>
					</PinnedPost>
				</>
			)}
			{keyEvents?.length ? (
				<Hide above="desktop">
					<Island deferUntil="visible">
						<KeyEventsCarousel
							keyEvents={keyEvents}
							filterKeyEvents={filterKeyEvents}
							format={format}
							id={'key-events-carousel-mobile'}
						/>
					</Island>
					{(!switches.automaticFilters || !availableTopics) && (
						<Island deferUntil="visible">
							<FilterKeyEventsToggle
								filterKeyEvents={filterKeyEvents}
								id="filter-toggle-mobile"
							/>
						</Island>
					)}
				</Hide>
			) : (
				<></>
			)}

			{switches.automaticFilters &&
				hasRelevantTopics(availableTopics) && (
					<Hide above="desktop">
						<Island>
							<TopicFilterBank
								availableTopics={availableTopics}
								selectedTopics={selectedTopics}
								format={format}
								keyEvents={keyEvents}
								filterKeyEvents={filterKeyEvents}
								id={'key-events-carousel-mobile'}
							/>
						</Island>
					</Hide>
				)}
			<div id="top-of-blog" />
			<LiveBlogBlocksAndAdverts
				blocks={blocks}
				format={format}
				pageId={pageId}
				webTitle={webTitle}
				adTargeting={adTargeting}
				host={host}
				ajaxUrl={ajaxUrl}
				isLiveUpdate={isLiveUpdate}
				switches={switches}
				isAdFreeUser={isAdFreeUser}
				isSensitive={isSensitive}
				pinnedPost={pinnedPost}
			/>
			{blocks.length > 4 && (
				<Island clientOnly={true}>
					<LiveBlogEpic
						section={section}
						shouldHideReaderRevenue={shouldHideReaderRevenue}
						tags={tags}
						isPaidContent={isPaidContent}
						contributionsServiceUrl={contributionsServiceUrl}
						pageId={pageId}
						keywordIds={keywordIds}
					/>
				</Island>
			)}
		</>
	);
};
