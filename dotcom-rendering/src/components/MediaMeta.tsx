import { css } from '@emotion/react';
import { SvgAudio, SvgCamera } from '@guardian/source-react-components';
import { decidePalette } from '../lib/decidePalette';
import type { DCRContainerPalette } from '../types/front';
import type { Palette } from '../types/palette';
import { palette as themePalette } from '../palette';

type Props = {
	mediaType: MediaType;
	containerPalette?: DCRContainerPalette;
	format: ArticleFormat;
	hasKicker: boolean;
};

const iconWrapperStyles = (palette: Palette, hasKicker: boolean) => css`
	width: 24px;
	height: 24px;
	/* We’re using the text colour for the icon badge */
	background-color: ${hasKicker
		? themePalette('--card-kicker-text')
		: palette.text.cardFooter};
	border-radius: 50%;
	display: inline-block;

	> svg {
		width: 20px;
		height: 20px;
		margin-left: auto;
		margin-right: auto;
		margin-top: 2px;
		display: block;
		fill: ${palette.background.card};
	}
`;

const wrapperStyles = css`
	display: flex;
	align-items: center;
	margin-top: 4px;
`;

const Icon = ({ mediaType }: { mediaType: MediaType }) => {
	switch (mediaType) {
		case 'Gallery':
			return <SvgCamera />;
		case 'Video':
			return null;
		case 'Audio':
			return <SvgAudio />;
	}
};

const MediaIcon = ({
	mediaType,
	palette,
	hasKicker,
}: {
	mediaType: MediaType;
	palette: Palette;
	hasKicker: boolean;
}) => {
	return (
		<span css={iconWrapperStyles(palette, hasKicker)}>
			<Icon mediaType={mediaType} />
		</span>
	);
};

export const MediaMeta = ({
	mediaType,
	format,
	containerPalette,
	hasKicker,
}: Props) => {
	const palette = decidePalette(format, containerPalette);
	return (
		<div css={wrapperStyles}>
			<MediaIcon
				mediaType={mediaType}
				palette={palette}
				hasKicker={hasKicker}
			/>
		</div>
	);
};
