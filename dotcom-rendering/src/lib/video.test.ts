import type { FEMediaAsset } from '../frontend/feFront';
import type { VideoAssets } from '../types/content';
import type { Source } from './video';
import {
	convertCurrentTimeToProgressPercentage,
	convertFEMediaAssetsToVideoAssets,
	convertProgressPercentageToCurrentTime,
	extractValidSourcesFromAssets,
	findOptimisedSourcePerMimeType,
	formatTimeForDisplay,
	getAspectRatioFromSources,
} from './video';

const mp4Asset480w: VideoAssets = {
	url: 'https://guim-example.co.uk/atomID-1_480w.mp4',
	mimeType: 'video/mp4',
	dimensions: {
		height: 384,
		width: 480,
	},
	aspectRatio: '5:4',
	hasAudio: true,
};

const mp4Asset720h: VideoAssets = {
	url: 'https://guim-example.co.uk/atomID-1_720h.mp4',
	mimeType: 'video/mp4',
	dimensions: {
		height: 720,
		width: 900,
	},
	aspectRatio: '5:4',
	hasAudio: true,
};

const m3u8Asset720h: VideoAssets = {
	url: 'https://guim-example.co.uk/atomID-1.m3u8',
	mimeType: 'application/x-mpegURL',
	dimensions: {
		height: 720,
		width: 900,
	},
	aspectRatio: '5:4',
	hasAudio: true,
};
const unsupportedAsset: VideoAssets = {
	url: 'https://guim-example.co.uk/atomID-1.mov',
	mimeType: 'video/quicktime',
	dimensions: {
		height: 720,
		width: 900,
	},
	aspectRatio: '5:4',
	hasAudio: true,
};

const mp4Src480w: Source = {
	src: 'https://guim-example.co.uk/atomID-1_480w.mp4',
	mimeType: 'video/mp4',
	height: 384,
	width: 480,
	aspectRatio: '5:4',
	hasAudio: true,
};
const mp4Src720h: Source = {
	src: 'https://guim-example.co.uk/atomID-1_720h.mp4',
	mimeType: 'video/mp4',
	height: 720,
	width: 900,
	aspectRatio: '5:4',
	hasAudio: true,
};
const m3u8Src480w: Source = {
	src: 'https://guim-example.co.uk/atomID-1.m3u8',
	mimeType: 'application/x-mpegURL',
	height: 384,
	width: 480,
	aspectRatio: '5:4',
	hasAudio: true,
};
const m3u8Src720h: Source = {
	src: 'https://guim-example.co.uk/atomID-1.m3u8',
	mimeType: 'application/x-mpegURL',
	height: 720,
	width: 900,
	aspectRatio: '5:4',
	hasAudio: true,
};

describe('video', () => {
	describe('extractValidSourcesFromAssets', () => {
		it('should drop unsupported assets', () => {
			const assets = [mp4Asset480w, m3u8Asset720h, unsupportedAsset];
			const expected = [mp4Src480w, m3u8Src720h];
			expect(extractValidSourcesFromAssets(assets)).toEqual(expected);
		});

		it('should reorder sources by supportedVideoFileTypes order', () => {
			const assets = [
				m3u8Asset720h,
				mp4Asset480w,
				m3u8Asset720h,
				mp4Asset720h,
				m3u8Asset720h,
			];
			const expected = [
				mp4Src480w,
				mp4Src720h,
				m3u8Src720h,
				m3u8Src720h,
				m3u8Src720h,
			];
			expect(extractValidSourcesFromAssets(assets)).toEqual(expected);
		});
	});

	describe('convertFEMediaAssetsToVideoAssets', () => {
		const feMediaAsset480w: FEMediaAsset = {
			id: 'https://guim-example.co.uk/atomID-1_480w.mp4',
			version: 1,
			platform: 'Url',
			assetType: 'video',
			mimeType: 'video/mp4',
			dimensions: {
				height: 384,
				width: 480,
			},
			hasAudio: true,
		};
		const feMediaAsset720h: FEMediaAsset = {
			id: 'https://guim-example.co.uk/atomID-1_720h.mp4',
			version: 1,
			platform: 'Url',
			assetType: 'video',
			mimeType: 'video/mp4',
			dimensions: {
				height: 720,
				width: 900,
			},
			hasAudio: true,
		};

		it('should convert FE media assets to video assets', () => {
			expect(
				convertFEMediaAssetsToVideoAssets([
					feMediaAsset480w,
					feMediaAsset720h,
				]),
			).toEqual([
				{
					url: 'https://guim-example.co.uk/atomID-1_480w.mp4',
					mimeType: 'video/mp4',
					dimensions: {
						height: 384,
						width: 480,
					},
					hasAudio: true,
				},
				{
					url: 'https://guim-example.co.uk/atomID-1_720h.mp4',
					mimeType: 'video/mp4',
					dimensions: {
						height: 720,
						width: 900,
					},
					hasAudio: true,
				},
			]);
		});

		it('should return an empty array when given an empty array', () => {
			expect(convertFEMediaAssetsToVideoAssets([])).toEqual([]);
		});
	});

	describe('getAspectRatioFromSources', () => {
		it('should return the aspect ratio from the first source if it is defined', () => {
			const testSource: Source = {
				...mp4Src480w,
				height: 720,
				width: 480,
				aspectRatio: '5:3',
				hasAudio: true,
			};
			expect(getAspectRatioFromSources([testSource])).toEqual({
				numberRepresentation: 5 / 3,
				stringRepresentation: '5:3',
			});
		});

		it('should calculate the aspect ratio from the width and height if aspect ratio is missing', () => {
			const testSource: Source = {
				...mp4Src480w,
				height: 720,
				width: 480,
				aspectRatio: undefined,
				hasAudio: true,
			};
			expect(getAspectRatioFromSources([testSource])).toEqual({
				numberRepresentation: 2 / 3,
				stringRepresentation: '480:720',
			});
		});

		it('should return the default aspect ratio if the aspect ratio is undefined and width is 0', () => {
			const testSource: Source = {
				...mp4Src480w,
				height: 720,
				width: 0,
				aspectRatio: undefined,
				hasAudio: true,
			};
			expect(getAspectRatioFromSources([testSource])).toEqual({
				numberRepresentation: 5 / 4,
				stringRepresentation: '5:4',
			});
		});

		it('should return the default aspect ratio if the aspect ratio is undefined and height is 0', () => {
			const testSource: Source = {
				...mp4Src480w,
				height: 0,
				width: 480,
				aspectRatio: undefined,
				hasAudio: true,
			};
			expect(getAspectRatioFromSources([testSource])).toEqual({
				numberRepresentation: 5 / 4,
				stringRepresentation: '5:4',
			});
		});
	});

	describe('findOptimisedSourcePerMimeType', () => {
		const testSources: Source[] = [
			mp4Src480w,
			mp4Src720h,
			m3u8Src480w,
			m3u8Src720h,
		];

		it('selects the smaller videos when there are multiple and all are larger than the screen width.', () => {
			const screenWidth = 400;

			const sources = findOptimisedSourcePerMimeType(
				testSources,
				screenWidth,
			);

			expect(sources).toEqual([mp4Src480w, m3u8Src480w]);
		});

		it('selects the larger videos when there are two and one is larger than the screen width and one is smaller.', () => {
			const screenWidth = 600;

			const sources = findOptimisedSourcePerMimeType(
				testSources,
				screenWidth,
			);

			expect(sources).toEqual([mp4Src720h, m3u8Src720h]);
		});

		it('selects the larger videos when there are multiple and all are smaller than the screen width.', () => {
			const screenWidth = 800;

			const sources = findOptimisedSourcePerMimeType(
				testSources,
				screenWidth,
			);

			expect(sources).toEqual([mp4Src720h, m3u8Src720h]);
		});

		it('selects the smaller videos when some are equal to the screen width and others are larger.', () => {
			const screenWidth = 480;

			const sources = findOptimisedSourcePerMimeType(
				testSources,
				screenWidth,
			);

			expect(sources).toEqual([mp4Src480w, m3u8Src480w]);
		});

		it('selects the larger videos when some are equal to the screen width and others are smaller.', () => {
			const screenWidth = 720;

			const sources = findOptimisedSourcePerMimeType(
				testSources,
				screenWidth,
			);

			expect(sources).toEqual([mp4Src720h, m3u8Src720h]);
		});
	});

	describe('convertCurrentTimeToProgressPercentage', () => {
		it.each([
			{ currentTime: 0, duration: 23, expectedPercentage: 0 },
			{ currentTime: 24, duration: 32, expectedPercentage: 75 },
			{ currentTime: 56, duration: 56, expectedPercentage: 100 },
			{ currentTime: 12, duration: 11, expectedPercentage: 100 },
			{ currentTime: -5, duration: 10, expectedPercentage: null },
			{ currentTime: 5, duration: -10, expectedPercentage: null },
		])(
			'should return the correct progress percentage based on the current time and duration',
			({ currentTime, duration, expectedPercentage }) => {
				expect(
					convertCurrentTimeToProgressPercentage(
						currentTime,
						duration,
					),
				).toEqual(expectedPercentage);
			},
		);
	});

	describe('convertProgressPercentageToCurrentTime', () => {
		it.each([
			{ progressPercentage: 0, duration: 23, expectedCurrentTime: 0 },
			{ progressPercentage: 75, duration: 32, expectedCurrentTime: 24 },
			{ progressPercentage: 100, duration: 56, expectedCurrentTime: 56 },
			{ progressPercentage: 103, duration: 11, expectedCurrentTime: 11 },
			{ progressPercentage: 10, duration: 0, expectedCurrentTime: null },
			{ progressPercentage: 8, duration: -10, expectedCurrentTime: null },
			{
				progressPercentage: -0.1244235,
				duration: 10,
				expectedCurrentTime: 0,
			},
		])(
			'should return the correct current time based on the progress percentage and duration',
			({ progressPercentage, duration, expectedCurrentTime }) => {
				expect(
					convertProgressPercentageToCurrentTime(
						progressPercentage,
						duration,
					),
				).toEqual(expectedCurrentTime);
			},
		);
	});

	describe('formatTimeForDisplay', () => {
		it.each([
			{ timeInSeconds: -1.24, expectedFormattedTime: '0:00' },
			{ timeInSeconds: 0, expectedFormattedTime: '0:00' },
			{ timeInSeconds: 59, expectedFormattedTime: '0:59' },
			{ timeInSeconds: 60, expectedFormattedTime: '1:00' },
			{ timeInSeconds: 61, expectedFormattedTime: '1:01' },
			{ timeInSeconds: 92.5, expectedFormattedTime: '1:32' },
			{ timeInSeconds: 1000, expectedFormattedTime: '16:40' },
			{ timeInSeconds: 10000, expectedFormattedTime: '166:40' },
		])(
			'should return the correct formatted time based on the time in seconds',
			({ timeInSeconds, expectedFormattedTime }) => {
				expect(formatTimeForDisplay(timeInSeconds)).toEqual(
					expectedFormattedTime,
				);
			},
		);
	});
});
