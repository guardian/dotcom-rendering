import type { VideoAssets } from '../types/content';
import type { Source } from './video';
import { convertAssetsToVideoSources } from './video';

const mp4Asset: VideoAssets = {
	url: 'https://guim-example.co.uk/atomID-1.mp4',
	mimeType: 'video/mp4',
	dimensions: {
		height: 720,
		width: 1280,
	},
};
const m3u8Asset: VideoAssets = {
	url: 'https://guim-example.co.uk/atomID-1.m3u8',
	mimeType: 'application/x-mpegURL',
	dimensions: {
		height: 720,
		width: 1280,
	},
};
const unsupportedAsset: VideoAssets = {
	url: 'https://guim-example.co.uk/atomID-1.mov',
	mimeType: 'video/quicktime',
	dimensions: {
		height: 720,
		width: 1280,
	},
};

const mp4Src: Source = {
	src: 'https://guim-example.co.uk/atomID-1.mp4',
	mimeType: 'video/mp4',
};

const m3u8Src: Source = {
	src: 'https://guim-example.co.uk/atomID-1.m3u8',
	mimeType: 'application/x-mpegURL',
};

describe('convertAssetsToVideoSources', () => {
	it('should drop unsupported assets', () => {
		const assets = [mp4Asset, m3u8Asset, unsupportedAsset];
		const expected = [mp4Src, m3u8Src];
		expect(convertAssetsToVideoSources(assets)).toEqual(expected);
	});

	it('should reorder sources as per the supportedVideoFileTypes order', () => {
		const assets = [m3u8Asset, m3u8Asset, mp4Asset, m3u8Asset];
		const expected = [mp4Src, m3u8Src, m3u8Src, m3u8Src];
		expect(convertAssetsToVideoSources(assets)).toEqual(expected);
	});
});
