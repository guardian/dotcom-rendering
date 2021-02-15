import { css } from '@emotion/react';

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
	palette: Palette;
}> = ({ imageSrc, imageAlt, palette }) => {
	return (
		<img
			src={imageSrc}
			alt={imageAlt}
			css={[backgroundStyles(palette), contributorImage]}
		/>
	);
};
