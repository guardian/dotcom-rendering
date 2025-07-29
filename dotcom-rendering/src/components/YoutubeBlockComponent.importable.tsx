import type { ConsentState } from '@guardian/libs';
import { useEffect, useState } from 'react';
import type { ArticleFormat } from '../lib/articleFormat';
import { useAB } from '../lib/useAB';
import { useAdTargeting } from '../lib/useAdTargeting';
import type { AdTargeting } from '../types/commercial';
import type { AspectRatio } from '../types/front';
import { Caption } from './Caption';
import type { PlayButtonSize } from './Card/components/PlayIcon';
import type { ResponsiveFontSize } from './CardHeadline';
import { useConfig } from './ConfigContext';
import { ophanTrackerApps, ophanTrackerWeb } from './YoutubeAtom/eventEmitters';
import { YoutubeAtom } from './YoutubeAtom/YoutubeAtom';
import { YoutubeAtomExpiredOverlay } from './YoutubeAtom/YoutubeAtomExpiredOverlay';

const adTargetingDisabled: AdTargeting = { disableAds: true };

type Props = {
	id: string;
	assetId: string;
	index: number;
	mediaTitle?: string;
	altText?: string;
	expired: boolean;
	format: ArticleFormat;
	hideCaption?: boolean;
	overrideImage?: string;
	posterImage?: string;
	isMainMedia?: boolean;
	height?: number;
	width?: number;
	duration?: number; // in seconds
	origin?: string;
	stickyVideos: boolean;
	kickerText?: string;
	pauseOffscreenVideo?: boolean;
	showTextOverlay: boolean;
	iconSizeOnDesktop: PlayButtonSize;
	iconSizeOnMobile: PlayButtonSize;
	hidePillOnMobile: boolean;
	enableAds: boolean;
	aspectRatio?: AspectRatio;
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
	mobileAspectRatio?: AspectRatio;
	isImmersive?: boolean;
	byline?: string;
	showByline?: boolean;
	contentType?: string;
	contentLayout?: string;
};

export const YoutubeBlockComponent = ({
	id,
	assetId,
	index,
	mediaTitle,
	altText,
	format,
	hideCaption,
	overrideImage,
	posterImage = '',
	expired,
	isMainMedia,
	height = 259,
	width = 460,
	duration,
	origin,
	stickyVideos,
	kickerText,
	pauseOffscreenVideo = false,
	showTextOverlay,
	iconSizeOnDesktop,
	iconSizeOnMobile,
	hidePillOnMobile,
	enableAds,
	aspectRatio,
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
	mobileAspectRatio,
	isImmersive,
	byline,
	showByline,
	contentType,
	contentLayout,
}: Props) => {
	const [consentState, setConsentState] = useState<ConsentState | undefined>(
		undefined,
	);

	const adTargeting = useAdTargeting(duration);
	const { renderingTarget } = useConfig();

	const abTests = useAB();
	const abTestParticipations = abTests?.participations ?? {};

	/**
	 * It's possible to have duplicate video atoms on the same page.
	 * For example, liveblogs can have the same video for the main media and in a subsequent block
	 * We need to ensure a unique id for each YouTube player on the page.
	 */
	const uniqueId = `${assetId}-${index}`;

	const getPosterImage = () => {
		// We need Video articles generated directly from Media Atom Maker
		// to always show their poster (16:9) image, but in other cases
		// use the override image (often supplied as 5:4 then cropped to 16:9)
		if (contentType && contentType.toLowerCase() === 'video') {
			return posterImage;
		}

		// For Standard Articles with a Video atom for their main media
		// we need to display the poster image
		if (contentLayout && contentLayout.toLowerCase() === 'standardlayout') {
			return posterImage;
		}

		// Default behaviour is to use the override image, if supplied
		// otherwise use the poster image
		return overrideImage ?? posterImage;
	};

	useEffect(() => {
		if (renderingTarget === 'Web') {
			const defineConsentState = async () => {
				const { onConsentChange } = await import('@guardian/libs');
				onConsentChange((newConsent: ConsentState) => {
					setConsentState(newConsent);
				});
			};

			defineConsentState().catch((error) => {
				window.guardian.modules.sentry.reportError(
					error instanceof Error
						? error
						: new Error(`Error: unknown`),
					'youtube-consent',
				);
			});
		}
		if (renderingTarget === 'Apps') {
			// set the minimum unconsented state for apps
			setConsentState({
				canTarget: false,
				framework: 'tcfv2',
			});
		}
	}, [renderingTarget]);

	if (expired) {
		return (
			<YoutubeAtomExpiredOverlay
				format={format}
				hideCaption={hideCaption}
				isMainMedia={isMainMedia}
				mediaTitle={mediaTitle}
				overrideImage={overrideImage}
			/>
		);
	}

	return (
		<div data-chromatic="ignore">
			<YoutubeAtom
				atomId={id}
				videoId={assetId}
				uniqueId={uniqueId}
				image={getPosterImage()}
				alt={altText ?? mediaTitle ?? ''}
				adTargeting={
					enableAds && renderingTarget === 'Web'
						? adTargeting
						: adTargetingDisabled
				}
				consentState={consentState}
				height={height}
				width={width}
				title={mediaTitle}
				duration={duration}
				eventEmitters={
					renderingTarget === 'Web'
						? [ophanTrackerWeb(id, 'youtube')]
						: [ophanTrackerApps(id)]
				}
				format={format}
				origin={process.env.NODE_ENV === 'development' ? '' : origin}
				shouldStick={renderingTarget === 'Web' ? stickyVideos : false}
				isMainMedia={isMainMedia}
				abTestParticipations={abTestParticipations}
				kicker={kickerText}
				shouldPauseOutOfView={pauseOffscreenVideo}
				showTextOverlay={showTextOverlay}
				iconSizeOnDesktop={iconSizeOnDesktop}
				iconSizeOnMobile={iconSizeOnMobile}
				hidePillOnMobile={hidePillOnMobile}
				renderingTarget={renderingTarget}
				aspectRatio={aspectRatio}
				mobileAspectRatio={mobileAspectRatio}
				trailText={trailText}
				headlineSizes={headlineSizes}
				isVideoArticle={isVideoArticle}
				webPublicationDate={webPublicationDate}
				showClock={!!showClock}
				absoluteServerTimes={absoluteServerTimes}
				linkTo={linkTo}
				discussionId={discussionId}
				discussionApiUrl={discussionApiUrl}
				isFeatureCard={isFeatureCard}
				isImmersive={isImmersive}
				byline={byline}
				showByline={showByline}
			/>
			{!hideCaption && (
				<Caption
					captionText={mediaTitle ?? ''}
					format={format}
					displayCredit={false}
					mediaType="Video"
					isMainMedia={isMainMedia}
				/>
			)}
		</div>
	);
};
