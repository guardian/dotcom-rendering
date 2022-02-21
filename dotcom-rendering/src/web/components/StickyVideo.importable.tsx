import { css } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';
import { getZIndex } from '../lib/getZIndex';
import { useStickyObserver } from '../lib/useStickyObserver';

const buttonStyles = css`
	position: absolute;
	left: 0;
	top: 0;
	${getZIndex('sticky-video-button')};
`;

const stickyStyles = (right: number) => css`
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
	right: ${right}px;
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
	height: ${height}px;
	position: relative;
`;

interface Props {
	isPlaying: boolean;
	children: React.ReactNode;
}

export const StickyVideo = ({ isPlaying, children }: Props) => {
	const ref = useRef<HTMLDivElement>(null);

	const [containerHeight, setContainerHeight] = useState(0);
	const [rightMargin, setRightMargin] = useState(0);
	const [isSticky, setIsSticky] = useState(false);
	const [isIntersecting, setRef] = useStickyObserver({
		threshold: 0.1,
	});

	const { current } = ref;

	useEffect(() => {
		if (!current) return;

		const { right, height } = current.getBoundingClientRect();
		const { innerWidth } = window;

		setRightMargin(innerWidth - right);
		setContainerHeight(height);
	}, [current]);

	useEffect(() => {
		if (isPlaying) setIsSticky(isIntersecting);
	}, [isIntersecting, isPlaying]);

	return (
		<div ref={setRef} css={containerStyles(containerHeight)}>
			<div ref={ref} css={isSticky && stickyStyles(rightMargin)}>
				{isSticky && (
					<button
						css={buttonStyles}
						onClick={() => setIsSticky(false)}
					>
						Unstick
					</button>
				)}
				{children}
			</div>
		</div>
	);
};
