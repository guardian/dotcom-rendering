import { css } from '@emotion/react';
import type { ConsentState } from '@guardian/libs';
import { body, palette, space } from '@guardian/source/foundations';
import { SvgAlertRound } from '@guardian/source/react-components';
import { useEffect, useState } from 'react';
import type { Switches } from '../../src/types/config';
import { trackVideoInteraction } from '../client/ga/ga';
import { getOphan } from '../client/ophan/ophan';
import { useAB } from '../lib/useAB';
import { useAdTargeting } from '../lib/useAdTargeting';
import { Caption } from './Caption';
import type {
	ImagePositionType,
	ImageSizeType,
} from './Card/components/ImageWrapper';
import { useConfig } from './ConfigContext';
import { YoutubeAtom } from './YoutubeAtom/YoutubeAtom';

type Props = {
	id: string;
	mediaTitle?: string;
	altText?: string;
	assetId: string;
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
	showTextOverlay?: boolean;
	switches?: Switches;
	// If the youtube block component is used on a card, we can pass in the image size and position on mobile to get the correct styling for the play icon. If it's not used on a card, we can just pass default values to get the standard large play icon.
	imageSize?: ImageSizeType;
	imagePositionOnMobile?: ImagePositionType;
};

const expiredOverlayStyles = (overrideImage?: string) =>
	overrideImage
		? css`
				height: 0px;
				position: relative;
				background-image: url(${overrideImage});
				background-size: cover;
				background-position: 49% 49%;
				background-repeat: no-repeat;
				padding-bottom: 56%;
				color: ${palette.neutral[100]};
				background-color: ${palette.neutral[20]};
		  `
		: undefined;

const expiredTextWrapperStyles = css`
	display: flex;
	flex-direction: row;
	align-items: center;

	padding-top: ${space[4]}px;
	padding-bottom: ${space[4]}px;
	padding-left: ${space[1]}px;
	padding-right: ${space[12]}px;
	color: ${palette.neutral[100]};
	background-color: ${palette.neutral[20]};
`;

const expiredSVGWrapperStyles = css`
	padding-right: ${space[1]}px;
	svg {
		width: ${space[12]}px;
		height: ${space[12]}px;
		fill: ${palette.neutral[100]};
	}
`;

/**
 * We do our own image optimization in DCR and only need 1 image. Pick the largest image available to
 * us to avoid up-scaling later.
 *
 * @param images an array of the same image at different resolutions
 * @returns largest image from images
 */
const getLargestImageSize = (
	images: {
		url: string;
		width: number;
	}[],
) => [...images].sort((a, b) => a.width - b.width).pop();

/** always undefined on the server */
let counter: number | undefined;

export const YoutubeBlockComponent = ({
	id,
	assetId,
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
	switches,
	imageSize = 'large',
	imagePositionOnMobile = 'none',
}: Props) => {
	const [consentState, setConsentState] = useState<ConsentState | undefined>(
		undefined,
	);

	const adTargeting = useAdTargeting(duration);
	const { renderingTarget } = useConfig();

	const abTests = useAB();
	const abTestsApi = abTests?.api;
	const abTestParticipations = abTests?.participations ?? {};

	const imaAbTest =
		abTestsApi?.isUserInVariant('IntegrateIma', 'variant') ?? false;
	const imaSwitch = switches?.youtubeIma ?? false;
	const imaEnabled = imaAbTest || imaSwitch;

	const [index, setIndex] = useState<number>();

	useEffect(() => {
		counter ??= 0;
		setIndex(++counter);
	}, []);

	useEffect(() => {
		const defineConsentState = async () => {
			const { onConsentChange } = await import('@guardian/libs');
			onConsentChange((newConsent: ConsentState) => {
				setConsentState(newConsent);
			});
		};

		defineConsentState().catch((error) => {
			window.guardian.modules.sentry.reportError(
				error instanceof Error ? error : new Error(`Error: unknown`),
				'youtube-consent',
			);
		});
	}, []);

	if (expired) {
		return (
			<figure
				css={css`
					margin-top: 16px;
					margin-bottom: 16px;
				`}
			>
				<div css={expiredOverlayStyles(overrideImage)}>
					<div css={expiredTextWrapperStyles}>
						<div css={expiredSVGWrapperStyles}>
							<SvgAlertRound />
						</div>
						<p
							css={css`
								${body.medium({
									lineHeight: 'tight',
								})}
							`}
						>
							This video has been removed. This could be because
							it launched early, our rights have expired, there
							was a legal issue, or for another reason.
						</p>
					</div>
				</div>
				{!hideCaption && (
					<Caption
						captionText={mediaTitle ?? ''}
						format={format}
						displayCredit={false}
						mediaType="Video"
						isMainMedia={isMainMedia}
					/>
				)}
			</figure>
		);
	}

	const ophanTracking = async (trackingEvent: string): Promise<void> => {
		if (!id) return;
		const ophan = await getOphan(renderingTarget);
		ophan.record({
			video: {
				id: `gu-video-youtube-${id}`,
				eventType: `video:content:${trackingEvent}`,
			},
		});
	};

	const gaTracking = (trackingEvent: string) => {
		if (!id) return;
		trackVideoInteraction({
			trackingEvent,
			elementId: id,
		});
	};

	return (
		<div data-chromatic="ignore" data-component="youtube-atom">
			<YoutubeAtom
				index={index}
				videoId={assetId}
				overrideImage={overrideImage}
				posterImage={getLargestImageSize(posterImage)?.url}
				alt={altText ?? mediaTitle ?? ''}
				adTargeting={adTargeting}
				consentState={consentState}
				height={height}
				width={width}
				title={mediaTitle}
				duration={duration}
				eventEmitters={
					renderingTarget === 'Web'
						? [ophanTracking, gaTracking]
						: [gaTracking]
				}
				format={format}
				origin={process.env.NODE_ENV === 'development' ? '' : origin}
				shouldStick={stickyVideos}
				isMainMedia={isMainMedia}
				imaEnabled={imaEnabled}
				abTestParticipations={abTestParticipations}
				kicker={kickerText}
				shouldPauseOutOfView={pauseOffscreenVideo}
				showTextOverlay={showTextOverlay}
				imageSize={imageSize}
				imagePositionOnMobile={imagePositionOnMobile}
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
