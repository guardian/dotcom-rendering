import type { Participations } from '@guardian/ab-core';
import type { ArticleFormat, ConsentState } from '@guardian/libs';
import { isUndefined } from '@guardian/libs';
import { useCallback, useState } from 'react';
import type {
	ImagePositionType,
	ImageSizeType,
} from '../Card/components/ImageWrapper';
import { MaintainAspectRatio } from '../MaintainAspectRatio';
import type { VideoCategory } from './YoutubeAtomOverlay';
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

type Props = {
	index?: number;
	videoId: string;
	overrideImage?: string | undefined;
	posterImage?: string | undefined;
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
	enableIma: boolean;
	abTestParticipations: Participations;
	videoCategory?: VideoCategory;
	kicker?: string;
	shouldPauseOutOfView?: boolean;
	showTextOverlay?: boolean;
	imageSize: ImageSizeType;
	imagePositionOnMobile: ImagePositionType;
};

export const YoutubeAtom = ({
	index,
	videoId,
	overrideImage,
	posterImage,
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
	enableIma,
	abTestParticipations,
	videoCategory,
	kicker,
	format,
	shouldPauseOutOfView = false,
	showTextOverlay = false,
	imageSize,
	imagePositionOnMobile,
}: Props): JSX.Element => {
	const [overlayClicked, setOverlayClicked] = useState<boolean>(false);
	const [playerReady, setPlayerReady] = useState<boolean>(false);
	const [isActive, setIsActive] = useState<boolean>(false);
	const [isClosed, setIsClosed] = useState<boolean>(false);
	const [pauseVideo, setPauseVideo] = useState<boolean>(false);

	const uniqueId = `${videoId}-${index ?? 'server'}`;

	/**
	 * Consent and ad targeting are set by subsequent re-renders
	 */
	const adTargetingEnabled =
		!!adTargeting &&
		!adTargeting.disableAds &&
		!!consentState &&
		consentState.canTarget;

	/**
	 * IMA integration is only enabled if the user has consented to ad targeting
	 */
	const imaEnabled = enableIma && adTargetingEnabled;

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

	const hasOverlay = !!(overrideImage ?? posterImage);

	/**
	 * Show an overlay if:
	 *
	 * - It exists
	 *
	 * AND
	 *
	 * - It hasn't been clicked
	 */
	const showOverlay = hasOverlay && !overlayClicked;

	/**
	 * Show a placeholder if:
	 *
	 * - We don't have an overlay OR the user has clicked the overlay
	 *
	 * AND
	 *
	 * - The player is not ready
	 */
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

	if (isUndefined(index)) {
		loadPlayer = false;
	}

	/**
	 * Create a stable callback as it will be a useEffect dependency in YoutubeAtomPlayer
	 */
	const playerReadyCallback = useCallback(() => setPlayerReady(true), []);

	return (
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
			<MaintainAspectRatio height={height} width={width}>
				{loadPlayer && consentState && adTargeting && (
					<YoutubeAtomPlayer
						videoId={videoId}
						uniqueId={uniqueId}
						adTargeting={adTargeting}
						consentState={consentState}
						height={height}
						width={width}
						title={title}
						origin={origin}
						eventEmitters={compositeEventEmitters}
						/**
						 * If there is an overlay we want to autoplay
						 * If there is not an overlay the user will use the YouTube player UI to play
						 */
						autoPlay={hasOverlay}
						onReady={playerReadyCallback}
						enableIma={imaEnabled}
						pauseVideo={pauseVideo}
						deactivateVideo={() => {
							setIsActive(false);
						}}
						abTestParticipations={abTestParticipations}
					/>
				)}
				{showOverlay && (
					<YoutubeAtomOverlay
						uniqueId={uniqueId}
						overrideImage={overrideImage}
						posterImage={posterImage}
						height={height}
						width={width}
						alt={alt}
						duration={duration}
						title={title}
						onClick={() => setOverlayClicked(true)}
						videoCategory={videoCategory}
						kicker={kicker}
						format={format}
						showTextOverlay={showTextOverlay}
						imageSize={imageSize}
						imagePositionOnMobile={imagePositionOnMobile}
					/>
				)}
				{showPlaceholder && (
					<YoutubeAtomPlaceholder uniqueId={uniqueId} />
				)}
			</MaintainAspectRatio>
		</YoutubeAtomSticky>
	);
};
