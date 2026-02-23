import type { FEMediaAsset, FEMediaAtom } from '../frontend/feFront';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import type { MainMedia } from '../types/mainMedia';
import {
	decideArticleMedia,
	decideReplacementMedia,
	getActiveMediaAtom,
	getMediaMetadata,
} from './enhanceCards';

describe('Enhance Cards', () => {
	describe('getActiveMediaAtom', () => {
		it('prioritises MP4 assets over m3u8 assets', () => {
			const videoReplace = true;
			const assets: FEMediaAsset[] = [
				{
					id: 'https://guim-example.co.uk/atomID-1.mp4',
					version: 1,
					platform: 'Url',
					mimeType: 'video/mp4',
					assetType: 'Video',
					dimensions: {
						height: 400,
						width: 500,
					},
				},
				{
					id: 'https://guim-example.co.uk/atomID-1.m3u8',
					version: 1,
					platform: 'Url',
					mimeType: 'application/x-mpegURL',
					assetType: 'Video',
					dimensions: {
						height: 400,
						width: 500,
					},
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
						mimeType: 'video/mp4',
						src: 'https://guim-example.co.uk/atomID-1.mp4',
					},
					{
						mimeType: 'application/x-mpegURL',
						src: 'https://guim-example.co.uk/atomID-1.m3u8',
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
					dimensions: {
						height: 400,
						width: 500,
					},
				},
				{
					id: 'https://guim-example.co.uk/atomID-1.mp4',
					version: 1,
					platform: 'Url',
					mimeType: 'video/mp4',
					assetType: 'Video',
					dimensions: {
						height: 400,
						width: 500,
					},
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
						mimeType: 'video/mp4',
						src: 'https://guim-example.co.uk/atomID-1.mp4',
					},
					{
						mimeType: 'application/x-mpegURL',
						src: 'https://guim-example.co.uk/atomID-1.m3u8',
					},
				],
				width: 500,
			});
		});
	});

	describe('getMediaMetadata', () => {
		it('extracts type, duration, and live status from a YouTube video media object', () => {
			const media: MainMedia = {
				type: 'YoutubeVideo',
				id: 'atomID',
				videoId: 'videoID',
				height: 400,
				width: 500,
				origin: 'https://www.gu.com',
				title: 'Example video',
				duration: 151,
				expired: false,
				isLive: false,
			};

			expect(getMediaMetadata(media)).toEqual({
				type: 'YoutubeVideo',
				duration: 151,
				isLive: false,
			});
		});

		it('extracts type and duration from a self-hosted video media object', () => {
			const media: MainMedia = {
				type: 'SelfHostedVideo',
				videoStyle: 'Loop',
				atomId: 'atomID',
				sources: [],
				height: 400,
				width: 500,
				duration: 151,
			};

			expect(getMediaMetadata(media)).toEqual({
				type: 'SelfHostedVideo',
				duration: 151,
			});
		});

		it('returns type and duration for an audio media object', () => {
			const media: MainMedia = {
				type: 'Audio',
				duration: '12:45',
			};

			expect(getMediaMetadata(media)).toEqual({
				type: 'Audio',
				duration: '12:45',
			});
		});

		it('returns type and image count for a gallery media object', () => {
			const media: MainMedia = {
				type: 'Gallery',
				count: '12',
			};

			expect(getMediaMetadata(media)).toEqual({
				type: 'Gallery',
				count: '12',
			});
		});
	});

	describe('decideArticleMedia', () => {
		it('returns undefined when the article design is not Gallery, Audio, or Video', () => {
			const format = {
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: Pillar.News,
			};

			expect(decideArticleMedia(format)).toEqual(undefined);
		});
		it('returns a Gallery main media object with the provided image count when the article design is Gallery', () => {
			const format = {
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Gallery,
				theme: Pillar.News,
			};
			const galleryCount = 12;

			expect(decideArticleMedia(format, undefined, galleryCount)).toEqual(
				{ type: 'Gallery', count: '12' },
			);
		});

		it('returns a Gallery main media object with a fallback count of "0" when no gallery count is provided', () => {
			const format = {
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Gallery,
				theme: Pillar.News,
			};

			expect(decideArticleMedia(format)).toEqual({
				type: 'Gallery',
				count: '0',
			});
		});

		it('returns an Audio main media object with the provided duration and image when the article design is Audio', () => {
			const format = {
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Audio,
				theme: Pillar.News,
			};
			const audioDuration = '12:45';
			const podcastImage = {
				src: 'https://www.gu.com',
				altText: 'Podcast Image',
			};
			expect(
				decideArticleMedia(
					format,
					undefined,
					undefined,
					audioDuration,
					podcastImage,
				),
			).toEqual({
				type: 'Audio',
				duration: '12:45',
				podcastImage: {
					src: 'https://www.gu.com',
					altText: 'Podcast Image',
				},
			});
		});
		it('returns an Audio main media object without the provided image when the imageHide is set to true', () => {
			const format = {
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Audio,
				theme: Pillar.News,
			};
			const audioDuration = '12:45';
			const podcastImage = {
				src: 'https://www.gu.com',
				altText: 'Podcast Image',
			};
			const imageHide = true;
			expect(
				decideArticleMedia(
					format,
					undefined,
					undefined,
					audioDuration,
					podcastImage,
					imageHide,
				),
			).toEqual({ type: 'Audio', duration: '12:45' });
		});

		it('returns an Video main media object when a mediaAtom is provided when the article design is Video', () => {
			const format = {
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Video,
				theme: Pillar.News,
			};

			const mediaAtom: FEMediaAtom = {
				id: 'atomID',
				assets: [
					{
						id: 'https://guim-example.co.uk/atomID-1.mp4',
						version: 1,
						platform: 'Url',
						mimeType: 'video/mp4',
						assetType: 'Video',
						dimensions: {
							height: 400,
							width: 500,
						},
					},
				],
				title: 'Example video',
				duration: 15,
				source: '',
				posterImage: { allImages: [] },
				trailImage: { allImages: [] },
				expired: false,
				activeVersion: 1,
			};
			expect(
				decideArticleMedia(
					format,
					mediaAtom,
					undefined,
					undefined,
					undefined,
					undefined,
					'www.gu.com/video-image',
				),
			).toEqual({
				type: 'SelfHostedVideo',
				atomId: 'atomID',
				duration: 15,
				height: 400,
				image: 'www.gu.com/video-image',
				sources: [
					{
						mimeType: 'video/mp4',
						src: 'https://guim-example.co.uk/atomID-1.mp4',
					},
				],
				videoStyle: 'Loop',
				width: 500,
			});
		});
	});
	describe('decideReplacementMedia', () => {
		it('returns undefined if a mediaAtom is not provided', () => {
			expect(decideReplacementMedia()).toEqual(undefined);
		});
		it('returns undefined if a mediaAtom is provided but showMainVideo and videoReplace are both false', () => {
			const mediaAtom: FEMediaAtom = {
				id: 'atomID',
				assets: [
					{
						id: 'https://guim-example.co.uk/atomID-1.mp4',
						version: 1,
						platform: 'Url',
						mimeType: 'video/mp4',
						assetType: 'Video',
						dimensions: {
							height: 400,
							width: 500,
						},
					},
				],
				title: 'Example video',
				duration: 15,
				source: '',
				posterImage: { allImages: [] },
				trailImage: { allImages: [] },
				expired: false,
				activeVersion: 1,
			};
			const showMainVideo = false;
			const videoReplace = false;

			expect(
				decideReplacementMedia(showMainVideo, mediaAtom, videoReplace),
			).toEqual(undefined);
		});
		it('returns a video main media if a mediaAtom is provided and showMainVideo is set to true', () => {
			const mediaAtom: FEMediaAtom = {
				id: 'atomID',
				assets: [
					{
						id: 'https://guim-example.co.uk/atomID-1.mp4',
						version: 1,
						platform: 'Url',
						mimeType: 'video/mp4',
						assetType: 'Video',
						dimensions: {
							height: 400,
							width: 500,
						},
					},
				],
				title: 'Example video',
				duration: 15,
				source: '',
				posterImage: { allImages: [] },
				trailImage: { allImages: [] },
				expired: false,
				activeVersion: 1,
			};
			const showMainVideo = true;
			const videoReplace = false;

			expect(
				decideReplacementMedia(showMainVideo, mediaAtom, videoReplace),
			).toEqual({
				atomId: 'atomID',
				duration: 15,
				height: 400,
				sources: [
					{
						mimeType: 'video/mp4',
						src: 'https://guim-example.co.uk/atomID-1.mp4',
					},
				],
				type: 'SelfHostedVideo',
				videoStyle: 'Loop',
				width: 500,
			});
		});
		it('returns a video main media if a mediaAtom is provided and videoReplace is set to true', () => {
			const mediaAtom: FEMediaAtom = {
				id: 'atomID',
				assets: [
					{
						id: 'https://guim-example.co.uk/atomID-1.mp4',
						version: 1,
						platform: 'Url',
						mimeType: 'video/mp4',
						assetType: 'Video',
						dimensions: {
							height: 400,
							width: 500,
						},
					},
				],
				title: 'Example video',
				duration: 15,
				source: '',
				posterImage: { allImages: [] },
				trailImage: { allImages: [] },
				expired: false,
				activeVersion: 1,
			};
			const showMainVideo = false;
			const videoReplace = true;

			expect(
				decideReplacementMedia(showMainVideo, mediaAtom, videoReplace),
			).toEqual({
				type: 'SelfHostedVideo',
				atomId: 'atomID',
				duration: 15,
				height: 400,
				image: undefined,
				sources: [
					{
						mimeType: 'video/mp4',
						src: 'https://guim-example.co.uk/atomID-1.mp4',
					},
				],
				subtitleSource: undefined,
				videoStyle: 'Loop',
				width: 500,
			});
		});
	});
});
