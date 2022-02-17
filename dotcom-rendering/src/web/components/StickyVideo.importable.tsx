import { css } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';
import { getZIndex } from '../lib/getZIndex';
import { useStickyVideo } from '../lib/useStickyVideo';
import { StickyVideoButton } from './StickyVideoButton';

const stickyStyles = (marginRight: number) => css`
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
	right: ${marginRight}px;
	bottom: 20px;
	width: 300px;
	height: 169px;
	${getZIndex('sticky-video')};
	animation: fade-in-up 1s ease forwards;

	figcaption {
		display: none;
	}
`;

const containerStyles = (height: number) => css`
	// this is a hack - how can we calculate this better?
	height: ${height * 1.43}px;
	position: relative;
`;

interface Props {
	isPlaying: boolean;
	height: number;
	children: React.ReactNode;
}

export const StickyVideo = ({ isPlaying, children, height }: Props) => {
	const ref = useRef<HTMLDivElement>(null);
	const [stickyVideo, setStickyVideo] = useState(false);
	const [marginRight, setMarginRight] = useState(0);
	const [isIntersecting, setRef] = useStickyVideo({
		threshold: 0.1,
		debounce: false,
	});

	useEffect(() => {
		setStickyVideo(isIntersecting && isPlaying);

		if (ref.current) {
			const width = window.innerWidth;
			const right = ref.current?.getBoundingClientRect().right;
			setMarginRight(width - right - 15);
		}
	}, [isIntersecting, isPlaying]);

	return (
		<div css={containerStyles(height)} ref={ref}>
			<div ref={setRef}>
				<div css={stickyVideo ? stickyStyles(marginRight) : null}>
					{isPlaying && (
						<>
							<StickyVideoButton
								onClick={() => {
									setStickyVideo(!stickyVideo);
								}}
								stickyVideo={stickyVideo}
							/>
						</>
					)}
					{children}
				</div>
			</div>
		</div>
	);
};
