import type { FEMediaAsset } from '../frontend/feFront';
import type { VideoAssets } from '../types/content';

export type CustomPlayEventDetail = { uniqueId: string };

/** We expect all videos to include dimensions since the field was added to FEMediaAsset */
export const DEFAULT_ASPECT_RATIO = 5 / 4;

export const customSelfHostedVideoPlayAudioEventName =
	'self-hosted-video:play-with-audio';
export const customYoutubePlayEventName = 'youtube-video:play';

export type Source = {
	src: string;
	mimeType: SupportedVideoFileType;
	height: number;
	width: number;
	aspectRatio?: string;
};

/**
 * Order is important here - the browser will use the first type it supports.
 */
export const supportedVideoFileTypes = [
	'video/mp4', // MP4 format
	'application/x-mpegURL', // HLS format
	'application/vnd.apple.mpegurl', // Alternative HLS format
] as const;

export type SupportedVideoFileType = (typeof supportedVideoFileTypes)[number];

/**
 * The looping video player types its `sources` attribute as `Sources`.
 * However, looping videos in articles are delivered as media atoms, which type
 * their `assets` as `VideoAssets`. Which means that we need to alter the shape
 * of the incoming `assets` to match the requirements of the outgoing `sources`.
 */
export const extractValidSourcesFromAssets = (
	assets: VideoAssets[],
): Source[] =>
	/**
	 * Ensure sources are ordered by the order that MIME types are specified in
	 * `supportedVideoFileTypes` as the browser picks the first one that it supports.
	 */
	supportedVideoFileTypes
		.reduce<typeof assets>((acc, type) => {
			const sourcesByType = assets.filter(
				({ mimeType }) => mimeType === type,
			);
			if (sourcesByType.length) {
				acc.push(...sourcesByType);
			}
			return acc;
		}, [])
		.map((asset) => ({
			src: asset.url,
			mimeType: asset.mimeType as Source['mimeType'],
			height: asset.dimensions?.height ?? 0,
			width: asset.dimensions?.width ?? 0,
			aspectRatio: asset.aspectRatio,
		}));

export const convertFEMediaAssetsToVideoAssets = (
	assets: FEMediaAsset[],
): VideoAssets[] =>
	assets.map(({ id, mimeType, dimensions }) => ({
		url: id,
		mimeType,
		dimensions,
	}));

/**
 * Aspect ratio is needed for self-hosted video so that the browser knows how much
 * space the video will take up: width and height are unknown when the page first
 * renders, as there can be multiple sources available with different dimensions.
 *
 * We use the first source to calculate aspect ratio, but we could use any of the sources.
 * We make an assumption that all sources will have the same aspect ratio.
 */
export const getAspectRatioFromSources = (sources: Source[]): number => {
	const firstSource = sources[0];
	if (!firstSource || firstSource.width === 0 || firstSource.height === 0) {
		return DEFAULT_ASPECT_RATIO;
	}

	return firstSource.width / firstSource.height;
};

export const getSubtitleAsset = (assets: VideoAssets[]): string | undefined =>
	assets.find((asset) => asset.mimeType === 'text/vtt')?.url;

/**
 * Returns the smallest source that is larger than or equal to the screen width, unless
 * all sources are smaller than the screen width, in which case it returns the largest source.
 */
const findOptimalSource = (
	sources: Source[],
	screenWidth: number,
): Source | undefined => {
	if (sources.length === 0) return undefined;

	return sources.reduce((a, b) => {
		if (a.width < screenWidth || b.width < screenWidth) {
			return a.width > b.width ? a : b; // take the larger source
		}

		return a.width < b.width ? a : b; // take the smaller source
	});
};

export const findOptimisedSourcePerMimeType = (
	sources: Source[],
	screenWidth: number,
): Source[] => {
	return supportedVideoFileTypes.reduce<Source[]>((acc, type) => {
		const sourcesForMimeType = sources.filter(
			({ mimeType }) => mimeType === type,
		);
		if (sourcesForMimeType.length === 0) return acc;

		// Pick the source with the most appropriate width based on the users screen size
		const optimisedSource = findOptimalSource(
			sourcesForMimeType,
			screenWidth,
		);

		if (optimisedSource) acc.push(optimisedSource);
		return acc;
	}, []);
};
