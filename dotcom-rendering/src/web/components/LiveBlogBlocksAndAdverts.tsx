import type { Switches } from '../../types/config';
import { calculateBlockSize, shouldDisplayAd } from '../lib/liveblogAdSlots';
import { useAB } from '../lib/useAB';
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
	//
	// If the user is not in the liveblog server-side ads AB test, provide the
	// same experience as before and DO NOT insert ads into the page.
	//
	const abTests = useAB();
	const userInAbTestVariant =
		abTests?.api.isUserInVariant(
			'ServerSideLiveblogInlineAds',
			'variant',
		) ?? false;
	if (!userInAbTestVariant) {
		return (
			<>
				{blocks.map((block) => (
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
				))}
			</>
		);
	}

	let numPixelsOfContentWithoutAdvert = 0;
	let numAdvertsInserted = 0;

	return (
		<>
			{blocks.map((block, i) => {
				numPixelsOfContentWithoutAdvert += calculateBlockSize(
					block.elements,
				);

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
