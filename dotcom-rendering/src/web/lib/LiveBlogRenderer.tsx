import { Island } from '../components/Island';
import { LiveBlock } from '../components/LiveBlock';
import { PinnedPost } from '../components/PinnedPost';
import { LiveBlogEpic } from '../components/LiveBlogEpic.importable';
import { EnhancePinnedPost } from '../components/EnhancePinnedPost.importable';

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
}: Props) => {
	const thereAreMoreThanFourBlocks = blocks.length > 4;
	const positionToInsertEpic = Math.floor(Math.random() * 3) + 1; // 1, 2 or 3

	return (
		<>
			{pinnedPost && (
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
			<div id="top-of-blog" />
			{blocks.map((block, index) => {
				return (
					<>
						{!isLiveUpdate &&
							thereAreMoreThanFourBlocks &&
							index === positionToInsertEpic && (
								<Island clientOnly={true}>
									<LiveBlogEpic
										section={section}
										shouldHideReaderRevenue={
											shouldHideReaderRevenue
										}
										tags={tags}
										isPaidContent={isPaidContent}
										contributionsServiceUrl={
											contributionsServiceUrl
										}
									/>
								</Island>
							)}
						<LiveBlock
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
						/>
					</>
				);
			})}
		</>
	);
};
