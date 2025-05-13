import { css } from '@emotion/react';
import {
	SvgAudio,
	SvgCamera,
	SvgVideo,
} from '@guardian/source/react-components';
import { palette as themePalette } from '../palette';
import type { MainMedia } from '../types/mainMedia';

type Props = {
	mediaType: MainMedia['type'];
	hasKicker: boolean;
};

const iconWrapperStyles = (hasKicker: boolean) => css`
	width: 24px;
	height: 24px;
	/* We’re using the text colour for the icon badge */
	background-color: ${hasKicker
		? themePalette('--card-kicker-text')
		: themePalette('--card-footer-text')};
	border-radius: 50%;
	display: inline-block;

	> svg {
		width: 20px;
		height: 20px;
		margin-left: auto;
		margin-right: auto;
		margin-top: 2px;
		display: block;
		fill: ${themePalette('--card-media-icon')};
	}
`;

const wrapperStyles = css`
	display: flex;
	align-items: center;
	margin-top: 4px;
`;

export const Icon = ({ mediaType }: { mediaType: MainMedia['type'] }) => {
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
	hasKicker,
}: {
	mediaType: MainMedia['type'];
	hasKicker: boolean;
}) => {
	return (
		<span css={iconWrapperStyles(hasKicker)}>
			<Icon mediaType={mediaType} />
		</span>
	);
};

export const MediaMeta = ({ mediaType, hasKicker }: Props) => {
	return (
		<div css={wrapperStyles}>
			<MediaIcon mediaType={mediaType} hasKicker={hasKicker} />
		</div>
	);
};
