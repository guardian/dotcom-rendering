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
		adCounter: number;
		adPositions: number[];
	}>(
		(accumulator, block, index) => {
			const { heightSinceAd, adCounter, adPositions } = accumulator;

			const updatedPxSinceAd =
				heightSinceAd +
				calculateApproximateBlockHeight(block.elements, isMobile);

			const willInsertAd = shouldDisplayAd(
				index + 1,
				blocks.length,
				adCounter,
				updatedPxSinceAd,
				isMobile,
			);

			if (willInsertAd) {
				adPositions.push(index);

				return {
					...accumulator,
					heightSinceAd: 0,
					adCounter: adCounter + 1,
				};
			} else {
				return {
					...accumulator,
					heightSinceAd: updatedPxSinceAd,
				};
			}
		},
		{ heightSinceAd: 0, adCounter: 0, adPositions: [] },
	).adPositions;

export { getLiveblogAdPositions };
