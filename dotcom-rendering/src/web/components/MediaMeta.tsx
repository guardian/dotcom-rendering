import { css } from '@emotion/react';
import { textSans } from '@guardian/source-foundations';
import {
	SvgAudio,
	SvgCamera,
	SvgVideo,
} from '@guardian/source-react-components';
import type { DCRContainerPalette } from '../../types/front';
import type { Palette } from '../../types/palette';
import { decidePalette } from '../lib/decidePalette';

type Props = {
	mediaType: MediaType;
	containerPalette?: DCRContainerPalette;
	format: ArticleFormat;
	mediaDuration?: number;
};

const iconWrapperStyles = (palette: Palette) => css`
	width: 24px;
	height: 24px;
	/* We’re using the text colour for the icon badge */
	background-color: ${palette.text.cardFooter};
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

const durationStyles = (palette: Palette) => css`
	color: ${palette.text.cardFooter};
	${textSans.xxsmall({ fontWeight: `bold` })}
`;

const wrapperStyles = css`
	display: flex;
	align-items: center;
	margin-top: 4px;
`;

export function secondsToDuration(secs?: number): string {
	if (typeof secs === `undefined` || secs === 0) {
		return ``;
	}
	const seconds = Number(secs);
	const h = Math.floor(seconds / 3600);
	const m = Math.floor((seconds % 3600) / 60);
	const s = Math.floor((seconds % 3600) % 60);

	const duration = [];
	if (h > 0) {
		duration.push(h);
	}
	if (m > 0 || h === 0) {
		// supports 0:59
		duration.push(m);
	}
	if (s > 0) {
		duration.push(s);
	}
	return duration.join(':');
}

const Icon = ({ mediaType }: { mediaType: MediaType }) => {
	switch (mediaType) {
		case 'Gallery':
			return <SvgCamera />;
		case 'Video':
			return <SvgVideo />;
		case 'Audio':
			return <SvgAudio />;
	}
};

const MediaIcon = ({
	mediaType,
	palette,
}: {
	mediaType: MediaType;
	palette: Palette;
}) => (
	<span css={iconWrapperStyles(palette)}>
		<Icon mediaType={mediaType} />
	</span>
);

const MediaDuration = ({
	mediaDuration,
	palette,
}: {
	mediaDuration: number;
	palette: Palette;
}) => <p css={durationStyles(palette)}>{secondsToDuration(mediaDuration)}</p>;

export const MediaMeta = ({
	mediaType,
	mediaDuration,
	format,
	containerPalette,
}: Props) => {
	const palette = decidePalette(format, containerPalette);
	return (
		<div css={wrapperStyles}>
			<MediaIcon mediaType={mediaType} palette={palette} />
			&nbsp;
			{!!mediaDuration && (
				<MediaDuration mediaDuration={mediaDuration} palette={palette} />
			)}
		</div>
	);
};
