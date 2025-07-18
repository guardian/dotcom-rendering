import { AdSlot } from './AdSlot.web';

export const GalleryInlineAdSlot = ({
	renderAds,
	hasPageSkin,
	adSlotIndex,
}: {
	renderAds: boolean;
	hasPageSkin: boolean;
	adSlotIndex: number;
}) => {
	return (
		renderAds &&
		!hasPageSkin && (
			<AdSlot
				data-print-layout="hide"
				position="gallery-inline"
				index={adSlotIndex}
				hasPageskin={hasPageSkin}
			/>
		)
	);
};
