import type { Source } from './video';
import { filterOutHlsSources } from './video';

const testHlsSources: Source[] = [
	{
		src: 'https://uploads.guim.co.uk/example-1.m3u8',
		mimeType: 'application/x-mpegURL',
	},
	{
		src: 'https://uploads.guim.co.uk/example-2.m3u8',
		mimeType: 'application/vnd.apple.mpegurl',
	},
];

const testMp4Source: Source = {
	src: 'https://example.com/video.mp4',
	mimeType: 'video/mp4',
};

describe('video', () => {
	it('should filter out HLS sources', () => {
		// Arrange
		const sources: Source[] = [...testHlsSources, testMp4Source];

		// Act
		const filteredSources = filterOutHlsSources(sources);

		// Assert
		expect(filteredSources).toEqual([testMp4Source]);
	});
});
