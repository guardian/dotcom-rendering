import type {
	FEFrontCardStyle,
	FEMediaAsset,
	FEMediaAtom,
} from '../frontend/feFront';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import type { EditorialTest, VariantMeta } from '../types/front';
import type { MainMedia } from '../types/mainMedia';
import {
	decideArticleMedia,
	decideHeadline,
	decideReplacementMedia,
	getActiveMediaAtom,
	getMediaMetadata,
} from './enhanceCards';

describe('Enhance Cards', () => {
	const testMp4Asset: FEMediaAsset = {
		id: 'https://guim-example.co.uk/atomID-1.mp4',
		version: 1,
		platform: 'Url',
		mimeType: 'video/mp4',
		assetType: 'Video',
		dimensions: {
			height: 400,
			width: 500,
		},
		hasAudio: true,
	};
	const largeMp4Asset: FEMediaAsset = {
		...testMp4Asset,
		id: 'https://guim-example.co.uk/atomID-2.mp4',
		dimensions: {
			height: 900,
			width: 720,
		},
		hasAudio: true,
	};
	const testM3u8Asset: FEMediaAsset = {
		id: 'https://guim-example.co.uk/atomID-1.m3u8',
		version: 1,
		platform: 'Url',
		mimeType: 'application/x-mpegURL',
		assetType: 'Video',
		dimensions: {
			height: 400,
			width: 500,
		},
		hasAudio: true,
	};
	const largeM3u8Asset: FEMediaAsset = {
		...testM3u8Asset,
		id: 'https://guim-example.co.uk/atomID-2.m3u8',
		dimensions: {
			height: 900,
			width: 720,
		},
		hasAudio: true,
	};
	const testSubtitleAsset: FEMediaAsset = {
		id: 'https://guim-example.co.uk/atomID-1.vtt',
		version: 1,
		platform: 'Url',
		mimeType: 'text/vtt',
		assetType: 'Subtitles',
	};
	const testYoutubeAsset: FEMediaAsset = {
		id: 'test-youtube-id',
		version: 1,
		platform: 'Youtube',
		assetType: 'Video',
	};

	const testMediaAtom: FEMediaAtom = {
		id: 'atomID',
		assets: [testMp4Asset, largeMp4Asset, testM3u8Asset, largeM3u8Asset],
		title: 'Example video',
		duration: 15,
		source: '',
		posterImage: { allImages: [] },
		trailImage: { allImages: [] },
		expired: false,
		activeVersion: 1,
	};

	describe('getActiveMediaAtom', () => {
		it('returns only SelfHostedVideo if the first asset is a self-hosted video', () => {
			const mediaAtom = {
				...testMediaAtom,
				assets: [testMp4Asset, testYoutubeAsset],
			};
			const cardTrailImage = '';

			expect(getActiveMediaAtom(mediaAtom, cardTrailImage)).toEqual({
				atomId: 'atomID',
				duration: 15,
				aspectRatio: 5 / 4,
				image: {
					src: '',
					aspectRatio: '5:4',
				},
				type: 'SelfHostedVideo',
				videoStyle: 'Loop',
				subtitleSource: undefined,
				sources: [
					{
						mimeType: 'video/mp4',
						src: 'https://guim-example.co.uk/atomID-1.mp4',
						height: 400,
						width: 500,
						hasAudio: true,
					},
				],
			});
		});

		it('returns only YoutubeVideo if the first asset is a YouTube video', () => {
			const mediaAtom = {
				...testMediaAtom,
				assets: [testYoutubeAsset, testMp4Asset],
			};
			const cardTrailImage = '';

			expect(getActiveMediaAtom(mediaAtom, cardTrailImage)).toEqual({
				type: 'YoutubeVideo',
				id: 'atomID',
				videoId: 'test-youtube-id',
				duration: 15,
				title: 'Example video',
				width: 500,
				height: 300,
				origin: '',
				expired: false,
				isLive: false,
				image: '',
			});
		});

		it('returns only one YoutubeVideo if there are multiple YouTube assets', () => {
			const mediaAtom = {
				...testMediaAtom,
				assets: [
					testYoutubeAsset,
					{
						...testYoutubeAsset,
						id: 'test-youtube-id-2',
					},
					testMp4Asset,
				],
			};
			const cardTrailImage = '';

			expect(getActiveMediaAtom(mediaAtom, cardTrailImage)).toEqual({
				type: 'YoutubeVideo',
				id: 'atomID',
				videoId: 'test-youtube-id',
				duration: 15,
				title: 'Example video',
				width: 500,
				height: 300,
				origin: '',
				expired: false,
				isLive: false,
				image: '',
			});
		});

		it('prioritises MP4 assets over m3u8 assets', () => {
			const mediaAtom = {
				...testMediaAtom,
				assets: [
					testM3u8Asset,
					testMp4Asset,
					largeM3u8Asset,
					largeMp4Asset,
				],
			};
			const cardTrailImage = '';

			expect(getActiveMediaAtom(mediaAtom, cardTrailImage)).toEqual({
				atomId: 'atomID',
				duration: 15,
				aspectRatio: 5 / 4,
				type: 'SelfHostedVideo',
				videoStyle: 'Loop',
				subtitleSource: undefined,
				image: {
					src: '',
					aspectRatio: '5:4',
				},
				sources: [
					{
						mimeType: 'video/mp4',
						src: 'https://guim-example.co.uk/atomID-1.mp4',
						height: 400,
						width: 500,
						hasAudio: true,
					},
					{
						mimeType: 'video/mp4',
						src: 'https://guim-example.co.uk/atomID-2.mp4',
						height: 900,
						width: 720,
						hasAudio: true,
					},
					{
						mimeType: 'application/x-mpegURL',
						src: 'https://guim-example.co.uk/atomID-1.m3u8',
						height: 400,
						width: 500,
						hasAudio: true,
					},
					{
						mimeType: 'application/x-mpegURL',
						src: 'https://guim-example.co.uk/atomID-2.m3u8',
						height: 900,
						width: 720,
						hasAudio: true,
					},
				],
			});
		});

		it('filters out non-video assets', () => {
			const mediaAtom: FEMediaAtom = {
				...testMediaAtom,
				assets: [testSubtitleAsset, testM3u8Asset, testMp4Asset],
			};
			const cardTrailImage = '';

			expect(getActiveMediaAtom(mediaAtom, cardTrailImage)).toEqual({
				atomId: 'atomID',
				duration: 15,
				aspectRatio: 5 / 4,
				image: {
					src: '',
					aspectRatio: '5:4',
				},
				type: 'SelfHostedVideo',
				videoStyle: 'Loop',
				subtitleSource: 'https://guim-example.co.uk/atomID-1.vtt',
				sources: [
					{
						mimeType: 'video/mp4',
						src: 'https://guim-example.co.uk/atomID-1.mp4',
						height: 400,
						width: 500,
						hasAudio: true,
					},
					{
						mimeType: 'application/x-mpegURL',
						src: 'https://guim-example.co.uk/atomID-1.m3u8',
						height: 400,
						width: 500,
						hasAudio: true,
					},
				],
			});
		});
	});

	describe('getMediaMetadata', () => {
		it('extracts type, duration, and live status from a YouTube video media object', () => {
			const testYoutubeMainMedia: MainMedia = {
				type: 'YoutubeVideo',
				id: 'atomID',
				videoId: 'videoID',
				height: 400,
				width: 500,
				origin: 'https://guim-example.co.uk/',
				title: 'Example video',
				duration: 151,
				expired: false,
				isLive: false,
			};

			expect(getMediaMetadata(testYoutubeMainMedia)).toEqual({
				type: 'YoutubeVideo',
				duration: 151,
				isLive: false,
			});
		});

		it('extracts type and duration from a self-hosted video media object', () => {
			const testSelfHostedMainMedia: MainMedia = {
				type: 'SelfHostedVideo',
				videoStyle: 'Loop',
				atomId: 'atomID',
				sources: [],
				aspectRatio: 5 / 4,
				duration: 151,
				image: {
					src: '',
					aspectRatio: '5:4',
				},
			};

			expect(getMediaMetadata(testSelfHostedMainMedia)).toEqual({
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
				src: 'https://guim-example.co.uk/',
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
					src: 'https://guim-example.co.uk/',
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
				src: 'https://guim-example.co.uk/',
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
			const mediaAtom = { ...testMediaAtom, assets: [testMp4Asset] };

			expect(
				decideArticleMedia(
					format,
					mediaAtom,
					undefined,
					undefined,
					undefined,
					undefined,
					'https://guim-example.co.uk/video-image',
				),
			).toEqual({
				type: 'SelfHostedVideo',
				atomId: 'atomID',
				duration: 15,
				aspectRatio: 5 / 4,
				image: {
					src: 'https://guim-example.co.uk/video-image',
					aspectRatio: '5:4',
				},
				sources: [
					{
						mimeType: 'video/mp4',
						src: 'https://guim-example.co.uk/atomID-1.mp4',
						height: 400,
						width: 500,
						hasAudio: true,
					},
				],
				videoStyle: 'Loop',
			});
		});
	});

	describe('decideReplacementMedia', () => {
		it('returns undefined if a mediaAtom is not provided', () => {
			expect(decideReplacementMedia(true, true)).toEqual(undefined);
		});

		it('returns undefined if a mediaAtom is provided but showMainVideo and videoReplace are both false', () => {
			const mediaAtom = { ...testMediaAtom, assets: [testMp4Asset] };
			const showMainVideo = false;
			const videoReplace = false;

			expect(
				decideReplacementMedia(showMainVideo, videoReplace, mediaAtom),
			).toEqual(undefined);
		});

		it('returns a video main media if a mediaAtom is provided and showMainVideo is set to true', () => {
			const mediaAtom = { ...testMediaAtom, assets: [testMp4Asset] };
			const showMainVideo = true;
			const videoReplace = false;

			expect(
				decideReplacementMedia(showMainVideo, videoReplace, mediaAtom),
			).toEqual({
				atomId: 'atomID',
				duration: 15,
				aspectRatio: 5 / 4,
				sources: [
					{
						mimeType: 'video/mp4',
						src: 'https://guim-example.co.uk/atomID-1.mp4',
						height: 400,
						width: 500,
						hasAudio: true,
					},
				],
				type: 'SelfHostedVideo',
				videoStyle: 'Loop',
				image: {
					src: undefined,
					aspectRatio: '5:4',
				},
			});
		});

		it('returns a video main media if a mediaAtom is provided and videoReplace is set to true', () => {
			const mediaAtom = { ...testMediaAtom, assets: [testMp4Asset] };
			const showMainVideo = false;
			const videoReplace = true;

			expect(
				decideReplacementMedia(showMainVideo, videoReplace, mediaAtom),
			).toEqual({
				type: 'SelfHostedVideo',
				atomId: 'atomID',
				duration: 15,
				aspectRatio: 5 / 4,
				image: {
					src: undefined,
					aspectRatio: '5:4',
				},
				sources: [
					{
						mimeType: 'video/mp4',
						src: 'https://guim-example.co.uk/atomID-1.mp4',
						height: 400,
						width: 500,
						hasAudio: true,
					},
				],
				subtitleSource: undefined,
				videoStyle: 'Loop',
			});
		});
	});

	describe('decideHeadline', () => {
		const cardWithNoEditorialTest = {
			properties: {
				isBreaking: false,
				showKickerTag: false,
				showByline: false,
				isLiveBlog: false,
				isCrossword: false,
				webTitle: '',
				editionBrandings: [],
				tests: [],
			},
			header: {
				isVideo: false,
				isComment: false,
				isGallery: false,
				isAudio: false,
				headline: 'Headline',
				url: '',
				hasMainVideoElement: false,
			},
			card: {
				id: '',
				cardStyle: {
					type: 'DefaultCardstyle' as FEFrontCardStyle,
				},
				shortUrl: '',
				group: '',
				isLive: false,
			},
			discussion: {
				isCommentable: false,
				isClosedForComments: false,
			},
			display: {
				isBoosted: false,
				showBoostedHeadline: false,
				showQuotedHeadline: false,
				imageHide: false,
				showLivePlayable: false,
			},
			type: '',
		};

		const oneHourInMilliseconds = 60 * 60 * 1000;

		const cardWithEditorialTest = {
			...cardWithNoEditorialTest,
			properties: {
				...cardWithNoEditorialTest.properties,
				tests: [
					{
						testUuid: 'uuid',
						variantMeta: [
							{
								id: 'A',
								meta: {
									headline: 'Headline A',
								},
							},
							{
								id: 'B',
								meta: {
									headline: 'Headline B',
								},
							},
						] as VariantMeta[],
						startDate: Date.now() - oneHourInMilliseconds,
						expiryDate: Date.now() + oneHourInMilliseconds,
						frontsThisTestCanRunOn: ['test-front'],
						hasManuallyEndedOnThisTrail: false,
					},
				],
			},
		};

		const cardWithEditorialTestWithUndefinedVariantMeta = {
			...cardWithEditorialTest,
			properties: {
				...cardWithEditorialTest.properties,
				tests: [
					{
						...cardWithEditorialTest.properties.tests[0],
						variantMeta: [
							{
								id: 'A',
								meta: {
									headline: undefined,
								},
							} as VariantMeta,
						],
					} as EditorialTest,
				],
			},
		};

		const cardWithExpiredEditorialTest = {
			...cardWithEditorialTest,
			properties: {
				...cardWithEditorialTest.properties,
				tests: [
					{
						...cardWithEditorialTest.properties.tests[0],
						expiryDate: Date.now() - oneHourInMilliseconds,
					} as EditorialTest,
				],
			},
		};

		const cardWithManuallyEndedEditorialTest = {
			...cardWithEditorialTest,
			properties: {
				...cardWithEditorialTest.properties,
				tests: [
					{
						...cardWithEditorialTest.properties.tests[0],
						hasManuallyEndedOnThisTrail: true,
					} as EditorialTest,
				],
			},
		};

		it('returns the default headline if no editorial test exists on the card, page is not in allowed fronts list, and user is not in a test bucket', () => {
			expect(
				decideHeadline(
					cardWithNoEditorialTest,
					{},
					true,
					'invalid-test-front',
				),
			).toEqual('Headline');
		});

		it('returns the default headline if editorial test exists and page is in allowed fronts list, but user is not in a test bucket', () => {
			expect(
				decideHeadline(cardWithEditorialTest, {}, true, 'test-front'),
			).toEqual('Headline');
		});

		it('returns the default headline if user is in a test bucket and page is in allowed fronts list, but editorial test does not exist', () => {
			expect(
				decideHeadline(
					cardWithNoEditorialTest,
					{
						'fronts-and-curation-editorial-test': 'a',
					},
					true,
					'test-front',
				),
			).toEqual('Headline');
		});

		it('returns the default headline if editorial test exists and user is in a test bucket, but page is not in allowed fronts list', () => {
			expect(
				decideHeadline(
					cardWithEditorialTest,
					{
						'fronts-and-curation-editorial-test': 'a',
					},
					true,
					'invalid-test-front',
				),
			).toEqual('Headline');
		});

		it('returns the default headline if editorial test exists, page is in allowed fronts list, user is in a variant bucket, but the feature switch is turned off ', () => {
			expect(
				decideHeadline(
					cardWithEditorialTest,
					{
						'fronts-and-curation-editorial-test': 'a',
					},
					false,
					'test-front',
				),
			).toEqual('Headline');
		});

		it('returns headline A if editorial test exists, page is in allowed fronts list, and user is in bucket A', () => {
			expect(
				decideHeadline(
					cardWithEditorialTest,
					{
						'fronts-and-curation-editorial-test': 'a',
					},
					true,
					'test-front',
				),
			).toEqual('Headline A');
		});

		it('returns headline B if editorial test exists, page is in allowed fronts list, and user is in bucket B', () => {
			expect(
				decideHeadline(
					cardWithEditorialTest,
					{
						'fronts-and-curation-editorial-test': 'b',
					},
					true,
					'test-front',
				),
			).toEqual('Headline B');
		});

		it('returns the default headline if the bucket name does not match a variant meta id', () => {
			expect(
				decideHeadline(
					cardWithEditorialTest,
					{
						'fronts-and-curation-editorial-test': 'c',
					},
					true,
					'test-front',
				),
			).toEqual('Headline');
		});

		it('returns the default headline if the variant headline is undefined', () => {
			expect(
				decideHeadline(
					cardWithEditorialTestWithUndefinedVariantMeta,
					{
						'fronts-and-curation-editorial-test': 'a',
					},
					true,
					'test-front',
				),
			).toEqual('Headline');
		});

		it('returns the default headline if an editorial test has expired', () => {
			expect(
				decideHeadline(
					cardWithExpiredEditorialTest,
					{
						'fronts-and-curation-editorial-test': 'a',
					},
					true,
					'test-front',
				),
			).toEqual('Headline');
		});

		it('returns the default headline if an editorial test has been manually ended', () => {
			expect(
				decideHeadline(
					cardWithManuallyEndedEditorialTest,
					{
						'fronts-and-curation-editorial-test': 'a',
					},
					true,
					'test-front',
				),
			).toEqual('Headline');
		});
	});
});
