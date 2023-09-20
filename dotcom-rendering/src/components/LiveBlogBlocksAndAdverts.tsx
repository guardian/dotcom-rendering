import {
	calculateApproximateBlockHeight,
	shouldDisplayAd,
} from '../lib/liveblogAdSlots';
import type { Switches } from '../types/config';
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

	let pxSinceAdMobile = 0;
	let mobileAdCounter = 0;

	let pxSinceAdDesktop = 0;
	let desktopAdCounter = 0;

	return (
		<>
			{blocks.map((block, i) => {
				pxSinceAdMobile += calculateApproximateBlockHeight(
					block.elements,
					true,
				);
				const willInsertAdMobile =
					!isAdFreeUser &&
					shouldDisplayAd(
						i + 1,
						blocks.length,
						mobileAdCounter,
						pxSinceAdMobile,
						true,
					);
				if (willInsertAdMobile) {
					mobileAdCounter++;
					pxSinceAdMobile = 0;
				}

				pxSinceAdDesktop += calculateApproximateBlockHeight(
					block.elements,
					false,
				);
				const willInsertAdDesktop =
					!isAdFreeUser &&
					shouldDisplayAd(
						i + 1,
						blocks.length,
						desktopAdCounter,
						pxSinceAdDesktop,
						false,
					);
				if (willInsertAdDesktop) {
					desktopAdCounter++;
					pxSinceAdDesktop = 0;
				}

				const willInsertAdMobileWeb = isWeb && willInsertAdMobile;
				const willInsertAdMobileApps = isApps && willInsertAdMobile;

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
						{willInsertAdDesktop && (
							<AdSlot
								position="liveblog-inline"
								index={desktopAdCounter}
							/>
						)}
						{willInsertAdMobileWeb && (
							<AdSlot
								position="liveblog-inline-mobile"
								index={mobileAdCounter}
							/>
						)}
						{willInsertAdMobileApps && (
							<div className="ad-portal-placeholder" />
						)}
					</>
				);
			})}
		</>
	);
};
