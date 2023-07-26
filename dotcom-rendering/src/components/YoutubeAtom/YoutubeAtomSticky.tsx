import { css } from '@emotion/react';
import { log } from '@guardian/libs';
import { from, neutral, space } from '@guardian/source-foundations';
import { SvgCross } from '@guardian/source-react-components';
import detectMobile from 'is-mobile';
import { useEffect, useState } from 'react';
import { submitComponentEvent } from '../../client/ophan/ophan';
import { useIsInView } from '../../lib/useIsInView';
import type { VideoEventKey } from '../../types/youtubeAtom';

const buttonStyles = css`
	position: absolute;
	left: -36px;
	top: 0;
	z-index: 22;
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

/**
 * This extended hover area allows users to click the close video button more easily
 */
const hoverAreaStyles = (fullWidthOverlay: boolean) => {
	const hoverAreaWidth = 37;

	return css`
		position: absolute;
		top: -4px;
		bottom: 0;
		left: -${hoverAreaWidth}px;
		width: ${hoverAreaWidth}px;

		&:hover button {
			display: flex;
		}

		width: ${fullWidthOverlay
			? `calc(100% + ${hoverAreaWidth}px)`
			: `${hoverAreaWidth}px`};
	`;
};

const stickyStyles = (showButton: boolean) => css`
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
	width: 215px;
	z-index: 21;
	animation: fade-in-up 1s ease both;

	${from.tablet} {
		width: 300px;
	}

	figcaption {
		display: none;
	}

	button {
		display: ${showButton ? 'flex' : 'none'};
	}

	&:hover button {
		display: flex;
	}
`;

const stickyContainerStyles = (isMainMedia?: boolean) => {
	return css`
		height: 192px;
		position: relative;
		display: flex;
		justify-content: flex-end;
		padding-right: ${isMainMedia ? `${space[5]}px` : 0};

		${from.phablet} {
			height: 349px;
		}
	`;
};

type Props = {
	uniqueId: string;
	videoId: string;
	eventEmitters: Array<(event: VideoEventKey) => void>;
	shouldStick?: boolean;
	setPauseVideo: () => void;
	isActive: boolean;
	isMainMedia?: boolean;
	children: JSX.Element;
	isClosed: boolean;
	setIsClosed: (state: boolean) => void;
};

const isMobile = detectMobile({ tablet: true });

export const YoutubeAtomSticky = ({
	uniqueId,
	videoId,
	eventEmitters,
	shouldStick,
	setPauseVideo,
	isActive,
	isMainMedia,
	children,
	isClosed,
	setIsClosed,
}: Props): JSX.Element => {
	const [isSticky, setIsSticky] = useState<boolean>(false);
	const [stickEventSent, setStickEventSent] = useState<boolean>(false);
	const [showOverlay, setShowOverlay] = useState<boolean>(isMobile);

	const [isIntersecting, setRef] = useIsInView({
		threshold: 0.5,
		repeat: true,
		debounce: true,
	});

	/**
	 * Click handler for the sticky video close button
	 */
	const handleCloseClick = () => {
		// unstick the video
		setIsSticky(false);
		// reset the sticky event sender
		setStickEventSent(false);
		// pause the video
		setPauseVideo();
		// set isClosed so that player won't restick
		setIsClosed(true);

		// log a 'close' event
		log('dotcom', {
			from: `YoutubeAtom handleCloseClick`,
			videoId,
			msg: 'Close',
		});

		// submit a 'close' event to Ophan
		submitComponentEvent({
			component: {
				componentType: 'STICKY_VIDEO',
				id: videoId,
			},
			action: 'CLOSE',
		});
	};

	/**
	 * keydown event handler
	 *
	 * closes sticky video when Escape key is pressed
	 */
	const handleKeydown = (e: { key: string }) => {
		if (e.key === 'Escape') {
			handleCloseClick();
		}
	};

	/**
	 * useEffect to create keydown listener
	 */
	useEffect(() => {
		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
		// eslint-disable-next-line react-hooks/exhaustive-deps -- TODO
	}, []);

	/**
	 * useEffect for the sticky state
	 */
	useEffect(() => {
		if (shouldStick) setIsSticky(isActive && !isIntersecting && !isClosed);
	}, [isIntersecting, isActive, shouldStick, isClosed]);

	/**
	 * useEffect for the stick events
	 */
	useEffect(() => {
		if (isSticky && !stickEventSent) {
			setStickEventSent(true);

			log('dotcom', {
				from: 'YoutubeAtom stick useEffect',
				videoId,
				msg: 'Stick',
			});

			submitComponentEvent({
				component: {
					componentType: 'STICKY_VIDEO',
					id: videoId,
				},
				action: 'STICK',
			});
		}
	}, [isSticky, stickEventSent, videoId, eventEmitters]);

	/**
	 * useEffect for mobile only sticky overlay
	 *
	 * this allows mobile uses to tap to reveal the close button
	 */
	useEffect(() => {
		setShowOverlay(isMobile && isSticky);
	}, [isSticky]);

	const showCloseButton = !showOverlay && isMobile;

	return (
		<div
			ref={setRef}
			css={isSticky && stickyContainerStyles(isMainMedia)}
			data-cy={`youtube-sticky-${uniqueId}`}
			data-is-sticky={isSticky}
		>
			<div css={isSticky && stickyStyles(showCloseButton)}>
				{children}
				{isSticky && (
					<>
						{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions -- TODO */}
						<span
							css={hoverAreaStyles(showOverlay)}
							onClick={() => setShowOverlay(false)}
						/>
						<button
							type="button"
							css={buttonStyles}
							onClick={handleCloseClick}
							data-cy={`youtube-sticky-close-${uniqueId}`}
						>
							<SvgCross size="medium" />
						</button>
					</>
				)}
			</div>
		</div>
	);
};
