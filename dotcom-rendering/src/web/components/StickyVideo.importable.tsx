import { css } from '@emotion/react';
import { from } from '@guardian/source-foundations';
import { useEffect, useState } from 'react';
import { getZIndex } from '../lib/getZIndex';
import { useIsInView } from '../lib/useIsInView';

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
	height: ${height}px;
	position: relative;
	display: flex;
	justify-content: flex-end;

	${from.tablet} {
		height: ${height * 2}px;
	}
`;

interface Props {
	isPlaying: boolean;
	children: React.ReactNode;
}

export const StickyVideo = ({ isPlaying, children }: Props) => {
	const [isSticky, setIsSticky] = useState(false);
	const [isIntersecting, setRef] = useIsInView({
		threshold: 0.1,
		repeat: true,
	});

	useEffect(() => {
		setIsSticky(isIntersecting && isPlaying);
	}, [isIntersecting, isPlaying]);

	return (
		<div ref={setRef} css={isSticky && stickyContainerStyles(192)}>
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
