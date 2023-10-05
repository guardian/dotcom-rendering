import {
	calculateApproximateBlockHeight,
	shouldDisplayAd,
} from '../lib/liveblogAdSlots';
import type { Switches } from '../types/config';
import { AdPlaceholder } from './AdPlaceholder.apps';
import { AdSlot } from './AdSlot.web';
import { useConfig } from './ConfigContext';
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

const handleAdInsertion = (
	block: Block,
	isMobileView: boolean,
	adCounter: number,
	pxSinceAd: number,
	isAdFreeUser: boolean,
	totalBlocks: number,
	currentIndex: number,
) => {
	const updatedPxSinceAd =
		pxSinceAd +
		calculateApproximateBlockHeight(block.elements, isMobileView);
	const willInsertAd =
		!isAdFreeUser &&
		shouldDisplayAd(
			currentIndex + 1,
			totalBlocks,
			adCounter,
			updatedPxSinceAd,
			isMobileView,
		);
	return {
		adCounter: willInsertAd ? adCounter + 1 : adCounter,
		pxSinceAd: willInsertAd ? 0 : updatedPxSinceAd,
		willInsertAd,
	};
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
	const { renderingTarget } = useConfig();
	const isWeb = renderingTarget === 'Web';
	const isApps = renderingTarget === 'Apps';

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

	let pxSinceAdMobileView = 0;
	let mobileViewAdCounter = 0;

	let pxSinceAdDesktopView = 0;
	let desktopViewAdCounter = 0;

	return (
		<>
			{blocks.map((block, i) => {
				// Mobile viewport case
				const mobileResult = handleAdInsertion(
					block,
					true,
					mobileViewAdCounter,
					pxSinceAdMobileView,
					isAdFreeUser,
					blocks.length,
					i,
				);
				mobileViewAdCounter = mobileResult.adCounter;
				pxSinceAdMobileView = mobileResult.pxSinceAd;

				// Desktop viewport case
				const desktopResult = handleAdInsertion(
					block,
					false,
					desktopViewAdCounter,
					pxSinceAdDesktopView,
					isAdFreeUser,
					blocks.length,
					i,
				);
				desktopViewAdCounter = desktopResult.adCounter;
				pxSinceAdDesktopView = desktopResult.pxSinceAd;

				const shouldInsertMobileWebAd =
					isWeb && mobileResult.willInsertAd;
				const shouldInsertDesktopWebAd =
					isWeb && desktopResult.willInsertAd;
				const shouldInsertAppAd = isApps && mobileResult.willInsertAd;

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

						{shouldInsertDesktopWebAd && (
							<AdSlot
								position="liveblog-inline"
								index={desktopViewAdCounter}
							/>
						)}
						{shouldInsertMobileWebAd && (
							<AdSlot
								position="liveblog-inline-mobile"
								index={mobileViewAdCounter}
							/>
						)}

						{shouldInsertAppAd && <AdPlaceholder />}
					</>
				);
			})}
		</>
	);
};
