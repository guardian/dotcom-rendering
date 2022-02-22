import { css } from '@emotion/react';
import { from } from '@guardian/source-foundations';
import { useEffect, useState } from 'react';
import { getZIndex } from '../lib/getZIndex';
import { useHasBeenSeen } from '../lib/useHasBeenSeen';

const buttonStyles = css`
	position: absolute;
	left: 0;
	top: 0;
	${getZIndex('sticky-video-button')};
`;

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
	bottom: 20px;
	width: 300px;
	height: 169px;
	${getZIndex('sticky-video')};
	animation: fade-in-up 1s ease forwards;

	figcaption {
		display: none;
	}
`;

const stickyContainerStyles = (height: number) => css`
	height: ${height * 0.75}px;
	position: relative;
	display: flex;
	justify-content: flex-end;

	${from.tablet} {
		height: ${height * 1.25}px;
	}
`;

interface Props {
	isPlaying: boolean;
	height: number;
	children: React.ReactNode;
}

export const StickyVideo = ({ isPlaying, height, children }: Props) => {
	const [isSticky, setIsSticky] = useState(false);
	const [isIntersecting, setRef] = useHasBeenSeen({
		threshold: 0.1,
		repeat: true,
	});

	useEffect(() => {
		if (isPlaying) setIsSticky(isIntersecting);
	}, [isIntersecting, isPlaying]);

	return (
		<div ref={setRef} css={isSticky && stickyContainerStyles(height)}>
			<div css={isSticky && stickyStyles}>
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
