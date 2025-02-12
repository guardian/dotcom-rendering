import type { Participations } from '@guardian/ab-core';
import type { ConsentState } from '@guardian/libs';
import type { ReactElement } from 'react';
import { useCallback, useState } from 'react';
import type { AdTargeting } from '../../types/commercial';
import type { AspectRatio } from '../../types/front';
import type { RenderingTarget } from '../../types/renderingTarget';
import { MaintainAspectRatio } from '../MaintainAspectRatio';
import { YoutubeAtomPlaceholder } from './YoutubeAtomPlaceholder';
import { YoutubeAtomPlayer } from './YoutubeAtomPlayer';
import { YoutubeAtomSticky } from './YoutubeAtomSticky';

export type VideoEventKey =
	| 'play'
	| '25'
	| '50'
	| '75'
	| 'end'
	| 'skip'
	| 'cued'
	| 'resume'
	| 'pause';

export type Props = {
	atomId: string;
	videoId: string;
	uniqueId: string;
	image?: string;
	adTargeting?: AdTargeting;
	consentState?: ConsentState;
	height?: number;
	width?: number;
	title?: string;
	origin?: string;
	eventEmitters: Array<(event: VideoEventKey) => void>;
	shouldStick?: boolean;
	isMainMedia?: boolean;
	abTestParticipations: Participations;
	shouldPauseOutOfView?: boolean;
	renderingTarget: RenderingTarget;
	aspectRatio?: AspectRatio;
	renderOverlay: ({
		uniqueId,
		image,
		height,
		width,
		onClick,
	}: {
		uniqueId: string;
		image: string;
		height: number;
		width: number;
		onClick: () => void;
	}) => ReactElement;
};

export const YoutubeAtom = ({
	atomId,
	videoId,
	uniqueId,
	image,
	adTargeting,
	consentState,
	height = 259,
	width = 460,
	title,
	origin,
	eventEmitters,
	shouldStick,
	isMainMedia,
	abTestParticipations,
	shouldPauseOutOfView = false,
	renderingTarget,
	aspectRatio,
	renderOverlay,
}: Props): JSX.Element => {
	const [overlayClicked, setOverlayClicked] = useState<boolean>(false);
	const [playerReady, setPlayerReady] = useState<boolean>(false);
	const [isActive, setIsActive] = useState<boolean>(false);
	const [isClosed, setIsClosed] = useState<boolean>(false);
	const [pauseVideo, setPauseVideo] = useState<boolean>(false);

	/**
	 * Consent and ad targeting are initially undefined and set by subsequent re-renders
	 */
	const adTargetingEnabled =
		!!adTargeting &&
		!adTargeting.disableAds &&
		!!consentState &&
		consentState.canTarget;

	/**
	 * Update the isActive state based on video events
	 *
	 * @param {VideoEventKey} videoEvent the video event which triggers the callback
	 */
	const playerState = (videoEvent: VideoEventKey) => {
		switch (videoEvent) {
			case 'play':
			case 'resume':
				setPauseVideo(false);
				setIsClosed(false);
				setIsActive(true);
				break;
			case 'end':
			case 'cued':
				setIsActive(false);
				break;
			default:
				break;
		}
	};

	/**
	 * Combine the videoState and tracking event emitters
	 */
	const compositeEventEmitters = [playerState, ...eventEmitters];

	/**
	 * The loading sequence of the YoutubeAtom is as follows:
	 *
	 * Overlay -> Placeholder -> Player
	 *
	 * In detail:
	 *
	 * 1. Initially show the overlay if it exists
	 * 2. When the overlay is clicked
	 *     2.1 Remove the overlay
	 *     2.2 Show the placeholder until the player is ready
	 * 3. When consent and ad targeting is available render the player to initiate loading of the YouTube player
	 * 4. When the player is ready the placeholder is removed and the YouTube player is shown
	 */
	const hasOverlay = !!image;

	const showOverlay = hasOverlay && !overlayClicked;

	const showPlaceholder = (!hasOverlay || overlayClicked) && !playerReady;

	let loadPlayer;
	if (!hasOverlay) {
		// load the player if there is no overlay
		loadPlayer = true;
	} else if (overlayClicked) {
		// load the player if the overlay has been clicked
		loadPlayer = true;
	} else {
		loadPlayer = false;
	}

	/**
	 * Create a stable callback as it will be a useEffect dependency in YoutubeAtomPlayer
	 */
	const playerReadyCallback = useCallback(() => setPlayerReady(true), []);

	return (
		<div
			data-component="youtube-atom"
			data-atom-id={atomId}
			data-video-id={videoId}
			data-video-unique-id={uniqueId}
		>
			<YoutubeAtomSticky
				uniqueId={uniqueId}
				videoId={videoId}
				shouldStick={shouldStick}
				isActive={isActive}
				eventEmitters={eventEmitters}
				setPauseVideo={setPauseVideo}
				isMainMedia={isMainMedia}
				isClosed={isClosed}
				setIsClosed={setIsClosed}
				shouldPauseOutOfView={shouldPauseOutOfView}
			>
				<MaintainAspectRatio
					height={height}
					width={width}
					aspectRatio={aspectRatio}
				>
					{
						/**
						 * Consent and ad targeting are initially undefined and set by subsequent re-renders
						 * Wait until they are defined before rendering the player
						 */
						loadPlayer && consentState && adTargeting && (
							<YoutubeAtomPlayer
								videoId={videoId}
								uniqueId={uniqueId}
								height={height}
								width={width}
								title={title}
								origin={origin}
								eventEmitters={compositeEventEmitters}
								/**
								 * If there is an overlay we want to autoplay
								 * If there isn't an overlay the user will use the YouTube player UI to play
								 */
								autoPlay={hasOverlay}
								onReady={playerReadyCallback}
								pauseVideo={pauseVideo}
								deactivateVideo={() => {
									setIsActive(false);
								}}
								enableAds={adTargetingEnabled}
								adTargeting={adTargeting}
								consentState={consentState}
								abTestParticipations={abTestParticipations}
								renderingTarget={renderingTarget}
							/>
						)
					}
					{showOverlay &&
						renderOverlay({
							uniqueId,
							image,
							height,
							width,
							onClick: () => setOverlayClicked(true),
						})}
					{showPlaceholder && (
						<YoutubeAtomPlaceholder uniqueId={uniqueId} />
					)}
				</MaintainAspectRatio>
			</YoutubeAtomSticky>
		</div>
	);
};
