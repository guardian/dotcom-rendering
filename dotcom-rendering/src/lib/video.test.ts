import type { VideoAssets } from '../types/content';
import {
	convertAssetsToVideoSources,
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
		width: 898,
	},
	aspectRatio: '5:4',
};

const m3u8Asset: VideoAssets = {
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
	width: 898,
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
	describe('convertAssetsToVideoSources', () => {
		it('should drop unsupported assets', () => {
			const assets = [mp4Asset480w, m3u8Asset, unsupportedAsset];
			const expected = [mp4Src480w, m3u8Src720h];
			expect(convertAssetsToVideoSources(assets)).toEqual(expected);
		});

		it('should reorder sources by supportedVideoFileTypes order and then by width', () => {
			const assets = [
				m3u8Asset,
				m3u8Asset,
				mp4Asset480w,
				m3u8Asset,
				mp4Asset720h,
			];
			const expected = [
				mp4Src720h,
				mp4Src480w,
				m3u8Src720h,
				m3u8Src720h,
				m3u8Src720h,
			];
			expect(convertAssetsToVideoSources(assets)).toEqual(expected);
		});
	});

	describe('findOptimisedSourcePerMimeType', () => {
		it('selects the smaller video when there are multiple and all are larger than the screen width.', () => {
			// Arrange
			const screenWidth = 400;
			const testSources: Source[] = [
				mp4Src480w,
				mp4Src720h,
				m3u8Src480w,
				m3u8Src720h,
			];

			// Act
			const sources = findOptimisedSourcePerMimeType(
				testSources,
				screenWidth,
			);

			// Assert
			expect(sources).toEqual([mp4Src480w, m3u8Src480w]);
		});

		it('selects the larger video when there are two and one is larger than the screen width and one is smaller.', () => {
			// Arrange
			const screenWidth = 600;
			const testSources: Source[] = [
				mp4Src480w,
				mp4Src720h,
				m3u8Src480w,
				m3u8Src720h,
			];

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
			const testSources: Source[] = [
				mp4Src480w,
				mp4Src720h,
				m3u8Src480w,
				m3u8Src720h,
			];

			// Act
			const sources = findOptimisedSourcePerMimeType(testSources, 800);

			// Assert
			expect(sources).toEqual([mp4Src720h, m3u8Src720h]);
		});
	});
});
