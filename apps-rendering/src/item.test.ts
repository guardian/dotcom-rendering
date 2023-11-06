import Int64 from 'node-int64';
import { ContentType } from '@guardian/content-api-models/v1/contentType';
import { Tag } from '@guardian/content-api-models/v1/tag';
import { TagType } from '@guardian/content-api-models/v1/tagType';
import { ElementType } from '@guardian/content-api-models/v1/elementType';
import { AssetType } from '@guardian/content-api-models/v1/assetType';
import { AtomType } from '@guardian/content-atom-model/atomType';
import { Atoms } from '@guardian/content-api-models/v1/atoms';
import { fromCapi, Standard, Review, getFormat } from 'item';
import { ElementKind } from 'bodyElement';
import { none, some } from '@guardian/types';
import { ArticleDesign, ArticleDisplay, ArticleSpecial } from '@guardian/libs';
import { JSDOM } from 'jsdom';
import { Content } from '@guardian/content-api-models/v1/content';
import { articleContentWith, articleMainContentWith } from 'helperTest';
import { EmbedKind, Spotify, YouTube } from 'embed';
import { Optional } from 'optional';
import { Context } from "./parserContext";
import { MainMediaKind } from "./mainMedia";

const articleContent = {
	id: '',
	type: ContentType.ARTICLE,
	webTitle: '',
	webUrl: '',
	apiUrl: '',
	tags: [],
	references: [],
	isHosted: false,
};

const contentWithTags = (tagIds: string[]) => {
	const tags: Tag[] = tagIds.map((id) => ({
		id,
		type: TagType.TONE,
		webTitle: '',
		webUrl: '',
		apiUrl: '',
		references: [],
	}));
	return {
		...articleContent,
		tags,
	};
};

const contentWithTag = (tagId: string) => contentWithTags([tagId]);

const reviewContent = {
	...contentWithTag('tone/reviews'),
	fields: {
		starRating: 4,
	},
};

const liveblogContent = {
	...contentWithTag('tone/minutebyminute'),
	type: ContentType.LIVEBLOG,
	fields: {
		liveBloggingNow: true,
	},
};

const immersive = {
	id: '',
	type: ContentType.ARTICLE,
	webTitle: '',
	webUrl: '',
	apiUrl: '',
	tags: [],
	references: [],
	isHosted: false,
	fields: {
		displayHint: 'immersive',
	},
};

const showcase = {
	...articleContent,
	blocks: {
		body: [
			{
				id: '',
				bodyHtml: '',
				bodyTextSummary: '',
				attributes: {},
				published: true,
				contributors: [],
				elements: [],
			},
		],
		main: {
			id: '',
			bodyHtml: '',
			bodyTextSummary: '',
			attributes: {},
			published: true,
			contributors: [],
			elements: [
				{
					type: ElementType.IMAGE,
					assets: [
						{
							type: AssetType.IMAGE,
							mimeType: 'image/jpeg',
							file: 'https://theguardian.com/image.jpg',
							typeData: {
								aspectRatio: '5:3',
								width: 5302,
								height: 3182,
								isMaster: true,
							},
						},
					],
					imageTypeData: {
						role: 'showcase',
						copyright: '',
						source: '',
						photographer: '',
						mediaId: '',
						mediaApiUri: 'https://theguardian.com/image.jpg',
						suppliersReference: '',
						imageType: '',
					},
				},
			],
		},
	},
};

const articleContentWithImage = articleContentWith({
	type: ElementType.IMAGE,
	assets: [
		{
			type: AssetType.IMAGE,
			mimeType: 'image/jpeg',
			file: 'https://theguardian.com/image.jpg',
			typeData: {
				aspectRatio: '5:3',
				width: 5302,
				height: 3182,
				isMaster: true,
			},
		},
	],
	imageTypeData: {
		caption: 'caption',
		copyright: '',
		displayCredit: true,
		credit: 'credit',
		source: '',
		photographer: '',
		alt: 'alt',
		mediaId: '',
		mediaApiUri: 'https://image.co.uk',
		suppliersReference: '',
		imageType: '',
	},
});

const articleContentWithImageWithoutFile = articleContentWith({
	type: ElementType.IMAGE,
	assets: [
		{
			type: AssetType.IMAGE,
			mimeType: 'image/jpeg',
			file: '',
			typeData: {
				aspectRatio: '5:3',
				width: 5302,
				height: 3182,
				isMaster: true,
			},
		},
	],
	imageTypeData: {
		copyright: '',
		source: '',
		photographer: '',
		mediaId: '',
		mediaApiUri: 'https://image.co.uk',
		suppliersReference: '',
		imageType: '',
	},
});

const f = (content: Content, context?: Context) =>
	fromCapi(context ?? { docParser: JSDOM.fragment, salt: 'mockSalt' })(
		{ content },
		none,
	);

const getFirstBody = (item: Review | Standard) =>
	Optional.fromNullable(item.body[0]).withDefault({
		kind: ElementKind.Interactive,
		url: '',
		alt: none,
	});

describe('fromCapi returns correct Item', () => {
	test('audio', () => {
		const item = f(contentWithTag('type/audio'));
		expect(item.design).toBe(ArticleDesign.Audio);
	});

	test('gallery', () => {
		const item = f(contentWithTag('type/gallery'));
		expect(item.design).toBe(ArticleDesign.Gallery);
	});

	test('video', () => {
		const item = f(contentWithTag('type/video'));
		expect(item.design).toBe(ArticleDesign.Video);
	});

	test('picture', () => {
		// Picture should take precedence over Comment
		const item = f(contentWithTags(['tone/comment', 'type/picture']));
		expect(item.design).toBe(ArticleDesign.Picture);
	});

	test('review', () => {
		const item = f(reviewContent);
		expect(item.design).toBe(ArticleDesign.Review);
	});

	test('analysis', () => {
		const item = f(contentWithTag('tone/analysis'));
		expect(item.design).toBe(ArticleDesign.Analysis);
	});

	test('comment', () => {
		const item = f(contentWithTag('tone/comment'));
		expect(item.design).toBe(ArticleDesign.Comment);
	});

	test('feature', () => {
		const item = f(contentWithTag('tone/features'));
		expect(item.design).toBe(ArticleDesign.Feature);
	});

	test('deadblog', () => {
		const item = f(contentWithTag('tone/minutebyminute'));
		expect(item.design).toBe(ArticleDesign.DeadBlog);
	});

	test('liveblog', () => {
		const item = f(liveblogContent);
		expect(item.design).toBe(ArticleDesign.LiveBlog);
	});

	test('recipe', () => {
		const item = f(contentWithTag('tone/recipes'));
		expect(item.design).toBe(ArticleDesign.Recipe);
	});

	test('matchreport', () => {
		const item = f(contentWithTag('tone/matchreports'));
		expect(item.design).toBe(ArticleDesign.MatchReport);
	});

	test('interview', () => {
		const item = f(contentWithTag('tone/interview'));
		expect(item.design).toBe(ArticleDesign.Interview);
	});

	test('editorial', () => {
		const item = f(contentWithTag('tone/editorials'));
		expect(item.design).toBe(ArticleDesign.Editorial);
	});

	test('quiz', () => {
		const item = f(contentWithTag('tone/quizzes'));
		expect(item.design).toBe(ArticleDesign.Quiz);
	});

	test('labs', () => {
		const item = f(contentWithTag('tone/advertisement-features'));
		expect(item.theme).toBe(ArticleSpecial.Labs);
	});

	test('article', () => {
		const item = f(articleContent);
		expect(item.design).toBe(ArticleDesign.Standard);
	});
});

describe('text elements', () => {
	test('parses text elements', () => {
		const textElement = {
			type: ElementType.TEXT,
			assets: [],
			textTypeData: {
				html: '<p>paragraph</p>',
			},
		};
		const item = f(articleContentWith(textElement)) as Standard;
		const element = getFirstBody(item);
		expect(element.kind).toBe(ElementKind.Text);
	});

	test('filters empty text elements', () => {
		const textElement = {
			type: ElementType.TEXT,
			assets: [],
			textTypeData: {
				html: '',
			},
		};
		const item = f(articleContentWith(textElement)) as Standard;
		const element = getFirstBody(item);
		expect(element.kind).toBe(ElementKind.Interactive);
	});
});

describe('image elements', () => {
	test('parses image elements', () => {
		const item = f(articleContentWithImage) as Standard;
		const element = getFirstBody(item);
		expect(element.kind).toBe(ElementKind.Image);
	});

	test('filters image elements without file url', () => {
		const item = f(articleContentWithImageWithoutFile) as Standard;
		const element = getFirstBody(item);
		expect(element.kind).toBe(ElementKind.Interactive);
	});
});

describe('pullquote elements', () => {
	test('parses pullquote elements', () => {
		const pullquoteElement = {
			type: ElementType.PULLQUOTE,
			assets: [],
			pullquoteTypeData: {
				html: '<p>pullquote<p>',
				attribution: '',
			},
		};
		const item = f(articleContentWith(pullquoteElement)) as Standard;
		const element = getFirstBody(item);
		expect(element.kind).toBe(ElementKind.Pullquote);
	});

	test('filters empty pullquote elements', () => {
		const pullquoteElement = {
			type: ElementType.PULLQUOTE,
			assets: [],
			pullquoteTypeData: {
				html: '',
				attribution: '',
			},
		};
		const item = f(articleContentWith(pullquoteElement)) as Standard;
		const element = getFirstBody(item);
		expect(element.kind).toBe(ElementKind.Interactive);
	});
});

describe('interactive elements', () => {
	test('parses interactive elements', () => {
		const interactiveElement = {
			type: ElementType.INTERACTIVE,
			assets: [],
			interactiveTypeData: {
				iframeUrl: 'https://theguardian.com',
			},
		};
		const item = f(articleContentWith(interactiveElement)) as Standard;
		const element = Optional.fromNullable(item.body[0]).withDefault({
			kind: ElementKind.RichLink,
			url: '',
			linkText: '',
		});
		expect(element.kind).toBe(ElementKind.Interactive);
	});

	test('filters empty interactive elements', () => {
		const interactiveElement = {
			type: ElementType.INTERACTIVE,
			assets: [],
			interactiveTypeData: {
				iframeUrl: '',
			},
		};
		const item = f(articleContentWith(interactiveElement)) as Standard;
		const element = Optional.fromNullable(item.body[0]).withDefault({
			kind: ElementKind.RichLink,
			url: '',
			linkText: '',
		});
		expect(element.kind).toBe(ElementKind.RichLink);
	});
});

describe('rich link elements', () => {
	test('parses rich link elements', () => {
		const richLinkElement = {
			type: ElementType.RICH_LINK,
			assets: [],
			richLinkTypeData: {
				url: 'https://www.theguardian.com/',
				originalUrl: 'https://www.theguardian.com/',
				linkText: 'link text',
				linkPrefix: '',
				role: '',
			},
		};
		const item = f(articleContentWith(richLinkElement)) as Standard;
		const element = getFirstBody(item);
		expect(element.kind).toBe(ElementKind.RichLink);
	});

	test('filters rich link elements with empty urls', () => {
		const richLinkElement = {
			type: ElementType.RICH_LINK,
			assets: [],
			richLinkTypeData: {
				url: '',
				originalUrl: 'https://www.theguardian.com/',
				linkText: 'link text',
				linkPrefix: '',
				role: '',
			},
		};
		const item = f(articleContentWith(richLinkElement)) as Standard;
		const element = getFirstBody(item);
		expect(element.kind).toBe(ElementKind.Interactive);
	});

	test('filters rich link elements with empty linkText', () => {
		const richLinkElement = {
			type: ElementType.RICH_LINK,
			assets: [],
			richLinkTypeData: {
				url: 'https://www.theguardian.com/',
				originalUrl: '',
				linkText: '',
				linkPrefix: '',
				role: '',
			},
		};
		const item = f(articleContentWith(richLinkElement)) as Standard;
		const element = getFirstBody(item);
		expect(element.kind).toBe(ElementKind.Interactive);
	});
});

describe('tweet elements', () => {
	test('parses tweet elements', () => {
		const tweetElement = {
			type: ElementType.TWEET,
			assets: [],
			tweetTypeData: {
				id: 'id',
				html: '<blockquote>tweet<blockquote>',
			},
		};
		const item = f(articleContentWith(tweetElement)) as Standard;
		const element = getFirstBody(item);
		expect(element.kind).toBe(ElementKind.Tweet);
	});

	test('filters tweet elements with empty ids', () => {
		const tweetElement = {
			type: ElementType.TWEET,
			assets: [],
			tweetTypeData: {
				id: '',
				html: '<blockquote>tweet<blockquote>',
			},
		};
		const item = f(articleContentWith(tweetElement)) as Standard;
		const element = getFirstBody(item);
		expect(element.kind).toBe(ElementKind.Interactive);
	});

	test('filters tweet elements with empty html', () => {
		const tweetElement = {
			type: ElementType.TWEET,
			assets: [],
			tweetTypeData: {
				id: 'id',
				html: '',
			},
		};
		const item = f(articleContentWith(tweetElement)) as Standard;
		const element = getFirstBody(item);
		expect(element.kind).toBe(ElementKind.Interactive);
	});

	test('filters tweet elements with no blockquotes', () => {
		const tweetElement = {
			type: ElementType.TWEET,
			assets: [],
			tweetTypeData: {
				id: 'id',
				html: '<span>tweet<span>',
			},
		};
		const item = f(articleContentWith(tweetElement)) as Standard;
		const element = getFirstBody(item);
		expect(element.kind).toBe(ElementKind.Interactive);
	});
});

describe('instagram elements', () => {
	test('parses instagram elements', () => {
		const instagramElement = {
			type: ElementType.INSTAGRAM,
			assets: [],
			instagramTypeData: {
				html: '<p>Instagram post<p>',
				originalUrl: 'https://www.instagram.com/p/B9_e-NNlEiC/',
				title: '',
				source: '',
				authorUrl: '',
				authorUsername: '',
			},
		};
		const item = f(articleContentWith(instagramElement)) as Standard;
		const element = getFirstBody(item);
		expect(element.kind).toBe(ElementKind.Embed);
	});

	test('filters embed elements with empty instagramTypeData originalUrl', () => {
		const instagramElement = {
			type: ElementType.INSTAGRAM,
			assets: [],
			instagramTypeData: {
				originalUrl: '',
				title: '',
				source: '',
				authorUrl: '',
				authorUsername: '',
			},
		};
		const item = f(articleContentWith(instagramElement)) as Standard;
		const element = getFirstBody(item);
		expect(element.kind).toBe(ElementKind.Interactive);
	});
});

describe('embed elements', () => {
	test('parses embed elements', () => {
		const embedElement = {
			type: ElementType.EMBED,
			assets: [],
			embedTypeData: {
				html: '<p>Embed element<p>',
				source: 'mockSource',
				sourceDomain: 'mockSourceDomain',
			},
		};
		const item = f(articleContentWith(embedElement)) as Standard;
		const element = getFirstBody(item);
		expect(element.kind).toBe(ElementKind.Embed);
	});

	test('filters embed elements without embedTypeData html', () => {
		const embedElement = {
			type: ElementType.EMBED,
			assets: [],
			embedTypeData: {},
		};
		const item = f(articleContentWith(embedElement)) as Standard;
		const element = getFirstBody(item);
		expect(element.kind).toBe(ElementKind.Interactive);
	});
});

describe('audio elements', () => {
	test('filters out audio elements with no src attributes on iframe', () => {
		const audioElement = {
			type: ElementType.AUDIO,
			assets: [],
			audioTypeData: {
				html: '<iframe></iframe>',
			},
		};
		const item = f(articleContentWith(audioElement)) as Standard;
		const element = getFirstBody(item);
		expect(element.kind).toBe(ElementKind.Interactive);
	});

	test('filters audio elements without audioTypeData html', () => {
		const audioElement = {
			type: ElementType.AUDIO,
			assets: [],
			audioTypeData: {},
		};
		const item = f(articleContentWith(audioElement)) as Standard;
		const element = getFirstBody(item);
		expect(element.kind).toBe(ElementKind.Interactive);
	});

	test('strips and sets attributes on iframe', () => {
		const audioElement = {
			type: ElementType.AUDIO,
			assets: [],
			audioTypeData: {
				html: "<iframe src='https://open.spotify.com/embed/track/' width='300' height='300' frameborder='0'></iframe>",
				source: 'Spotify',
			},
		};
		const item = f(articleContentWith(audioElement)) as Standard;
		const embed = Optional.fromNullable(item.body[0]).flatMap<Spotify>(
			(element) =>
				element.kind === ElementKind.Embed &&
				element.embed.kind === EmbedKind.Spotify
					? Optional.some(element.embed)
					: Optional.none(),
		);

		expect(embed.isSome()).toBe(true);

		if (embed.isSome()) {
			expect(embed.value.src).toContain(
				'https://open.spotify.com/embed/track/',
			);
			expect(embed.value.width).toBe(300);
			expect(embed.value.height).not.toBe(380);
		}
	});

	test('does not render if no iframe inside the html', () => {
		const audioElement = {
			type: ElementType.AUDIO,
			assets: [],
			audioTypeData: {
				html: '<p>Spotify playlist<p>',
			},
		};
		const item = f(articleContentWith(audioElement)) as Standard;
		const element = getFirstBody(item);
		expect(element.kind).toBe(ElementKind.Interactive);
	});
});

describe('video elements', () => {
	test('filters out video elements with no src attributes on iframe', () => {
		const videoElement = {
			type: ElementType.VIDEO,
			assets: [],
			videoTypeData: {
				html: '<iframe></iframe>',
			},
		};
		const item = f(articleContentWith(videoElement)) as Standard;
		const element = getFirstBody(item);
		expect(element.kind).toBe(ElementKind.Interactive);
	});

	test('filters video elements without videoTypeData html', () => {
		const videoElement = {
			type: ElementType.VIDEO,
			assets: [],
			videoTypeData: {},
		};
		const item = f(articleContentWith(videoElement)) as Standard;
		const element = getFirstBody(item);
		expect(element.kind).toBe(ElementKind.Interactive);
	});

	test('strips and sets attributes on iframe', () => {
		const videoElement = {
			type: ElementType.VIDEO,
			assets: [],
			videoTypeData: {
				html: "<iframe height='259' width='460' src='https://www.youtube-nocookie.com/embed/' frameborder='0' allowfullscreen ></iframe>",
				url: 'https://www.youtube.com/watch?v=mockVideoId',
				source: 'YouTube',
				width: 460,
				height: 259,
			},
		};
		const item = f(articleContentWith(videoElement)) as Standard;
		const embed = Optional.fromNullable(item.body[0]).flatMap<YouTube>(
			(element) =>
				element.kind === ElementKind.Embed &&
				element.embed.kind === EmbedKind.YouTube
					? Optional.some(element.embed)
					: Optional.none(),
		);

		expect(embed.isSome()).toBe(true);

		if (embed.isSome()) {
			expect(embed.value.id).toBe('mockVideoId');
			expect(embed.value.width).toBe(460);
			expect(embed.value.height).toBe(259);
		}
	});

	test('does not render if no iframe inside the html', () => {
		const videoElement = {
			type: ElementType.VIDEO,
			assets: [],
			videoTypeData: {
				html: '<p>YouTube video<p>',
			},
		};
		const item = f(articleContentWith(videoElement)) as Standard;
		const element = getFirstBody(item);
		expect(element.kind).toBe(ElementKind.Interactive);
	});
});

describe('interactive atom elements', () => {
	test('renders on matching atom data in capi response', () => {
		const interactiveAtomElement = {
			type: ElementType.CONTENTATOM,
			assets: [],
			contentAtomTypeData: {
				atomId: 'interactives/2020/04/interactive-pandemic-timeline',
				atomType: 'interactive',
			},
		};

		const atoms: Atoms = {
			interactives: [
				{
					id: 'interactives/2020/04/interactive-pandemic-timeline',
					atomType: AtomType.INTERACTIVE,
					labels: [],
					defaultHtml: 'default',
					data: {
						kind: 'interactive',
						interactive: {
							type: 'interactive',
							title: 'Pandemics and epidemics timeline',
							css: 'main { background: yellow; }',
							html: '<main>Some content</main>',
							mainJS: "console.log('init')",
							docData: '',
						},
					},
					contentChangeDetails: {
						lastModified: {
							date: new Int64('0'),
							user: {
								email: '',
								firstName: '',
								lastName: '',
							},
						},
						created: {
							date: new Int64('0'),
							user: {
								email: '',
								firstName: '',
								lastName: '',
							},
						},
						published: {
							date: new Int64('0'),
							user: {
								email: '',
								firstName: '',
								lastName: '',
							},
						},
						revision: new Int64('0'),
					},
					commissioningDesks: [],
				},
			],
		};
		const item = f(
			articleContentWith(interactiveAtomElement, atoms),
		) as Standard;
		const element = getFirstBody(item);
		expect(element.kind).toBe(ElementKind.InteractiveAtom);
	});
});

describe('cartoon main media', () => {
	const cartoonElement = {
		type: ElementType.CARTOON,
		assets: [],
		cartoonTypeData: {},
	};

	test('filters out cartoon main media elements', () => {
		const item = f(articleMainContentWith(cartoonElement))
		expect(item.mainMedia).toBe(none)
	});

	test('parses cartoon elements in the context of the Editions app', () => {
		const context: Context = { docParser: JSDOM.fragment, salt: 'mockSalt', app: "Editions" }
		const item = f(articleMainContentWith(cartoonElement), context)
		expect(item.mainMedia).toEqual(some({
			kind: MainMediaKind.Cartoon,
			cartoon: {
				images: [],
			}
		}));
	})
});

describe('format', () => {
	test('Uses immersive display', () => {
		const item = f(immersive);
		const format = getFormat(item);
		expect(format.display).toBe(ArticleDisplay.Immersive);
	});

	test('Uses showcase display', () => {
		const item = f(showcase);
		const format = getFormat(item);
		expect(format.display).toBe(ArticleDisplay.Showcase);
	});
});
