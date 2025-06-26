import type { Participations } from '@guardian/ab-core';
import type { ConsentState } from '@guardian/libs';
import { useCallback, useState } from 'react';
import type { ArticleFormat } from '../../lib/articleFormat';
import type { AdTargeting } from '../../types/commercial';
import type { AspectRatio } from '../../types/front';
import type { RenderingTarget } from '../../types/renderingTarget';
import type { PlayButtonSize } from '../Card/components/PlayIcon';
import type { ResponsiveFontSize } from '../CardHeadline';
import { MaintainAspectRatio } from '../MaintainAspectRatio';
import { YoutubeAtomFeatureCardOverlay } from './YoutubeAtomFeatureCardOverlay';
import { YoutubeAtomOverlay } from './YoutubeAtomOverlay';
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
	alt: string;
	duration?: number; // in seconds
	origin?: string;
	eventEmitters: Array<(event: VideoEventKey) => void>;
	format: ArticleFormat;
	shouldStick?: boolean;
	isMainMedia?: boolean;
	abTestParticipations: Participations;
	kicker?: string;
	shouldPauseOutOfView?: boolean;
	showTextOverlay: boolean;
	iconSizeOnDesktop: PlayButtonSize;
	iconSizeOnMobile: PlayButtonSize;
	hidePillOnMobile: boolean;
	renderingTarget: RenderingTarget;
	aspectRatio?: AspectRatio;
	mobileAspectRatio?: AspectRatio;
	trailText?: string;
	headlineSizes?: ResponsiveFontSize;
	isVideoArticle?: boolean;
	webPublicationDate?: string;
	showClock?: boolean;
	absoluteServerTimes?: boolean;
	linkTo?: string;
	discussionApiUrl?: string;
	discussionId?: string;
	isFeatureCard?: boolean;
	isImmersive?: boolean;
	byline?: string;
	showByline?: boolean;
	isInHideTrailsAbTest?: boolean;
};

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
export const YoutubeAtom = ({
	atomId,
	videoId,
	uniqueId,
	image,
	adTargeting,
	consentState,
	height = 259,
	width = 460,
	alt,
	title,
	duration,
	origin,
	eventEmitters,
	shouldStick,
	isMainMedia,
	abTestParticipations,
	kicker,
	format,
	shouldPauseOutOfView = false,
	showTextOverlay,
	iconSizeOnDesktop,
	iconSizeOnMobile,
	hidePillOnMobile,
	renderingTarget,
	aspectRatio,
	mobileAspectRatio,
	trailText,
	headlineSizes,
	isVideoArticle,
	webPublicationDate,
	showClock,
	absoluteServerTimes,
	linkTo,
	discussionApiUrl,
	discussionId,
	isFeatureCard,
	isImmersive,
	byline,
	showByline,
	isInHideTrailsAbTest,
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
					mobileAspectRatio={mobileAspectRatio}
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
						(isFeatureCard ? (
							<YoutubeAtomFeatureCardOverlay
								uniqueId={uniqueId}
								height={height}
								width={width}
								alt={alt}
								format={format}
								title={title}
								onClick={() => setOverlayClicked(true)}
								headlineSizes={headlineSizes}
								image={image}
								duration={duration}
								kicker={kicker}
								aspectRatio={aspectRatio}
								mobileAspectRatio={mobileAspectRatio}
								trailText={trailText}
								isVideoArticle={isVideoArticle}
								webPublicationDate={webPublicationDate}
								showClock={!!showClock}
								absoluteServerTimes={absoluteServerTimes}
								linkTo={linkTo}
								discussionId={discussionId}
								discussionApiUrl={discussionApiUrl}
								isImmersive={isImmersive}
								byline={byline}
								showByline={showByline}
								isInHideTrailsAbTest={isInHideTrailsAbTest}
							/>
						) : (
							<YoutubeAtomOverlay
								uniqueId={uniqueId}
								image={image}
								height={height}
								width={width}
								alt={alt}
								duration={duration}
								title={title}
								onClick={() => setOverlayClicked(true)}
								kicker={kicker}
								format={format}
								showTextOverlay={showTextOverlay}
								iconSizeOnDesktop={iconSizeOnDesktop}
								iconSizeOnMobile={iconSizeOnMobile}
								hidePillOnMobile={hidePillOnMobile}
								aspectRatio={aspectRatio}
							/>
						))}
					{showPlaceholder && (
						<YoutubeAtomPlaceholder uniqueId={uniqueId} />
					)}
				</MaintainAspectRatio>
			</YoutubeAtomSticky>
		</div>
	);
};
