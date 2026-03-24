import type { VideoAssets } from '../types/content';
import type { Source } from './video';
import { convertAssetsToVideoSources } from './video';

const mp4Asset480w: VideoAssets = {
	url: 'https://guim-example.co.uk/atomID-1_480w.mp4',
	mimeType: 'video/mp4',
	dimensions: {
		height: 386,
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
		width: 898,
	},
	aspectRatio: '5:4',
};
const unsupportedAsset: VideoAssets = {
	url: 'https://guim-example.co.uk/atomID-1.mov',
	mimeType: 'video/quicktime',
	dimensions: {
		height: 720,
		width: 898,
	},
	aspectRatio: '5:4',
};

const mp4Src480w: Source = {
	src: 'https://guim-example.co.uk/atomID-1_480w.mp4',
	mimeType: 'video/mp4',
	height: 386,
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

const m3u8Src: Source = {
	src: 'https://guim-example.co.uk/atomID-1.m3u8',
	mimeType: 'application/x-mpegURL',
	height: 720,
	width: 898,
	aspectRatio: '5:4',
};

describe('convertAssetsToVideoSources', () => {
	it('should drop unsupported assets', () => {
		const assets = [mp4Asset480w, m3u8Asset, unsupportedAsset];
		const expected = [mp4Src480w, m3u8Src];
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
		const expected = [mp4Src720h, mp4Src480w, m3u8Src, m3u8Src, m3u8Src];
		expect(convertAssetsToVideoSources(assets)).toEqual(expected);
	});
});
