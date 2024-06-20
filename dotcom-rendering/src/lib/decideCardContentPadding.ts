import { space } from '@guardian/source/foundations';
import type { ImagePositionType } from '../components/Card/components/ImageWrapper';

export type DecideCardContentPaddingArgs = {
	imagePositionOnMobile: ImagePositionType;
	imagePositionOnDesktop: ImagePositionType;
	addAdditionalPadding?: boolean;
};

/**
 * Decides how much padding the card content should get, depending on:
 * - Which position the image is in, if any
 * - Whether the card has a background colour (where we add extra padding)
 */
export const decideCardContentPadding = ({
	imagePositionOnMobile,
	imagePositionOnDesktop,
	addAdditionalPadding,
}: DecideCardContentPaddingArgs): {
	mobilePadding: string;
	desktopPadding: string;
} => {
	const calcPadding = (paddingInPx: number) =>
		addAdditionalPadding ? paddingInPx + space[1] : paddingInPx;

	const paddingForImagePosition = (imagePosition: ImagePositionType) => {
		switch (imagePosition) {
			case 'none':
				return `${calcPadding(0)}px`;

			default:
				return ['top', 'right', 'bottom', 'left']
					.map((paddingLoc) => {
						return paddingLoc === imagePosition
							? `${space[2]}px`
							: `${calcPadding(0)}px`;
					})
					.join(' ');
		}
	};

	return {
		mobilePadding: paddingForImagePosition(imagePositionOnMobile),
		desktopPadding: paddingForImagePosition(imagePositionOnDesktop),
	};
};
