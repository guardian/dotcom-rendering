import type { ConsentState } from '@guardian/libs';
import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';
import type { ArticleFormat } from '../lib/articleFormat';
import { getLargestImageSize } from '../lib/image';
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
	posterImage?: {
		url: string;
		width: number;
	}[];
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
	Age?: ReactElement;
	CommentCount?: ReactElement;
	isFeatureCard?: boolean;
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
	posterImage = [],
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
	Age,
	CommentCount,
	isFeatureCard,
}: Props) => {
	const [consentState, setConsentState] = useState<ConsentState | undefined>(
		undefined,
	);

	const adTargeting = useAdTargeting(duration);
	const { renderingTarget } = useConfig();

	const abTests = useAB();
	const abTestParticipations = abTests?.participations ?? {};

	/**
	 * It's possible to have duplicate video atoms on the same page
	 * For example liveblogs can have the same video for the main media and in a subsequent block
	 * We need to ensure a unique id for each YouTube player on the page.
	 */
	const uniqueId = `${assetId}-${index}`;

	/**
	 * We do our own image optimization in DCR and only need 1 image.
	 * Pick the largest image available to us to avoid up-scaling later.
	 */
	const largestPosterImage = getLargestImageSize(posterImage)?.url;

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
				image={overrideImage ?? largestPosterImage}
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
						? [ophanTrackerWeb(id)]
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
				trailText={trailText}
				headlineSizes={headlineSizes}
				isVideoArticle={isVideoArticle}
				Age={Age}
				CommentCount={CommentCount}
				isFeatureCard={isFeatureCard}
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
