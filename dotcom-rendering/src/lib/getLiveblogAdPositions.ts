import {
	calculateApproximateBlockHeight,
	shouldDisplayAd,
} from './liveblogAdSlots';

/**
 * Decides where ads should be inserted on liveblogs/deadblogs.
 */
const getLiveblogAdPositions = (
	blocks: Block[],
	isMobile: boolean,
): number[] => {
	let pxSinceAd = 0;
	let adCounter = 0;
	const adPositions = [];

	for (const [index, block] of blocks.entries()) {
		const updatedPxSinceAd =
			pxSinceAd +
			calculateApproximateBlockHeight(block.elements, isMobile);

		const willInsertAd = shouldDisplayAd(
			index + 1,
			blocks.length,
			adCounter,
			updatedPxSinceAd,
			isMobile,
		);

		if (willInsertAd) {
			adCounter++;
			adPositions.push(index);
			pxSinceAd = 0;
		} else {
			pxSinceAd = updatedPxSinceAd;
		}
	}

	return adPositions;
};

export { getLiveblogAdPositions };
