import { css } from '@emotion/react';

import { textSans } from '@guardian/src-foundations/typography';

import Audio from '@frontend/static/icons/audio.svg';
import Photo from '@frontend/static/icons/photo.svg';
import Video from '@frontend/static/icons/video.svg';

type Props = {
	mediaType: MediaType;
	palette: Palette;
	mediaDuration?: number;
};

const iconWrapperStyles = (mediaType: MediaType, palette: Palette) => css`
	width: 24px;
	height: 23px;
	background-color: ${palette.fill.cardIcon};
	border-radius: 50%;
	display: inline-block;

	> svg {
		width: 14px;
		height: auto;
		margin-left: auto;
		margin-right: auto;
		margin-top: 6px;
		display: block;
		transform: ${mediaType === 'Video' ? `translateY(0.0625rem)` : ``};
	}
`;

const durationStyles = (palette: Palette) => css`
	color: ${palette.text.cardFooter};
	${textSans.xxsmall({ fontWeight: `bold` })}
`;

const wrapperStyles = css`
	display: flex;
	align-items: center;

	padding: 0 5px 5px 5px;
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
			return <Photo />;
		case 'Video':
			return <Video />;
		case 'Audio':
			return <Audio />;
	}
};

const MediaIcon = ({
	mediaType,
	palette,
}: {
	mediaType: MediaType;
	palette: Palette;
}) => (
	<span css={iconWrapperStyles(mediaType, palette)}>
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

export const MediaMeta = ({ mediaType, mediaDuration, palette }: Props) => (
	<div css={wrapperStyles}>
		<MediaIcon mediaType={mediaType} palette={palette} />
		&nbsp;
		{mediaDuration && (
			<MediaDuration mediaDuration={mediaDuration} palette={palette} />
		)}
	</div>
);
