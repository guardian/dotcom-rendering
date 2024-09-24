import { css } from '@emotion/react';
import { space, textSans14, until } from '@guardian/source/foundations';
import { palette } from '../../../palette';
import type { ImagePositionType, ImageSizeType } from './ImageWrapper';

type Props = {
	children: string | React.ReactNode;
	imagePositionOnDesktop?: ImagePositionType;
	imageSize?: ImageSizeType;
	imageType?: CardImageType | undefined;
	/** By default, trail text is hidden at specific breakpoints. This prop allows consumers to show trails across all breakpoints if set to false */
	shouldHide?: boolean;
	/** If the card is a flexible splash card, the trail text will be styled differently */
	isFlexSplash?: boolean;
};

/**
 * Determines the visibility state for the trail text based on the image size,
 * position, and type. If the image is large, positioned on the right, and is not an avatar,
 * the trail text will be hidden until the desktop breakpoint.
 * Otherwise, it will be hidden until the tablet breakpoint.
 */
const decideVisibilityStyles = (
	imagePosition?: ImagePositionType,
	imageSize?: ImageSizeType,
	imageType?: CardImageType | undefined,
) => {
	if (
		imageSize === 'large' &&
		imagePosition === 'right' &&
		imageType !== 'avatar'
	) {
		return css`
			${until.desktop} {
				display: none;
			}
		`;
	}
	return css`
		${until.tablet} {
			display: none;
		}
	`;
};

const trailTextStyles = css`
	display: flex;
	flex-direction: column;
	color: ${palette('--card-headline-trail-text')};
	${textSans14};
	padding: ${space[2]}px 0;
	strong {
		font-weight: bold;
	}
`;

const flexibleSplashStyles = css`
	color: ${palette('--flexible-splash-card-standfirst')};
`;

export const TrailTextWrapper = ({
	children,
	imagePositionOnDesktop,
	imageSize,
	imageType,
	shouldHide = true,
	isFlexSplash,
}: Props) => {
	return (
		<div
			css={[
				trailTextStyles,
				shouldHide &&
					decideVisibilityStyles(
						imagePositionOnDesktop,
						imageSize,
						imageType,
					),
				isFlexSplash && flexibleSplashStyles,
			]}
		>
			{children}
		</div>
	);
};
