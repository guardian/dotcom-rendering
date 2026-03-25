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
export const convertAssetsToVideoSources = (assets: VideoAssets[]): Source[] =>
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
				const sourcesOrderedByWidthDescending = sourcesByType.sort(
					(a, b) =>
						Number(b.dimensions?.width) -
						Number(a.dimensions?.width),
				);
				acc.push(...sourcesOrderedByWidthDescending);
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

export const convertFEMediaAssetsToVideoSources = (
	assets: FEMediaAsset[],
): Source[] => {
	const videoAssets: VideoAssets[] = assets.map(
		({ id, mimeType, dimensions }) => ({
			url: id,
			mimeType,
			dimensions,
		}),
	);

	return convertAssetsToVideoSources(videoAssets);
};

export const getSubtitleAsset = (assets: VideoAssets[]): string | undefined =>
	assets.find((asset) => asset.mimeType === 'text/vtt')?.url;

/**
 * Returns the smallest source that is larger than the screen width.
 * If all sources are smaller than the screen width, take the largest.
 */
const findOptimalSource = (
	sources: Source[],
	screenWidth: number,
): Source | undefined => {
	if (sources.length === 0) return undefined;

	const orderedSources = sources.sort((a, b) => {
		if (a.width < screenWidth && b.width < screenWidth) {
			return a.width < b.width ? 1 : -1;
		}
		if (a.width > screenWidth && b.width > screenWidth) {
			return a.width > b.width ? 1 : -1;
		}
		return a.width < screenWidth ? 1 : -1;
	});

	return orderedSources[0];
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
