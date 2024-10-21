import { css } from '@emotion/react';
import {
	from,
	space,
	textSans14,
	textSans17,
	until,
} from '@guardian/source/foundations';
import { palette } from '../../../palette';
import type { ImagePositionType, ImageSizeType } from './ImageWrapper';

export type TrailTextSize = 'regular' | 'large';

type Props = {
	children: string | React.ReactNode;
	imagePositionOnDesktop?: ImagePositionType;
	imageSize?: ImageSizeType;
	imageType?: CardImageType | undefined;
	/** By default, trail text is hidden at specific breakpoints. This prop allows consumers to show trails across all breakpoints if set to false */
	shouldHide?: boolean;
	trailTextSize?: TrailTextSize;
	/** Optionally overrides the trail text colour */
	trailTextColour?: string;
	padTop: boolean;
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
	padding-bottom: ${space[2]}px;
`;

const topPadding = css`
	padding-top: ${space[2]}px;
`;

const fontStyles = (trailTextSize: TrailTextSize) => css`
	${textSans14}
	${from.desktop} {
		${trailTextSize === 'large' && textSans17}
	}
	strong {
		font-weight: bold;
	}
`;

export const TrailTextWrapper = ({
	children,
	imagePositionOnDesktop,
	imageSize,
	imageType,
	shouldHide = true,
	trailTextSize = 'regular',
	trailTextColour = palette('--card-trail-text'),
	padTop,
}: Props) => {
	return (
		<div
			css={[
				trailTextStyles,
				css`
					color: ${trailTextColour};
				`,
				fontStyles(trailTextSize),
				shouldHide &&
					decideVisibilityStyles(
						imagePositionOnDesktop,
						imageSize,
						imageType,
					),
				padTop && topPadding,
			]}
		>
			{children}
		</div>
	);
};
