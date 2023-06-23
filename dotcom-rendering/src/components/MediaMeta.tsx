import { css } from '@emotion/react';
import { textSans } from '@guardian/source-foundations';
import {
	SvgAudio,
	SvgCamera,
	SvgVideo,
} from '@guardian/source-react-components';
import { decidePalette } from '../lib/decidePalette';
import type { DCRContainerPalette } from '../types/front';
import type { Palette } from '../types/palette';

type Props = {
	mediaType: MediaType;
	containerPalette?: DCRContainerPalette;
	format: ArticleFormat;
	mediaDuration?: number;
	hasKicker: boolean;
};

const iconWrapperStyles = (palette: Palette, hasKicker: boolean) => css`
	width: 24px;
	height: 24px;
	/* We’re using the text colour for the icon badge */
	background-color: ${hasKicker
		? palette.text.cardKicker
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

const durationStyles = (palette: Palette, hasKicker: boolean) => css`
	color: ${hasKicker ? palette.text.cardKicker : palette.text.cardFooter};
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
	if (h > 0 && m < 10) duration.push(`0${m}`); // e.g 1:01:11
	else duration.push(m); // supports 0:59
	if (s > 0) {
		if (s < 10) duration.push(`0${s}`);
		else duration.push(s);
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
	hasKicker,
}: {
	mediaType: MediaType;
	palette: Palette;
	hasKicker: boolean;
}) => (
	<span css={iconWrapperStyles(palette, hasKicker)}>
		<Icon mediaType={mediaType} />
	</span>
);

const MediaDuration = ({
	mediaDuration,
	palette,
	hasKicker,
}: {
	mediaDuration: number;
	palette: Palette;
	hasKicker: boolean;
}) => (
	<p css={durationStyles(palette, hasKicker)}>
		{secondsToDuration(mediaDuration)}
	</p>
);

export const MediaMeta = ({
	mediaType,
	mediaDuration,
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
			&nbsp;
			{mediaDuration !== undefined && mediaDuration > 0 && (
				<MediaDuration
					mediaDuration={mediaDuration}
					palette={palette}
					hasKicker={hasKicker}
				/>
			)}
		</div>
	);
};
