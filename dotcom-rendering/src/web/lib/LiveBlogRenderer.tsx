import { Hide } from '@guardian/source-react-components';
import { EnhancePinnedPost } from '../components/EnhancePinnedPost.importable';
import { FilterKeyEventsToggle } from '../components/FilterKeyEventsToggle.importable';
import { Island } from '../components/Island';
import { KeyEventsCarousel } from '../components/KeyEventsCarousel.importable';
import { LiveBlock } from '../components/LiveBlock';
import { LiveBlogEpic } from '../components/LiveBlogEpic.importable';
import { PinnedPost } from '../components/PinnedPost';
import { TopicFilterBank } from '../components/TopicFilterBank.importable';

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
	switches: { [key: string]: boolean };
	isLiveUpdate?: boolean;
	section: string;
	shouldHideReaderRevenue: boolean;
	tags: TagType[];
	isPaidContent: boolean;
	contributionsServiceUrl: string;
	onFirstPage?: boolean;
	keyEvents?: Block[];
	filterKeyEvents?: boolean;
	isKeyEventsCarouselVariant?: boolean;
	availableTopics?: Topic[];
	selectedTopics?: string;
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
	contributionsServiceUrl,
	onFirstPage,
	keyEvents,
	filterKeyEvents = false,
	isKeyEventsCarouselVariant = false,
	availableTopics,
	selectedTopics,
}: Props) => {
	console.log('isKeyEventsCarouselVariant::: ', isKeyEventsCarouselVariant);
	console.log('switches.automaticFilters::: ', switches.automaticFilters);
	console.log('availableTopics::: ', availableTopics);

	return (
		<>
			{pinnedPost && onFirstPage && (
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
			{isKeyEventsCarouselVariant && keyEvents?.length ? (
				<Hide above="desktop">
					<Island deferUntil="visible">
						<KeyEventsCarousel
							keyEvents={keyEvents}
							filterKeyEvents={filterKeyEvents}
							format={format}
						/>
					</Island>
					{!switches.automaticFilters && (
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

			{switches.automaticFilters && availableTopics && (
				<Hide above="desktop">
					<TopicFilterBank
						availableTopics={availableTopics}
						selectedTopics={selectedTopics}
						format={format}
						keyEvents={keyEvents}
						filterKeyEvents={filterKeyEvents}
					/>
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
					/>
				);
			})}
			{blocks.length > 4 && (
				<Island clientOnly={true}>
					<LiveBlogEpic
						section={section}
						shouldHideReaderRevenue={shouldHideReaderRevenue}
						tags={tags}
						isPaidContent={isPaidContent}
						contributionsServiceUrl={contributionsServiceUrl}
					/>
				</Island>
			)}
		</>
	);
};
