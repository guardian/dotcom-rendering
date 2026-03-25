import type { FEMediaAsset } from '../frontend/feFront';
import type { VideoAssets } from '../types/content';
import {
	convertFEMediaAssetsToVideoAssets,
	extractValidSourcesFromAssets,
	findOptimisedSourcePerMimeType,
} from './video';
import type { Source } from './video';

const mp4Asset480w: VideoAssets = {
	url: 'https://guim-example.co.uk/atomID-1_480w.mp4',
	mimeType: 'video/mp4',
	dimensions: {
		height: 384,
		width: 480,
	},
	aspectRatio: '5:4',
};

const mp4Asset720h: VideoAssets = {
	url: 'https://guim-example.co.uk/atomID-1_720h.mp4',
	mimeType: 'video/mp4',
	dimensions: {
		height: 720,
		width: 900,
	},
	aspectRatio: '5:4',
};

const m3u8Asset720h: VideoAssets = {
	url: 'https://guim-example.co.uk/atomID-1.m3u8',
	mimeType: 'application/x-mpegURL',
	dimensions: {
		height: 720,
		width: 900,
	},
	aspectRatio: '5:4',
};
const unsupportedAsset: VideoAssets = {
	url: 'https://guim-example.co.uk/atomID-1.mov',
	mimeType: 'video/quicktime',
	dimensions: {
		height: 720,
		width: 900,
	},
	aspectRatio: '5:4',
};

const mp4Src480w: Source = {
	src: 'https://guim-example.co.uk/atomID-1_480w.mp4',
	mimeType: 'video/mp4',
	height: 384,
	width: 480,
	aspectRatio: '5:4',
};
const mp4Src720h: Source = {
	src: 'https://guim-example.co.uk/atomID-1_720h.mp4',
	mimeType: 'video/mp4',
	height: 720,
	width: 900,
	aspectRatio: '5:4',
};
const m3u8Src480w: Source = {
	src: 'https://guim-example.co.uk/atomID-1.m3u8',
	mimeType: 'application/x-mpegURL',
	height: 384,
	width: 480,
	aspectRatio: '5:4',
};
const m3u8Src720h: Source = {
	src: 'https://guim-example.co.uk/atomID-1.m3u8',
	mimeType: 'application/x-mpegURL',
	height: 720,
	width: 900,
	aspectRatio: '5:4',
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
				},
				{
					url: 'https://guim-example.co.uk/atomID-1_720h.mp4',
					mimeType: 'video/mp4',
					dimensions: {
						height: 720,
						width: 900,
					},
				},
			]);
		});

		it('should return an empty array when given an empty array', () => {
			expect(convertFEMediaAssetsToVideoAssets([])).toEqual([]);
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
			// Arrange
			const screenWidth = 400;

			// Act
			const sources = findOptimisedSourcePerMimeType(
				testSources,
				screenWidth,
			);

			// Assert
			expect(sources).toEqual([mp4Src480w, m3u8Src480w]);
		});

		it('selects the larger videos when there are two and one is larger than the screen width and one is smaller.', () => {
			// Arrange
			const screenWidth = 600;

			// Act
			const sources = findOptimisedSourcePerMimeType(
				testSources,
				screenWidth,
			);

			// Assert
			expect(sources).toEqual([mp4Src720h, m3u8Src720h]);
		});

		it('selects the larger videos when there are multiple and all are smaller than the screen width.', () => {
			// Arrange
			const screenWidth = 800;

			// Act
			const sources = findOptimisedSourcePerMimeType(
				testSources,
				screenWidth,
			);

			// Assert
			expect(sources).toEqual([mp4Src720h, m3u8Src720h]);
		});

		it('selects the smaller videos when some are equal to the screen width and others are larger.', () => {
			// Arrange
			const screenWidth = 480;

			// Act
			const sources = findOptimisedSourcePerMimeType(
				testSources,
				screenWidth,
			);

			// Assert
			expect(sources).toEqual([mp4Src480w, m3u8Src480w]);
		});

		it('selects the larger videos when some are equal to the screen width and others are smaller.', () => {
			// Arrange
			const screenWidth = 720;

			// Act
			const sources = findOptimisedSourcePerMimeType(
				testSources,
				screenWidth,
			);

			// Assert
			expect(sources).toEqual([mp4Src720h, m3u8Src720h]);
		});
	});
});
