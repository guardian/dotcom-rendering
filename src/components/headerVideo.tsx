// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { neutral, remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import type { Format } from '@guardian/types';
import { Design } from '@guardian/types';
import type { FC } from 'react';
import { darkModeCss, wideContentWidth } from 'styles';
import type { Video } from 'video';

// ----- Component ----- //

const videoHeight = wideContentWidth * 0.5625;

const marginAuto = `
    margin-left: auto;
    margin-right: auto;
`;

const backgroundColour = (format: Format): string => {
	switch (format.design) {
		case Design.Media:
			return neutral[20];
		case Design.Comment:
			return neutral[86];
		default:
			return neutral[97];
	}
};

const styles = (format: Format): SerializedStyles => css`
	margin: 0 0 ${remSpace[2]} 0;
	position: relative;
	display: block;
	width: 100%;
	padding-bottom: 56.25%;
	background: ${backgroundColour(format)};

	${darkModeCss`
        background: ${neutral[20]};
    `}

	${from.wide} {
		padding-bottom: ${videoHeight}px;
		width: ${wideContentWidth}px;
		${format.design !== Design.Live ? marginAuto : null}
	}
`;

interface Props {
	video: Video;
	format: Format;
}

const HeaderVideo: FC<Props> = ({ video, format }) => (
	<div
		css={styles(format)}
		data-posterUrl={video.posterUrl}
		data-videoId={video.videoId}
		data-duration={video.duration}
	></div>
);

// ----- Exports ----- //

export default HeaderVideo;
