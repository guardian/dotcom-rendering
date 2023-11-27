import {
	calculateApproximateBlockHeight,
	shouldDisplayAd,
} from './liveblogAdSlots';

/**
 * Decides where ads should be inserted on liveblogs/deadblogs.
 */
const getLiveblogAdPositions = (blocks: Block[], isMobile: boolean): number[] =>
	blocks.reduce<{
		heightSinceAd: number;
		adPositions: number[];
	}>(
		(accumulator, block, index) => {
			const { heightSinceAd, adPositions } = accumulator;

			const updatedPxSinceAd =
				heightSinceAd +
				calculateApproximateBlockHeight(block.elements, isMobile);

			const willInsertAd = shouldDisplayAd(
				index + 1,
				blocks.length,
				adPositions.length,
				updatedPxSinceAd,
				isMobile,
			);

			if (willInsertAd) {
				return {
					heightSinceAd: 0,
					adPositions: [...adPositions, index],
				};
			} else {
				return {
					heightSinceAd: updatedPxSinceAd,
					adPositions,
				};
			}
		},
		{ heightSinceAd: 0, adPositions: [] },
	).adPositions;

export { getLiveblogAdPositions };
