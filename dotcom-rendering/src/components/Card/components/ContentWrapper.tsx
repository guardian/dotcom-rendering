import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { between, from, space, until } from '@guardian/source/foundations';
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
	isBetaContainer,
}: {
	mediaSize: MediaSizeType;
	mediaType?: CardMediaType;
	isBetaContainer: boolean;
}): SerializedStyles => {
	if (mediaType === 'avatar') {
		return css`
			flex-basis: 100%;
		`;
	}

	if (!isBetaContainer) {
		switch (mediaSize) {
			default:
			case 'small':
				return css`
					flex-basis: 75%;
					${between.tablet.and.desktop} {
						flex-basis: 60%;
					}
					${from.desktop} {
						flex-basis: 70%;
					}
				`;
			case 'medium':
				return css`
					${from.tablet} {
						flex-basis: 50%;
					}
				`;
			case 'large':
				return css`
					${from.tablet} {
						flex-basis: 34%;
					}
				`;
			case 'jumbo':
				return css`
					${from.tablet} {
						flex-basis: 25%;
					}
				`;
		}
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
const paddingBetaContainerStyles = (
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
	isBetaContainer: boolean;
	mediaPositionOnDesktop: MediaPositionType;
	mediaPositionOnMobile: MediaPositionType;
	padContent?: 'small' | 'large';
};

export const ContentWrapper = ({
	children,
	mediaType,
	mediaSize,
	isBetaContainer,
	mediaPositionOnDesktop,
	mediaPositionOnMobile,
	padContent,
}: Props) => {
	const mediaDirectionDesktop = getMediaDirection(mediaPositionOnDesktop);
	const paddingSpace = padContent === 'small' ? 1 : 2;

	return (
		<div
			id="marjan"
			css={[
				sizingStyles,
				mediaDirectionDesktop === 'horizontal' &&
					flexBasisStyles({
						mediaSize,
						mediaType,
						isBetaContainer,
					}),
				padContent &&
					!isBetaContainer &&
					css`
						padding: ${space[paddingSpace]}px;
					`,
				padContent &&
					isBetaContainer &&
					paddingBetaContainerStyles(
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
