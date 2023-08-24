import {
	calculateApproximateBlockHeight,
	shouldDisplayAd,
} from '../lib/liveblogAdSlots';
import type { Switches } from '../types/config';
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
					/>
				))}
			</>
		);
	}

	let pixelsSinceAdMobile = 0;
	let mobileAdCounter = 0;

	let pixelsSinceAdLargeScreen = 0;
	let largeScreenAdCounter = 0;

	return (
		<>
			{blocks.map((block, i) => {
				pixelsSinceAdMobile += calculateApproximateBlockHeight(
					block.elements,
					true,
				);
				const willinsertAdOnSmallScreens =
					!isAdFreeUser &&
					shouldDisplayAd(
						i + 1,
						blocks.length,
						mobileAdCounter,
						pixelsSinceAdMobile,
						true,
					);
				if (willinsertAdOnSmallScreens) {
					mobileAdCounter++;
					pixelsSinceAdMobile = 0;
				}

				pixelsSinceAdLargeScreen += calculateApproximateBlockHeight(
					block.elements,
					false,
				);
				const willinsertAdOnLargeScreens =
					!isAdFreeUser &&
					shouldDisplayAd(
						i + 1,
						blocks.length,
						largeScreenAdCounter,
						pixelsSinceAdLargeScreen,
						false,
					);
				if (willinsertAdOnLargeScreens) {
					largeScreenAdCounter++;
					pixelsSinceAdLargeScreen = 0;
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
						/>
						{willinsertAdOnSmallScreens && (
							<AdSlot
								position="liveblog-inline-mobile"
								index={mobileAdCounter}
							/>
						)}
						{willinsertAdOnLargeScreens && (
							<AdSlot
								position="liveblog-inline"
								index={largeScreenAdCounter}
							/>
						)}
					</>
				);
			})}
		</>
	);
};
