import { css } from '@emotion/react';
import { until } from '@guardian/source-foundations';
import type { CSSProperties } from 'react';
import type { ImagePositionType } from './ImageWrapper';

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

const decideWidth = (minWidthInPixels?: number): CSSProperties => {
	if (minWidthInPixels !== undefined && minWidthInPixels > 0) {
		return { minWidth: minWidthInPixels };
	}
	return { width: '100%' };
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
				return {
					'--direction': 'row-reverse',
					'--direction-mobile': 'row-reverse',
				};
			}
			default: {
				return {
					'--direction': 'column-reverse',
					'--direction-mobile': 'row-reverse',
				};
			}
		}
	}

	return {
		'--direction': decideDirection(imagePosition),
		'--direction-mobile': decideDirection(imagePositionOnMobile),
	};
};

const positionStyles = css`
	display: flex;
	flex-basis: 100%;

	flex-direction: var(--direction);
	${until.tablet} {
		flex-direction: var(--direction-mobile);
	}
`;

export const CardLayout = ({
	children,
	imagePosition,
	imagePositionOnMobile,
	minWidthInPixels,
	imageType,
}: Props) => (
	<div
		style={{
			...decideWidth(minWidthInPixels),
			...decidePosition(imagePosition, imagePositionOnMobile, imageType),
		}}
		css={positionStyles}
	>
		{children}
	</div>
);
