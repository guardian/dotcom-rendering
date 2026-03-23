import { convertAssetsToVideoSources } from './video';

const mp4Asset = {
	url: 'https://guim-example.co.uk/atomID-1.mp4',
	mimeType: 'video/mp4',
};

const m3u8Asset = {
	url: 'https://guim-example.co.uk/atomID-1.m3u8',
	mimeType: 'application/x-mpegURL',
};
const unsupportedAsset = {
	url: 'https://guim-example.co.uk/atomID-1.mov',
	mimeType: 'video/quicktime',
};

const mp4Src = {
	src: 'https://guim-example.co.uk/atomID-1.mp4',
	mimeType: 'video/mp4',
};

const m3u8Src = {
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
