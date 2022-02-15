import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useStickyVideo } from '../lib/useStickyVideo';

interface Props {
	children: React.ReactNode;
}

const stuckStyles = css`
	@keyframes fade-in-up {
		0% {
			opacity: 0;
		}
		100% {
			transform: translateY(0);
			opacity: 1;
		}
	}

	height: 500px;
	position: fixed;
	bottom: 50px;
	right: 20px;
	width: 260px;
	height: 145px;
	z-index: 9999999;
	transform: translateY(100%);
	animation: fade-in-up 0.25s ease forwards;

	figcaption {
		display: none;
	}
`;

const unstuckStyles = css``;

export const StickyVideo = ({ children }: Props) => {
	const [stickyVideo, setStickyVideo] = useState(false);
	const [hasBeenSeen, setRef] = useStickyVideo({
		threshold: 0,
		debounce: true,
	});

	useEffect(() => {
		setStickyVideo(hasBeenSeen);
	}, [hasBeenSeen]);

	return (
		<div css={stickyVideo ? stuckStyles : unstuckStyles} ref={setRef}>
			{stickyVideo && (
				<button onClick={() => setStickyVideo(false)}>Unstick</button>
			)}
			{children}
		</div>
	);
};
