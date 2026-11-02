import { css } from '@emotion/react';
import { getZIndex } from '../../lib/getZIndex';
import { palette as themePalette } from '../../palette';

export const topHatFurnitureBackgroundStyles = css`
	z-index: ${getZIndex('mediaOverlay')};
	background-color: color-mix(
		in srgb,
		${themePalette('--article-background')} 90%,
		transparent
	);
	padding: 0 10px;
`;
