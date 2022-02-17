import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { getZIndex } from '../lib/getZIndex';
import { useStickyVideo } from '../lib/useStickyVideo';
import { StickyVideoButton } from './StickyVideoButton';

const stickyStyles = css`
	@keyframes fade-in-up {
		from {
			transform: translateY(100%);
			opacity: 0;
		}

		to {
			transform: translateY(0%);
			opacity: 1;
		}
	}

	position: fixed;
	bottom: 145px;
	height: 145px;
	${getZIndex('sticky-video')};
	animation: fade-in-up 1s ease forwards;

	figcaption {
		display: none;
	}
`;

const containerStyles = (height: number) => css`
	height: ${height}px;
	position: relative;
`;

interface Props {
	isPlaying: boolean;
	height: number;
	children: React.ReactNode;
}

export const StickyVideo = ({ isPlaying, children, height }: Props) => {
	const [stickyVideo, setStickyVideo] = useState(false);
	const [isIntersecting, setRef] = useStickyVideo({
		threshold: 0.1,
		debounce: false,
	});

	useEffect(() => {
		setStickyVideo(isIntersecting && isPlaying);
	}, [isIntersecting, isPlaying]);

	return (
		<div css={containerStyles(height)}>
			{!stickyVideo ? (
				<div ref={setRef}>
					{isPlaying && (
						<StickyVideoButton
							onClick={() => setStickyVideo(true)}
							stickyVideo={stickyVideo}
						/>
					)}
					{children}
				</div>
			) : (
				<div css={stickyStyles}>
					<StickyVideoButton
						onClick={() => setStickyVideo(false)}
						stickyVideo={stickyVideo}
					/>
					{children}
				</div>
			)}
		</div>
	);
};
