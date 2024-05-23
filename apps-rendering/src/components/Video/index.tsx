import { css } from '@emotion/react';
import { neutral, remSpace } from '@guardian/source/foundations';
import type { FC, ReactElement } from 'react';
import { darkModeCss } from 'styles';

export interface VideoProps {
	src: string;
	width: number;
	height: number;
}

const videoStyles = css`
	background: ${neutral[97]};
	padding-bottom: 56.25%;
	width: 100%;
	position: relative;
	overflow: hidden;
	margin: ${remSpace[4]} 0;

	iframe {
		border: none;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}

	${darkModeCss`
        color: ${neutral[60]};
        background-color: ${neutral[20]};
    `}
`;

const Video: FC<VideoProps> = ({
	src,
	width,
	height,
}: VideoProps): ReactElement => (
	<div css={videoStyles}>
		<iframe
			src={src}
			height={height}
			width={width}
			allowFullScreen
			title="Video element"
		/>
	</div>
);

export default Video;
