import { css } from '@emotion/react';
import { until } from '@guardian/source-foundations';

type Props = {
	children: React.ReactNode;
	imageType: CardImageType | undefined;
	imagePosition: ImagePositionType;
	imagePositionOnMobile: ImagePositionType;
	minWidthInPixels?: number;
};

const decideDirection = (imagePosition: ImagePositionType) => {
	switch (imagePosition) {
		case 'top':
			return 'column';
		case 'bottom':
			return 'column-reverse';
		case 'left':
			return 'row';
		case 'right':
			return 'row-reverse';
		// If there's no image (so no imagePosition) default to top down
		case 'none':
			return 'column';
	}
};

const decideWidth = (minWidthInPixels?: number) => {
	if (minWidthInPixels) {
		return css`
			min-width: ${minWidthInPixels}px;
		`;
	}
	return css`
		width: 100%;
	`;
};

const decidePosition = (
	imagePosition: ImagePositionType,
	imagePositionOnMobile: ImagePositionType,
	imageType?: CardImageType,
) => {
	if (imageType === 'avatar') {
		switch (imagePosition) {
			case 'left':
			case 'right': {
				return css`
					flex-direction: row-reverse;
					${until.tablet} {
						flex-direction: row-reverse;
					}
				`;
			}
			default: {
				return css`
					flex-direction: column-reverse;
					${until.tablet} {
						flex-direction: row-reverse;
					}
				`;
			}
		}
	}
	return css`
		flex-direction: ${decideDirection(imagePosition)};
		${until.tablet} {
			flex-direction: ${decideDirection(imagePositionOnMobile)};
		}
	`;
};

export const CardLayout = ({
	children,
	imagePosition,
	imagePositionOnMobile,
	minWidthInPixels,
	imageType,
}: Props) => (
	<div
		css={[
			css`
				display: flex;
				flex-basis: 100%;
			`,
			decideWidth(minWidthInPixels),
			decidePosition(imagePosition, imagePositionOnMobile, imageType),
		]}
	>
		{children}
	</div>
);
