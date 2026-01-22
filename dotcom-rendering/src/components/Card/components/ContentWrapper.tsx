import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { from, space, until } from '@guardian/source/foundations';
import type { CardMediaType } from '../../../types/layout';
import type { MediaPositionType, MediaSizeType } from './MediaWrapper';

const sizingStyles = css`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	justify-content: space-between;
`;

/**
 * This function works in partnership with its sibling in `MediaWrapper`.
 * If you change any values here be sure to update that file as well.
 */
const flexBasisStyles = ({
	mediaSize,
	mediaType,
}: {
	mediaSize: MediaSizeType;
	mediaType?: CardMediaType;
}): SerializedStyles => {
	if (mediaType === 'avatar') {
		return css`
			flex-basis: 100%;
		`;
	}

	switch (mediaSize) {
		default:
		case 'small':
		case 'medium':
			return css`
				${from.tablet} {
					flex-basis: 50%;
				}
			`;
		case 'large':
			return css`
				${from.tablet} {
					flex-basis: 220px;
				}

				${from.desktop} {
					flex-basis: 300px;
				}
			`;
		case 'xlarge':
			return css`
				${from.tablet} {
					flex-basis: 160px;
				}

				${from.desktop} {
					flex-basis: 220px;
				}
			`;
		case 'jumbo':
			return css`
				flex-basis: 100%;
			`;
	}
};

/**
 * There is no padding on the side of the media where the text is.
 */
const paddingContainerStyles = (
	mediaPositionMobile: MediaPositionType,
	mediaPositionDesktop: MediaPositionType,
	padding: 1 | 2,
) => css`
	${until.tablet} {
		padding-left: ${mediaPositionMobile !== 'left' &&
		`${space[padding]}px`};
		padding-right: ${mediaPositionMobile !== 'right' &&
		`${space[padding]}px`};
		padding-top: ${mediaPositionMobile !== 'top' && `${space[padding]}px`};
		padding-bottom: ${mediaPositionMobile !== 'bottom' &&
		`${space[padding]}px`};
	}

	${from.tablet} {
		padding-left: ${mediaPositionDesktop !== 'left' &&
		`${space[padding]}px`};
		padding-right: ${mediaPositionDesktop !== 'right' &&
		`${space[padding]}px`};
		padding-top: ${mediaPositionDesktop !== 'top' && `${space[padding]}px`};
		padding-bottom: ${mediaPositionDesktop !== 'bottom' &&
		`${space[padding]}px`};
	}
`;

type MediaDirection = 'vertical' | 'horizontal' | 'none';

const getMediaDirection = (
	mediaPosition: MediaPositionType,
): MediaDirection => {
	if (mediaPosition === 'top' || mediaPosition === 'bottom') {
		return 'vertical';
	}

	if (mediaPosition === 'left' || mediaPosition === 'right') {
		return 'horizontal';
	}

	return 'none';
};

type Props = {
	children: React.ReactNode;
	mediaType?: CardMediaType;
	mediaSize: MediaSizeType;
	mediaPositionOnDesktop: MediaPositionType;
	mediaPositionOnMobile: MediaPositionType;
	padContent?: 'small' | 'large';
};

export const ContentWrapper = ({
	children,
	mediaType,
	mediaSize,
	mediaPositionOnDesktop,
	mediaPositionOnMobile,
	padContent,
}: Props) => {
	const mediaDirectionDesktop = getMediaDirection(mediaPositionOnDesktop);
	const paddingSpace = padContent === 'small' ? 1 : 2;

	return (
		<div
			css={[
				sizingStyles,
				mediaDirectionDesktop === 'horizontal' &&
					flexBasisStyles({
						mediaSize,
						mediaType,
					}),
				padContent &&
					paddingContainerStyles(
						mediaPositionOnMobile,
						mediaPositionOnDesktop,
						paddingSpace,
					),
			]}
		>
			{children}
		</div>
	);
};
