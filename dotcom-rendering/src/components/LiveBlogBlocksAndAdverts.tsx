import {
	calculateApproximateBlockHeight,
	shouldDisplayAd,
} from '../lib/liveblogAdSlots';
import type { Switches } from '../types/config';
import type { RenderingTarget } from '../types/renderingTarget';
import { AdSlot } from './AdSlot';
import { LiveBlock } from './LiveBlock';

type Props = {
	format: ArticleFormat;
	blocks: Block[];
	pinnedPost?: Block;
	host?: string;
	pageId: string;
	webTitle: string;
	ajaxUrl: string;
	switches: Switches;
	isAdFreeUser: boolean;
	isSensitive: boolean;
	isLiveUpdate?: boolean;
	isInLiveblogAdSlotTest?: boolean;
	renderingTarget: RenderingTarget;
};

export const LiveBlogBlocksAndAdverts = ({
	format,
	blocks,
	pinnedPost,
	host,
	pageId,
	webTitle,
	ajaxUrl,
	switches,
	isAdFreeUser,
	isSensitive,
	isLiveUpdate,
	isInLiveblogAdSlotTest = false,
	renderingTarget,
}: Props) => {
	if (!isInLiveblogAdSlotTest) {
		return (
			<>
				{blocks.map((block) => (
					<LiveBlock
						key={block.id}
						format={format}
						block={block}
						pageId={pageId}
						webTitle={webTitle}
						host={host}
						ajaxUrl={ajaxUrl}
						isLiveUpdate={isLiveUpdate}
						switches={switches}
						isAdFreeUser={isAdFreeUser}
						isSensitive={isSensitive}
						isPinnedPost={false}
						pinnedPostId={pinnedPost?.id}
						renderingTarget={renderingTarget}
					/>
				))}
			</>
		);
	}

	let numPixelsOfContentWithoutAdvert = 0;
	let numAdvertsInserted = 0;

	return (
		<>
			{blocks.map((block, i) => {
				numPixelsOfContentWithoutAdvert +=
					calculateApproximateBlockHeight(block.elements);

				const willDisplayAdAfterBlock =
					!isAdFreeUser &&
					shouldDisplayAd(
						i + 1,
						blocks.length,
						numAdvertsInserted,
						numPixelsOfContentWithoutAdvert,
					);

				if (willDisplayAdAfterBlock) {
					numAdvertsInserted++;
					numPixelsOfContentWithoutAdvert = 0;
				}

				return (
					<>
						<LiveBlock
							key={block.id}
							format={format}
							block={block}
							pageId={pageId}
							webTitle={webTitle}
							host={host}
							ajaxUrl={ajaxUrl}
							isLiveUpdate={isLiveUpdate}
							switches={switches}
							isAdFreeUser={isAdFreeUser}
							isSensitive={isSensitive}
							isPinnedPost={false}
							pinnedPostId={pinnedPost?.id}
							renderingTarget={renderingTarget}
						/>
						{willDisplayAdAfterBlock && (
							<AdSlot
								position="liveblog-inline"
								index={numAdvertsInserted}
							/>
						)}
					</>
				);
			})}
		</>
	);
};
