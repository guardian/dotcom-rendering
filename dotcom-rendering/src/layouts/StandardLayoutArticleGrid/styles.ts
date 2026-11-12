import { css } from '@emotion/react';
import { getZIndex } from '../../lib/getZIndex';

export const topHatFurnitureBackgroundStyles = css`
	z-index: ${getZIndex('mediaOverlay')};
	background: rgba(255, 255, 255, 0.9);
	padding: 0 10px;
`;
