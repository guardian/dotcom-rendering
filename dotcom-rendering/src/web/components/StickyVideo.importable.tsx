import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { getZIndex } from '../lib/getZIndex';
import { useStickyVideo } from '../lib/useStickyVideo';

interface Props {
	isPlaying: boolean;
	height: number;
	children: React.ReactNode;
}

const stickyStyles = css`
	position: fixed;
	bottom: 50px;
	right: 20px;
	width: 260px;
	height: 145px;
	z-index: ${getZIndex('sticky-video')};

	figcaption {
		display: none;
	}
`;

const containerStyles = (height: number) => css`
	height: ${height}px;
`;

export const StickyVideo = ({ isPlaying, children, height }: Props) => {
	const [stickyVideo, setStickyVideo] = useState(false);
	const [isIntersecting, setRef] = useStickyVideo({
		threshold: 0.9,
		debounce: true,
	});

	useEffect(() => {
		setStickyVideo(isIntersecting && isPlaying);
	}, [isIntersecting, isPlaying]);

	return (
		<div css={containerStyles(height)}>
			{!stickyVideo ? (
				<div ref={setRef}>{children}</div>
			) : (
				<div css={stickyStyles}>
					<button
						onClick={() => {
							setStickyVideo(false);
						}}
					>
						Unstick
					</button>
					{children}
				</div>
			)}
		</div>
	);
};
