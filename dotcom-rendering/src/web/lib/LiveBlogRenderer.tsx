import { Hide } from '@guardian/source-react-components';
import type { Switches } from '../../types/config';
import { Platform } from '../../types/platform';
import type { CombinedProps } from '../../types/props';
import type { TagType } from '../../types/tag';
import { EnhancePinnedPost } from '../components/EnhancePinnedPost.importable';
import { FilterKeyEventsToggle } from '../components/FilterKeyEventsToggle.importable';
import { Island } from '../components/Island';
import { KeyEventsCarousel } from '../components/KeyEventsCarousel.importable';
import { LiveBlock } from '../components/LiveBlock';
import { LiveBlogEpic } from '../components/LiveBlogEpic.importable';
import { PinnedPost } from '../components/PinnedPost';
import {
	hasRelevantTopics,
	TopicFilterBank,
} from '../components/TopicFilterBank.importable';

type CommonProps = {
	format: ArticleFormat;
	blocks: Block[];
	adTargeting?: AdTargeting;
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
	onFirstPage?: boolean;
	keyEvents?: Block[];
	filterKeyEvents?: boolean;
	availableTopics?: Topic[];
	selectedTopics?: Topic[];
};

type AppsProps = void;

type WebProps = {
	contributionsServiceUrl: string;
};

const LiveBlogRenderer = (
	props: CombinedProps<CommonProps, AppsProps, WebProps>,
) => {
	const {
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
		onFirstPage,
		keyEvents,
		filterKeyEvents = false,
		availableTopics,
		selectedTopics,
		platform,
	} = props;
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
							platform={platform}
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
			{blocks.map((block) => {
				return (
					<LiveBlock
						key={block.id}
						format={format}
						block={block}
						pageId={pageId}
						webTitle={webTitle}
						adTargeting={adTargeting}
						host={host}
						ajaxUrl={ajaxUrl}
						isLiveUpdate={isLiveUpdate}
						switches={switches}
						isAdFreeUser={isAdFreeUser}
						isSensitive={isSensitive}
						isPinnedPost={false}
						pinnedPostId={pinnedPost?.id}
						platform={platform}
					/>
				);
			})}
			{blocks.length > 4 && platform === Platform.Web && (
				<Island clientOnly={true}>
					<LiveBlogEpic
						section={section}
						shouldHideReaderRevenue={shouldHideReaderRevenue}
						tags={tags}
						isPaidContent={isPaidContent}
						contributionsServiceUrl={props.contributionsServiceUrl}
						pageId={pageId}
						keywordIds={keywordIds}
					/>
				</Island>
			)}
		</>
	);
};

export const WebLiveBlogRenderer = (props: CommonProps & WebProps) => (
	<LiveBlogRenderer {...props} platform={Platform.Web} />
);

export const AppsLiveBlogRenderer = (props: CommonProps) => (
	<LiveBlogRenderer {...props} platform={Platform.Apps} />
);
