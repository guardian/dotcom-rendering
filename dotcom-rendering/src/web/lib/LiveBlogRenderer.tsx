import { Hide } from '@guardian/source-react-components';
import { EnhancePinnedPost } from '../components/EnhancePinnedPost.importable';
import { FilterKeyEventsToggle } from '../components/FilterKeyEventsToggle.importable';
import { Island } from '../components/Island';
import { KeyEventsCarousel } from '../components/KeyEventsCarousel.importable';
import { LiveBlock } from '../components/LiveBlock';
import { LiveBlogEpic } from '../components/LiveBlogEpic.importable';
import { PinnedPost } from '../components/PinnedPost';

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
}: Props) => {
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
			{switches.keyEventsCarousel && keyEvents?.length ? (
				<Hide above="desktop">
					<Island deferUntil="visible">
						<KeyEventsCarousel
							keyEvents={keyEvents}
							filterKeyEvents={filterKeyEvents}
							format={format}
						/>
					</Island>
					<Island deferUntil="visible">
						<FilterKeyEventsToggle
							filterKeyEvents={filterKeyEvents}
							id="filter-toggle-mobile"
						/>
					</Island>
				</Hide>
			) : (
				<></>
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
