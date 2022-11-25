import { calculateBlockSize, shouldDisplayAd } from '@guardian/commercial-core';
import type { Switches } from '../../types/config';
import { AdSlot } from './AdSlot';
import { LiveBlock } from './LiveBlock';

type Props = {
	format: ArticleFormat;
	blocks: Block[];
	adTargeting: AdTargeting;
	pinnedPost?: Block;
	host?: string;
	pageId: string;
	webTitle: string;
	ajaxUrl: string;
	switches: Switches;
	isAdFreeUser: boolean;
	isSensitive: boolean;
	isLiveUpdate?: boolean;
};

export const LiveBlogBlocksAndAdverts = ({
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
}: Props) => {
	let numPixelsOfContentWithoutAdvert = 0;
	let numAdvertsInserted = 0;

	return (
		<>
			{blocks.map((block, i) => {
				numPixelsOfContentWithoutAdvert += calculateBlockSize(block);

				const willDisplayAdAfterBlock = shouldDisplayAd(
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
