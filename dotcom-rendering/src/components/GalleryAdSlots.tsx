import { AdSlot } from './AdSlot.web';

export const MobileAdSlot = ({
	renderAds,
	adSlotIndex,
}: {
	renderAds: boolean;
	adSlotIndex: number;
}) => {
	return (
		renderAds && (
			<AdSlot
				data-print-layout="hide"
				position="gallery-inline-mobile"
				index={adSlotIndex}
			/>
		)
	);
};

export const GalleryInlineAdSlot = ({
	renderAds,
	adSlotIndex,
}: {
	renderAds: boolean;
	adSlotIndex: number;
}) => {
	return (
		renderAds && (
			<AdSlot
				data-print-layout="hide"
				position="gallery-inline"
				index={adSlotIndex + 1}
			/>
		)
	);
};
