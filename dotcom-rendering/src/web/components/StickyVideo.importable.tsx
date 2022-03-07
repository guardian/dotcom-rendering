import { css } from '@emotion/react';
import { from, neutral } from '@guardian/source-foundations';
import { SvgCross } from '@guardian/source-react-components';
import { useEffect, useState } from 'react';
import { submitComponentEvent } from '../browser/ophan/ophan';
import { getZIndex } from '../lib/getZIndex';
import { useIsInView } from '../lib/useIsInView';

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
	transition: transform 0.2s;

	&:hover {
		transform: scale(1.15);
	}

	svg {
		fill: ${neutral[100]};
	}
`;

// This extended hover area allows users
// to click the close video button more easily
const hoverAreaStyles = css`
	position: absolute;
	top: -4px;
	bottom: 0;
	left: -${32 * 1.15}px;
	width: ${32 * 1.15}px;

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
	animation: fade-in-up 1s ease both;

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
	videoId: string;
}

interface StickyState {
	isSticky: boolean;
	isClosed: boolean;
}

export const StickyVideo = ({ isPlaying, children, videoId }: Props) => {
	const [stickyState, setStickyState] = useState<StickyState>({
		isSticky: false,
		isClosed: false,
	});

	const [isIntersecting, setRef] = useIsInView({
		threshold: 0.5,
		repeat: true,
	});

	useEffect(() => {
		setStickyState({
			isSticky: isPlaying && !isIntersecting,
			isClosed: false,
		});
	}, [isIntersecting, isPlaying]);

	useEffect(() => {
		if (stickyState.isSticky) {
			submitComponentEvent({
				component: {
					componentType: 'STICKY_VIDEO',
					id: videoId,
				},
				action: 'STICK',
			});
		} else if (stickyState.isClosed) {
			submitComponentEvent({
				component: {
					componentType: 'STICKY_VIDEO',
					id: videoId,
				},
				action: 'CLOSE',
			});
		} else {
			submitComponentEvent({
				component: {
					componentType: 'STICKY_VIDEO',
					id: videoId,
				},
				action: 'RETURN',
			});
		}
	}, [stickyState, videoId]);

	if (!videoId) return null;

	return (
		<div
			ref={setRef}
			css={stickyState.isSticky && stickyContainerStyles(192)}
		>
			<div css={stickyState.isSticky && stickyStyles}>
				<span css={hoverAreaStyles} />
				{stickyState.isSticky && (
					<button
						css={buttonStyles}
						onClick={() => {
							setStickyState({
								isSticky: false,
								isClosed: true,
							});
						}}
					>
						<SvgCross size="medium" />
					</button>
				)}
				{children}
			</div>
		</div>
	);
};
