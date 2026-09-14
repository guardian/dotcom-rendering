import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
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
	roundAspectRatio,
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

void describe('video', () => {
	void describe('extractValidSourcesFromAssets', () => {
		void it('should drop unsupported assets', () => {
			const assets = [mp4Asset480w, m3u8Asset720h, unsupportedAsset];
			const expected = [mp4Src480w, m3u8Src720h];

			assert.deepEqual(
				extractValidSourcesFromAssets(assets, 'Loop'),
				expected,
			);
		});

		void it('should reorder sources by supportedVideoFileTypes order', () => {
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
			assert.deepEqual(
				extractValidSourcesFromAssets(assets, 'Loop'),
				expected,
			);
		});

		void it('should prefer M3U8 sources for long videos with Default video style', () => {
			const assets = [mp4Asset480w, m3u8Asset720h, mp4Asset720h];
			const expected = [m3u8Src720h, mp4Src480w, mp4Src720h];

			assert.deepEqual(
				extractValidSourcesFromAssets(assets, 'Default', 37),
				expected,
			);
		});

		void it('should prefer MP4 sources for short videos with Default video style', () => {
			const assets = [mp4Asset480w, m3u8Asset720h, mp4Asset720h];
			const expected = [mp4Src480w, mp4Src720h, m3u8Src720h];

			assert.deepEqual(
				extractValidSourcesFromAssets(assets, 'Default', 12),
				expected,
			);
		});

		void it('should prefer MP4 sources with Loop video style', () => {
			const assets = [mp4Asset480w, m3u8Asset720h, mp4Asset720h];
			const expected = [mp4Src480w, mp4Src720h, m3u8Src720h];

			assert.deepEqual(
				extractValidSourcesFromAssets(assets, 'Loop'),
				expected,
			);
		});

		void it('should prefer MP4 sources with Cinemagraph video style', () => {
			const assets = [mp4Asset480w, m3u8Asset720h, mp4Asset720h];
			const expected = [mp4Src480w, mp4Src720h, m3u8Src720h];

			assert.deepEqual(
				extractValidSourcesFromAssets(assets, 'Cinemagraph'),
				expected,
			);
		});
	});

	void describe('convertFEMediaAssetsToVideoAssets', () => {
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

		void it('should convert FE media assets to video assets', () => {
			assert.deepEqual(
				convertFEMediaAssetsToVideoAssets([
					feMediaAsset480w,
					feMediaAsset720h,
				]),
				[
					{
						url: 'https://guim-example.co.uk/atomID-1_480w.mp4',
						mimeType: 'video/mp4',
						aspectRatio: undefined,
						dimensions: {
							height: 384,
							width: 480,
						},
						hasAudio: true,
					},
					{
						url: 'https://guim-example.co.uk/atomID-1_720h.mp4',
						mimeType: 'video/mp4',
						aspectRatio: undefined,
						dimensions: {
							height: 720,
							width: 900,
						},
						hasAudio: true,
					},
				],
			);
		});

		void it('should return an empty array when given an empty array', () => {
			assert.deepEqual(convertFEMediaAssetsToVideoAssets([]), []);
		});
	});

	void describe('getAspectRatioFromSources', () => {
		void it('should return the aspect ratio from the first source if it is defined', () => {
			const testSource: Source = {
				...mp4Src480w,
				height: 720,
				width: 480,
				aspectRatio: '5:3',
				hasAudio: true,
			};

			const fiveThreeAspectRatio = 1.667;

			assert.deepEqual(
				getAspectRatioFromSources([testSource]),
				fiveThreeAspectRatio,
			);
		});

		void it('should calculate the aspect ratio from the width and height if aspect ratio is missing', () => {
			const testSource: Source = {
				...mp4Src480w,
				height: 720,
				width: 480,
				aspectRatio: undefined,
				hasAudio: true,
			};

			const twoThreeAspectRatio = 0.667;

			assert.deepEqual(
				getAspectRatioFromSources([testSource]),
				twoThreeAspectRatio,
			);
		});

		void it('should return the default aspect ratio if the aspect ratio is undefined and width is 0', () => {
			const testSource: Source = {
				...mp4Src480w,
				height: 720,
				width: 0,
				aspectRatio: undefined,
				hasAudio: true,
			};
			assert.deepEqual(getAspectRatioFromSources([testSource]), 5 / 4);
		});

		void it('should return the default aspect ratio if the aspect ratio is undefined and height is 0', () => {
			const testSource: Source = {
				...mp4Src480w,
				height: 0,
				width: 480,
				aspectRatio: undefined,
				hasAudio: true,
			};
			assert.deepEqual(getAspectRatioFromSources([testSource]), 5 / 4);
		});
	});

	void describe('findOptimisedSourcePerMimeType', () => {
		const testSources: Source[] = [
			mp4Src480w,
			mp4Src720h,
			m3u8Src480w,
			m3u8Src720h,
		];

		void it('selects the smaller videos when there are multiple and all are larger than the screen width.', () => {
			const screenWidth = 400;

			const sources = findOptimisedSourcePerMimeType(
				testSources,
				screenWidth,
			);

			assert.deepEqual(sources, [mp4Src480w, m3u8Src480w]);
		});

		void it('selects the larger videos when there are two and one is larger than the screen width and one is smaller.', () => {
			const screenWidth = 600;

			const sources = findOptimisedSourcePerMimeType(
				testSources,
				screenWidth,
			);

			assert.deepEqual(sources, [mp4Src720h, m3u8Src720h]);
		});

		void it('selects the larger videos when there are multiple and all are smaller than the screen width.', () => {
			const screenWidth = 800;

			const sources = findOptimisedSourcePerMimeType(
				testSources,
				screenWidth,
			);

			assert.deepEqual(sources, [mp4Src720h, m3u8Src720h]);
		});

		void it('selects the smaller videos when some are equal to the screen width and others are larger.', () => {
			const screenWidth = 480;

			const sources = findOptimisedSourcePerMimeType(
				testSources,
				screenWidth,
			);

			assert.deepEqual(sources, [mp4Src480w, m3u8Src480w]);
		});

		void it('selects the larger videos when some are equal to the screen width and others are smaller.', () => {
			const screenWidth = 720;

			const sources = findOptimisedSourcePerMimeType(
				testSources,
				screenWidth,
			);

			assert.deepEqual(sources, [mp4Src720h, m3u8Src720h]);
		});
	});

	void describe('convertCurrentTimeToProgressPercentage', () => {
		for (const testCase of [
			{ currentTime: 0, duration: 23, expectedPercentage: 0 },
			{ currentTime: 24, duration: 32, expectedPercentage: 75 },
			{ currentTime: 56, duration: 56, expectedPercentage: 100 },
			{ currentTime: 12, duration: 11, expectedPercentage: 100 },
			{ currentTime: -5, duration: 10, expectedPercentage: null },
			{ currentTime: 5, duration: -10, expectedPercentage: null },
		]) {
			void it('should return the correct progress percentage based on the current time and duration', () => {
				const { currentTime, duration, expectedPercentage } = testCase;
				assert.deepEqual(
					convertCurrentTimeToProgressPercentage(
						currentTime,
						duration,
					),
					expectedPercentage,
				);
			});
		}
	});

	void describe('convertProgressPercentageToCurrentTime', () => {
		for (const testCase of [
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
		]) {
			void it('should return the correct current time based on the progress percentage and duration', () => {
				const { progressPercentage, duration, expectedCurrentTime } =
					testCase;
				assert.deepEqual(
					convertProgressPercentageToCurrentTime(
						progressPercentage,
						duration,
					),
					expectedCurrentTime,
				);
			});
		}
	});

	void describe('formatTimeForDisplay', () => {
		for (const testCase of [
			{ timeInSeconds: -1.24, expectedFormattedTime: '0:00' },
			{ timeInSeconds: 0, expectedFormattedTime: '0:00' },
			{ timeInSeconds: 59, expectedFormattedTime: '0:59' },
			{ timeInSeconds: 60, expectedFormattedTime: '1:00' },
			{ timeInSeconds: 61, expectedFormattedTime: '1:01' },
			{ timeInSeconds: 92.5, expectedFormattedTime: '1:32' },
			{ timeInSeconds: 1000, expectedFormattedTime: '16:40' },
			{ timeInSeconds: 10000, expectedFormattedTime: '166:40' },
		]) {
			void it('should return the correct formatted time based on the time in seconds', () => {
				const { timeInSeconds, expectedFormattedTime } = testCase;
				assert.deepEqual(
					formatTimeForDisplay(timeInSeconds),
					expectedFormattedTime,
				);
			});
		}
	});
	void describe('roundAspectRatio', () => {
		for (const testCase of [
			{ aspectRatio: 0.56938445, expectedRoundedAspectRatio: 0.569 },
			{ aspectRatio: 1.277777, expectedRoundedAspectRatio: 1.278 },
			{ aspectRatio: 1.25, expectedRoundedAspectRatio: 1.25 },
			{ aspectRatio: 0.8, expectedRoundedAspectRatio: 0.8 },
		]) {
			void it('should return the correct aspect ratio rounded to 3 decimal places', () => {
				const { aspectRatio, expectedRoundedAspectRatio } = testCase;
				assert.deepEqual(
					roundAspectRatio(aspectRatio),
					expectedRoundedAspectRatio,
				);
			});
		}
	});
});
