import { css } from '@emotion/react';
import { from, neutral } from '@guardian/source-foundations';
import { SvgCross } from '@guardian/source-react-components';
import { useEffect, useState } from 'react';
import { getZIndex } from '../lib/getZIndex';
import { useHasBeenSeen } from '../lib/useHasBeenSeen';

const buttonStyles = css`
	position: absolute;
	left: -36px;
	top: 0;
	${getZIndex('sticky-video-button')};
	background-color: ${neutral[7]};
	height: 32px;
	width: 32px;
	border-radius: 50%;
	border: 0;
	padding: 0;
	cursor: pointer;
	display: none;
	justify-content: center;
	align-items: center;
	transition: transform 0.2s; /* Animation */

	&:hover {
		transform: scale(1.2);
	}

	svg {
		fill: ${neutral[100]};
	}
`;

const hoverAreaStyles = css`
	position: absolute;
	left: -40px;
	top: 0;
	bottom: 0;
	right: 100%;

	&:hover button {
		display: flex;
	}
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
	width: 216px;
	${getZIndex('sticky-video')};
	animation: fade-in-up 1s ease forwards;

	&:hover button {
		display: flex;
	}

	${from.tablet} {
		width: 300px;
	}

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
		height: ${height * 1.5}px;
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
		setIsSticky(isIntersecting && isPlaying);
	}, [isIntersecting, isPlaying]);

	return (
		<div ref={setRef} css={isSticky && stickyContainerStyles(height)}>
			<div css={isSticky && stickyStyles}>
				<span css={hoverAreaStyles} />
				{isSticky && (
					<button
						css={buttonStyles}
						onClick={() => setIsSticky(false)}
					>
						<SvgCross size="medium" />
					</button>
				)}
				{children}
			</div>
		</div>
	);
};
