import type { FEMediaAsset, FEMediaAtom } from '../frontend/feFront';
import { getActiveMediaAtom } from './enhanceCards';

describe('Enhance Cards', () => {
	it('prioritises m3u8 assets over MP4 assets', () => {
		const videoReplace = true;
		const assets: FEMediaAsset[] = [
			{
				id: 'https://guim-example.co.uk/atomID-1.mp4',
				version: 1,
				platform: 'Url',
				mimeType: 'video/mp4',
				assetType: 'Video',
			},
			{
				id: 'https://guim-example.co.uk/atomID-1.m3u8',
				version: 1,
				platform: 'Url',
				mimeType: 'application/x-mpegURL',
				assetType: 'Video',
			},
		];
		const mediaAtom: FEMediaAtom = {
			id: 'atomID',
			assets,
			title: 'Example video',
			duration: 15,
			source: '',
			posterImage: { allImages: [] },
			trailImage: { allImages: [] },
			expired: false,
			activeVersion: 1,
		};
		const cardTrailImage = '';

		expect(
			getActiveMediaAtom(videoReplace, mediaAtom, cardTrailImage),
		).toEqual({
			atomId: 'atomID',
			duration: 15,
			height: 400,
			image: '',
			type: 'SelfHostedVideo',
			videoStyle: 'Loop',
			subtitleSource: undefined,
			sources: [
				{
					mimeType: 'application/x-mpegURL',
					src: 'https://guim-example.co.uk/atomID-1.m3u8',
				},
				{
					mimeType: 'video/mp4',
					src: 'https://guim-example.co.uk/atomID-1.mp4',
				},
			],
			width: 500,
		});
	});

	it('filters out non-video assets', () => {
		const videoReplace = true;
		const assets: FEMediaAsset[] = [
			{
				id: 'https://guim-example.co.uk/atomID-1.vtt',
				version: 1,
				platform: 'Url',
				mimeType: 'text/vtt',
				assetType: 'Subtitles',
			},
			{
				id: 'https://guim-example.co.uk/atomID-1.m3u8',
				version: 1,
				platform: 'Url',
				mimeType: 'application/x-mpegURL',
				assetType: 'Video',
			},
			{
				id: 'https://guim-example.co.uk/atomID-1.mp4',
				version: 1,
				platform: 'Url',
				mimeType: 'video/mp4',
				assetType: 'Video',
			},
		];
		const mediaAtom: FEMediaAtom = {
			id: 'atomID',
			assets,
			title: 'Example video',
			duration: 15,
			source: '',
			posterImage: { allImages: [] },
			trailImage: { allImages: [] },
			expired: false,
			activeVersion: 1,
		};
		const cardTrailImage = '';

		expect(
			getActiveMediaAtom(videoReplace, mediaAtom, cardTrailImage),
		).toEqual({
			atomId: 'atomID',
			duration: 15,
			height: 400,
			image: '',
			type: 'SelfHostedVideo',
			videoStyle: 'Loop',
			subtitleSource: 'https://guim-example.co.uk/atomID-1.vtt',
			sources: [
				{
					mimeType: 'application/x-mpegURL',
					src: 'https://guim-example.co.uk/atomID-1.m3u8',
				},
				{
					mimeType: 'video/mp4',
					src: 'https://guim-example.co.uk/atomID-1.mp4',
				},
			],
			width: 500,
		});
	});
});
