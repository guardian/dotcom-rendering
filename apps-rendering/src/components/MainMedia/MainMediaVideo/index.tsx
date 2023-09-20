// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign } from '@guardian/libs';
import { from, neutral, remSpace } from '@guardian/source-foundations';
import type { FC } from 'react';
import { darkModeCss, wideContentWidth } from 'styles';
import type { Video } from 'video';

// ----- Component ----- //

const videoHeight = wideContentWidth * 0.5625;

const marginAuto = `
    margin-left: auto;
    margin-right: auto;
`;

const backgroundColour = (format: ArticleFormat): string => {
	switch (format.design) {
		case ArticleDesign.Gallery:
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
		case ArticleDesign.Picture:
			return neutral[20];
		case ArticleDesign.Editorial:
		case ArticleDesign.Letter:
		case ArticleDesign.Comment:
			return neutral[86];
		default:
			return neutral[97];
	}
};

const styles = (format: ArticleFormat): SerializedStyles => css`
	margin: 0 0 ${remSpace[3]} 0;
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
		${format.design === ArticleDesign.LiveBlog ||
		format.design === ArticleDesign.DeadBlog
			? null
			: marginAuto}
	}
`;
interface Props {
	video: Video;
	format: ArticleFormat;
}

const MainMediaVideo: FC<Props> = ({ video, format }) => (
	<div
		className="js-native-video"
		css={styles(format)}
		data-posterurl={video.posterUrl}
		data-videoid={video.videoId}
		data-duration={video.duration}
	></div>
);

// ----- Exports ----- //

export default MainMediaVideo;
