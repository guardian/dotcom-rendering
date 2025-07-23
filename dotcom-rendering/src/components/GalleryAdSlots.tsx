import { Hide } from '@guardian/source/react-components';
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
			<Hide from="tablet">
				<AdSlot
					data-print-layout="hide"
					position="gallery-inline-mobile"
					index={adSlotIndex}
				/>
			</Hide>
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
