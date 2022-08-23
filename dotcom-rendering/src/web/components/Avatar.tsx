import { css } from '@emotion/react';
import type { DCRContainerPalette } from '../../types/front';
import type { Palette } from '../../types/palette';
import { decidePalette } from '../lib/decidePalette';

const contributorImage = css`
	border-radius: 100%;
	object-fit: cover;
	height: 100%;
	width: 100%;
`;

const backgroundStyles = (palette: Palette) =>
	css`
		background-color: ${palette.background.avatar};
	`;

export const Avatar: React.FC<{
	imageSrc: string;
	imageAlt: string;
	format: ArticleFormat;
	containerPalette?: DCRContainerPalette;
}> = ({ imageSrc, imageAlt, format, containerPalette }) => {
	const palette = decidePalette(format, containerPalette);
	return (
		<img
			src={imageSrc}
			alt={imageAlt}
			css={[backgroundStyles(palette), contributorImage]}
		/>
	);
};
