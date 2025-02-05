import type { ConsentState } from '@guardian/libs';
import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';
import type { ArticleFormat } from '../lib/articleFormat';
import { useAB } from '../lib/useAB';
import { useAdTargeting } from '../lib/useAdTargeting';
import type { AdTargeting } from '../types/commercial';
import type { AspectRatio } from '../types/front';
import { Caption } from './Caption';
import type { ImagePositionType } from './Card/components/ImageWrapper';
import { useConfig } from './ConfigContext';
import { ophanTrackerApps, ophanTrackerWeb } from './YoutubeAtom/eventEmitters';
import { YoutubeAtom } from './YoutubeAtom/YoutubeAtom';
import { YoutubeAtomExpiredOverlay } from './YoutubeAtom/YoutubeAtomExpiredOverlay';

type Props = {
	id: string;
	assetId: string;
	index: number | string;
	expired: boolean;
	format: ArticleFormat;
	stickyVideos: boolean;
	enableAds: boolean;
	mediaTitle?: string;
	altText?: string;
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
	kickerText?: string;
	pauseOffscreenVideo?: boolean;
	showTextOverlay?: boolean;
	playIcon: ReactElement;
	/**
	 * If the youtube block component is used on a card, we can pass in the image size and
	 * position on mobile to get the correct styling for the play icon. If it's not used on
	 * a card, we can just pass default values to get the standard large play icon.
	 */
	imagePositionOnMobile?: ImagePositionType;
	aspectRatio?: AspectRatio;
};

/**
 * We do our own image optimization in DCR and only need 1 image. Pick the largest image available to
 * us to avoid up-scaling later.
 *
 * @param images an array of the same image at different resolutions
 * @returns largest image from images
 */
export const getLargestImageSize = (
	images: {
		url: string;
		width: number;
	}[],
) => [...images].sort((a, b) => a.width - b.width).pop();

const adTargetingDisabled: AdTargeting = { disableAds: true };

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
	imagePositionOnMobile = 'none',
	enableAds,
	aspectRatio,
	playIcon,
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
				overrideImage={overrideImage}
				posterImage={getLargestImageSize(posterImage)?.url}
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
				origin={origin}
				shouldStick={renderingTarget === 'Web' ? stickyVideos : false}
				isMainMedia={isMainMedia}
				abTestParticipations={abTestParticipations}
				kicker={kickerText}
				shouldPauseOutOfView={pauseOffscreenVideo}
				showTextOverlay={showTextOverlay}
				playIcon={playIcon}
				imagePositionOnMobile={imagePositionOnMobile}
				renderingTarget={renderingTarget}
				aspectRatio={aspectRatio}
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
