import { Hide } from '@guardian/source-react-components';
import type { EditionId } from '../lib/edition';
import type { ServerSideTests, Switches } from '../types/config';
import type { TagType } from '../types/tag';
import { useConfig } from './ConfigContext';
import { EnhancePinnedPost } from './EnhancePinnedPost.importable';
import { FilterKeyEventsToggle } from './FilterKeyEventsToggle.importable';
import { Island } from './Island';
import { KeyEventsCarousel } from './KeyEventsCarousel.importable';
import { LiveBlock } from './LiveBlock';
import { LiveBlogBlocksAndAdverts } from './LiveBlogBlocksAndAdverts';
import { LiveBlogEpic } from './LiveBlogEpic.importable';
import { PinnedPost } from './PinnedPost';
import { hasRelevantTopics, TopicFilterBank } from './TopicFilterBank';

type Props = {
	format: ArticleFormat;
	blocks: Block[];
	editionId: EditionId;
	pinnedPost?: Block;
	host?: string;
	pageId: string;
	webTitle: string;
	ajaxUrl: string;
	isAdFreeUser: boolean;
	isSensitive: boolean;
	abTests: ServerSideTests;
	switches: Switches;
	isLiveUpdate?: boolean;
	sectionId: string;
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
	host,
	pageId,
	webTitle,
	ajaxUrl,
	abTests,
	switches,
	isAdFreeUser,
	isSensitive,
	isLiveUpdate,
	sectionId,
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
	editionId,
}: Props) => {
	const { renderingTarget } = useConfig();
	const isWeb = renderingTarget === 'Web';
	const { absoluteServerTimes = false } = switches;

	const filtered =
		(!!selectedTopics && selectedTopics.length > 0) || filterKeyEvents;

	return (
		<>
			{pinnedPost && onFirstPage && !filtered && (
				<>
					<Island defer={{ until: 'idle' }} priority="feature">
						<EnhancePinnedPost />
					</Island>
					<PinnedPost
						pinnedPost={pinnedPost}
						format={format}
						absoluteServerTimes={absoluteServerTimes}
					>
						<LiveBlock
							format={format}
							block={pinnedPost}
							pageId={pageId}
							webTitle={webTitle}
							host={host}
							ajaxUrl={ajaxUrl}
							isLiveUpdate={isLiveUpdate}
							abTests={abTests}
							switches={switches}
							isAdFreeUser={isAdFreeUser}
							isSensitive={isSensitive}
							isPinnedPost={true}
							editionId={editionId}
						/>
					</PinnedPost>
				</>
			)}
			{keyEvents !== undefined && keyEvents.length > 0 ? (
				<Hide from="desktop">
					<Island priority="feature" defer={{ until: 'visible' }}>
						<KeyEventsCarousel
							keyEvents={keyEvents}
							filterKeyEvents={filterKeyEvents}
							id={'key-events-carousel-mobile'}
							absoluteServerTimes={absoluteServerTimes}
						/>
					</Island>
					{(!switches.automaticFilters || !availableTopics) && (
						<Island priority="feature" defer={{ until: 'visible' }}>
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
						<TopicFilterBank
							availableTopics={availableTopics}
							selectedTopics={selectedTopics}
							format={format}
							keyEvents={keyEvents}
							filterKeyEvents={filterKeyEvents}
							id={'key-events-carousel-mobile'}
						/>
					</Hide>
				)}
			<div id="top-of-blog" />
			<LiveBlogBlocksAndAdverts
				blocks={blocks}
				format={format}
				pageId={pageId}
				webTitle={webTitle}
				host={host}
				ajaxUrl={ajaxUrl}
				isLiveUpdate={isLiveUpdate}
				abTests={abTests}
				switches={switches}
				isAdFreeUser={isAdFreeUser}
				isSensitive={isSensitive}
				pinnedPost={pinnedPost}
				editionId={editionId}
			/>
			{isWeb && blocks.length > 4 && (
				<Island
					priority="feature"
					// this should really be deferred until visible,
					// but this island manipulate the DOM via portals,
					// its actual position has no bearing on its effect
					defer={{ until: 'idle' }}
				>
					<LiveBlogEpic
						sectionId={sectionId}
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
