import { css } from '@emotion/react';
import { SvgAudio, SvgCamera } from '@guardian/source-react-components';
import { palette as themePalette } from '../palette';

type Props = {
	mediaType: MediaType;
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
		fill: ${themePalette('--card-background')};
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
	hasKicker,
}: {
	mediaType: MediaType;
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
