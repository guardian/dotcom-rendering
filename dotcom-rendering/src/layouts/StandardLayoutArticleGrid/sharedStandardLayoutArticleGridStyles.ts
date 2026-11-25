import { css } from '@emotion/react';
import { getZIndex } from '../../lib/getZIndex';
import { palette as themePalette } from '../../palette';

export const spacedColumn = css`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

export const immersiveLayer = css`
	z-index: ${getZIndex('articleHeadline')};
`;

export const topHatFurnitureBackgroundStyles = css`
	z-index: ${getZIndex('mediaOverlay')};
	background-color: color-mix(
		in srgb,
		${themePalette('--article-background')} 90%,
		transparent
	);
	padding: 0 10px;
`;
