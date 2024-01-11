// ----- Imports ----- //

import { Edition } from '@guardian/apps-rendering-api-models/edition';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleElementRole,
	ArticlePillar,
} from '@guardian/libs';
import { none, OptionKind, some } from '../../vendor/@guardian/types/index';
import type { Option } from '../../vendor/@guardian/types/index';
import { parse } from 'client/parser';
import { ImageSubtype } from 'image/image';
import type { DeadBlog, LiveBlog } from 'item';
import type { LiveBlock } from 'liveBlock';
import { MainMediaKind } from 'mainMedia';
import type { MainMedia } from 'mainMedia';
import { Optional } from 'optional';
import type { LiveBlogPagedBlocks } from 'pagination';

const parser = new DOMParser();
const parseHtml = parse(parser);

const headline =
	'Covid live: Brazil health minister who shook hands with maskless Boris Johnson at UN tests positive';

const standfirst: Optional<DocumentFragment> = parseHtml(
	'<p><a href="x-gu://item/mobile.guardianapis.com/uk/items/world/live/2021/sep/22/coronavirus-live-news-brazil-health-minister-tests-positive-at-un-india-urges-uk-to-resolve-quarantine-dispute?page=with:block-614ae7e58f08b228c9498279#block-614ae7e58f08b228c9498279">Marcelo Quiroga tests positive</a> at UN general assembly in New York; <a href="x-gu://item/mobile.guardianapis.com/uk/items/world/live/2021/sep/22/coronavirus-live-news-brazil-health-minister-tests-positive-at-un-india-urges-uk-to-resolve-quarantine-dispute?page=with:block-614ad64b8f087b5c6fb4a8dc#block-614ad64b8f087b5c6fb4a8dc">Australia tourism minister says</a> on track to reopen borders ‘by Christmas’</p>\n<ul>\n <li><a href="x-gu://item/mobile.guardianapis.com/uk/items/world/2021/sep/22/calculated-risk-ardern-gambles-as-new-zealand-covid-restrictions-eased">Ardern gambles as New Zealand Covid restrictions eased</a></li>\n <li><a href="x-gu://item/mobile.guardianapis.com/uk/items/australia-news/2021/sep/22/riot-police-on-melbourne-streets-to-prevent-third-day-of-protests">Riot police on Melbourne streets to prevent third day of protests</a></li>\n <li><a href="x-gu://item/mobile.guardianapis.com/uk/items/global-development/2021/sep/21/argentina-to-lift-almost-all-covid-restrictions-as-cases-and-deaths-fall">Argentina to lift almost all Covid restrictions as cases and deaths fall</a></li>\n <li><a href="x-gu://item/mobile.guardianapis.com/uk/items/education/2021/sep/21/more-than-100000-pupils-off-school-in-england-last-week-amid-covid-surge">‘High alert’ warning as more than 100,000 pupils in England miss school</a></li>\n</ul>',
).toOptional();

const bylineHtml: Option<DocumentFragment> = parseHtml(
	'<a href="https://theguardian.com">Tom Ambrose</a> (now); <a href="https://theguardian.com">Miranda Bryant</a> and <a href="https://theguardian.com">Helen Sullivan</a> (earlier)',
).toOption();

const captionDocFragment: Option<DocumentFragment> = parseHtml(
	'<em>Jane Smith</em> Editor of things',
).toOption();

const mainMedia: Option<MainMedia> = {
	kind: OptionKind.Some,
	value: {
		kind: MainMediaKind.Image,
		image: {
			src: 'https://i.guim.co.uk/img/media/305593466a8bbd045d233b207b368a5dbcfd08f4/0_101_3000_1800/master/3000.jpg?width=500&quality=85&fit=bounds&s=6d0b66dcc9233754f89c07e74c44158f',
			srcset: 'https://i.guim.co.uk/img/media/305593466a8bbd045d233b207b368a5dbcfd08f4/0_101_3000_1800/master/3000.jpg?width=140&quality=85&fit=bounds&s=d0c466d24ac750ce4b1c9fe8a40fbdd3 140w, https://i.guim.co.uk/img/media/305593466a8bbd045d233b207b368a5dbcfd08f4/0_101_3000_1800/master/3000.jpg?width=500&quality=85&fit=bounds&s=6d0b66dcc9233754f89c07e74c44158f 500w, https://i.guim.co.uk/img/media/305593466a8bbd045d233b207b368a5dbcfd08f4/0_101_3000_1800/master/3000.jpg?width=1000&quality=85&fit=bounds&s=8f38bcd742d1ae10a3f01508e31c7f5f 1000w, https://i.guim.co.uk/img/media/305593466a8bbd045d233b207b368a5dbcfd08f4/0_101_3000_1800/master/3000.jpg?width=1500&quality=85&fit=bounds&s=45e33e51a33abe2b327882eb9de69d04 1500w, https://i.guim.co.uk/img/media/305593466a8bbd045d233b207b368a5dbcfd08f4/0_101_3000_1800/master/3000.jpg?width=2000&quality=85&fit=bounds&s=5bc078a6facde21b41d2c649ac36e01b 2000w',
			dpr2Srcset:
				'https://i.guim.co.uk/img/media/305593466a8bbd045d233b207b368a5dbcfd08f4/0_101_3000_1800/master/3000.jpg?width=140&quality=45&fit=bounds&s=5b4d13a66861d58dff15b371d11043ae 140w, https://i.guim.co.uk/img/media/305593466a8bbd045d233b207b368a5dbcfd08f4/0_101_3000_1800/master/3000.jpg?width=500&quality=45&fit=bounds&s=e043c3329b11500e9b907ac2c93275ff 500w, https://i.guim.co.uk/img/media/305593466a8bbd045d233b207b368a5dbcfd08f4/0_101_3000_1800/master/3000.jpg?width=1000&quality=45&fit=bounds&s=bb69b200c27229f685132af3eddd10b3 1000w, https://i.guim.co.uk/img/media/305593466a8bbd045d233b207b368a5dbcfd08f4/0_101_3000_1800/master/3000.jpg?width=1500&quality=45&fit=bounds&s=5ea519b33cadfdca59a7d7b1ce570631 1500w, https://i.guim.co.uk/img/media/305593466a8bbd045d233b207b368a5dbcfd08f4/0_101_3000_1800/master/3000.jpg?width=2000&quality=45&fit=bounds&s=fe2810561ff271c2a97583ca67cd97e8 2000w',
			alt: some('image'),
			width: 3000,
			height: 1800,
			caption: captionDocFragment,
			credit: {
				kind: OptionKind.Some,
				value: 'Photograph: Philip Keith/The Guardian',
			},
			nativeCaption: {
				kind: OptionKind.Some,
				value: '‘They could kill me any day; that’s all right with me. I am going down swinging, brother’ … West.',
			},
			role: ArticleElementRole.Standard,
			imageSubtype: Optional.some(ImageSubtype.Jpeg),
		},
	},
};

const tags = [
	{
		id: 'world/series/coronavirus-live',
		type: 2,
		sectionId: 'world',
		sectionName: 'World news',
		webTitle: 'Coronavirus live',
		webUrl: 'https://www.theguardian.com/world/series/coronavirus-live',
		apiUrl: 'https://content.guardianapis.com/world/series/coronavirus-live',
		references: [],
		description: `<p>Follow the Guardian's live coverage of the <a href="https://www.theguardian.com/world/coronavirus-outbreak">coronavirus pandemic</a><br></p>`,
		internalName: 'Coronavirus live (LIVE BLOG ONLY series tag)',
	},
	{
		id: 'world/coronavirus-outbreak',
		type: 1,
		sectionId: 'world',
		sectionName: 'World news',
		webTitle: 'Coronavirus',
		webUrl: 'https://www.theguardian.com/world/coronavirus-outbreak',
		apiUrl: 'https://content.guardianapis.com/world/coronavirus-outbreak',
		references: [],
		internalName: 'Coronavirus (main tag)',
	},
	{
		id: 'world/world',
		type: 1,
		sectionId: 'world',
		sectionName: 'World news',
		webTitle: 'World news',
		webUrl: 'https://www.theguardian.com/world/world',
		apiUrl: 'https://content.guardianapis.com/world/world',
		references: [],
		internalName: 'World news',
	},
	{
		id: 'type/article',
		type: 7,
		webTitle: 'Article',
		webUrl: 'https://www.theguardian.com/articles',
		apiUrl: 'https://content.guardianapis.com/type/article',
		references: [],
		internalName: 'Article (Content type)',
	},
	{
		id: 'tone/minutebyminute',
		type: 6,
		webTitle: 'Minute by minute',
		webUrl: 'https://www.theguardian.com/tone/minutebyminute',
		apiUrl: 'https://content.guardianapis.com/tone/minutebyminute',
		references: [],
		internalName: 'Minute by minute (Tone)',
	},
	{
		id: 'tone/news',
		type: 6,
		webTitle: 'News',
		webUrl: 'https://www.theguardian.com/tone/news',
		apiUrl: 'https://content.guardianapis.com/tone/news',
		references: [],
		internalName: 'News (Tone)',
	},
	{
		id: 'profile/helen-sullivan',
		type: 0,
		webTitle: 'Helen Sullivan',
		webUrl: 'https://www.theguardian.com/profile/helen-sullivan',
		apiUrl: 'https://content.guardianapis.com/profile/helen-sullivan',
		references: [],
		bio: `<p>Helen Sullivan is the world news liveblogger and reporter on the Guardian's foreign desk in Sydney. She also writes a fortnightly column about animals. Twitter <a href="https://twitter.com/helenrsullivan">@helenrsullivan</a></p>`,
		bylineImageUrl:
			'https://uploads.guim.co.uk/2020/04/08/Helen_Sullivan.jpg',
		bylineLargeImageUrl:
			'https://uploads.guim.co.uk/2020/04/08/Helen_Sullivan.png',
		firstName: 'Helen',
		lastName: 'Sullivan',
		twitterHandle: 'helenrsullivan',
		r2ContributorId: '83691',
		internalName: 'Helen Sullivan',
	},
	{
		id: 'profile/miranda-bryant',
		type: 0,
		webTitle: 'Miranda Bryant',
		webUrl: 'https://www.theguardian.com/profile/miranda-bryant',
		apiUrl: 'https://content.guardianapis.com/profile/miranda-bryant',
		references: [],
		bio: '<p>Miranda Bryant is a freelance journalist</p>',
		firstName: 'Miranda',
		lastName: 'Bryant',
		r2ContributorId: '85415',
		internalName: 'Miranda Bryant',
	},
	{
		id: 'profile/tom-ambrose',
		type: 0,
		webTitle: 'Tom Ambrose',
		webUrl: 'https://www.theguardian.com/profile/tom-ambrose',
		apiUrl: 'https://content.guardianapis.com/profile/tom-ambrose',
		references: [],
		firstName: 'Tom',
		lastName: 'Ambrose',
		r2ContributorId: '90702',
		internalName: 'Tom Ambrose',
	},
	{
		id: 'profile/oliver-milman',
		type: 0,
		webTitle: 'Oliver Milman',
		webUrl: 'https://www.theguardian.com/profile/oliver-milman',
		apiUrl: 'https://content.guardianapis.com/profile/oliver-milman',
		references: [],
		bio: '<p>Oliver Milman is an environment reporter for Guardian US. Twitter&nbsp;<a href="https://twitter.com/olliemilman">@olliemilman</a></p>',
		bylineImageUrl:
			'https://static.guim.co.uk/sys-images/Guardian/Pix/contributor/2014/9/30/1412084830432/Oliver-Milman.jpg',
		bylineLargeImageUrl:
			'https://uploads.guim.co.uk/2017/10/09/Oliver-Milman,-L.png',
		firstName: 'Milman',
		lastName: 'Oliver',
		twitterHandle: 'olliemilman',
		rcsId: 'Oliver Mi',
		r2ContributorId: '47089',
		internalName: 'Oliver Milman',
	},
	{
		id: 'profile/peterwalker',
		type: 0,
		webTitle: 'Peter Walker',
		webUrl: 'https://www.theguardian.com/profile/peterwalker',
		apiUrl: 'https://content.guardianapis.com/profile/peterwalker',
		references: [],
		bio: '<p>Peter Walker is a political correspondent for the Guardian. <br></p><p>He is the author of The Miracle Pill: Why A Sedentary World Is Getting It All Wrong</p>',
		bylineImageUrl:
			'https://static.guim.co.uk/sys-images/Guardian/Pix/contributor/2007/09/28/peter_walker_140x140.jpg',
		firstName: 'Peter',
		lastName: 'Walker',
		twitterHandle: 'peterwalker99',
		r2ContributorId: '19159',
		internalName: 'Peter Walker',
	},
	{
		id: 'profile/ben-doherty',
		type: 0,
		webTitle: 'Ben Doherty',
		webUrl: 'https://www.theguardian.com/profile/ben-doherty',
		apiUrl: 'https://content.guardianapis.com/profile/ben-doherty',
		references: [],
		bio: `<p>Ben Doherty is a reporter for Guardian Australia, and a former foreign correspondent covering south-east Asia. He has won three Walkley awards for his foreign and immigration reporting. Email: ben.doherty@theguardian.com. Click <a href="https://www.theguardian.com/pgp/PublicKeys/Ben%20Doherty.pub.txt">here</a> for Ben's public key</p>`,
		bylineImageUrl: 'https://uploads.guim.co.uk/2020/06/29/Ben_Doherty.png',
		bylineLargeImageUrl:
			'https://uploads.guim.co.uk/2017/11/27/Ben_Doherty_720x600_final.png',
		firstName: 'Ben ',
		lastName: 'Doherty',
		twitterHandle: 'bendohertycorro',
		r2ContributorId: '37536',
		internalName: 'Ben Doherty',
	},
];

const fields = {
	theme: ArticlePillar.News,
	display: ArticleDisplay.Standard,
	body: [],
	headline: headline,
	standfirst: standfirst,
	byline: '',
	bylineHtml: bylineHtml,
	publishDate: some(new Date('2021-10-17T03:24:00')),
	contributors: [],
	mainMedia: mainMedia,
	series: Optional.some({
		id: 'world/series/coronavirus-live',
		type: 2,
		sectionId: 'world',
		sectionName: 'World news',
		webTitle: 'Coronavirus live',
		webUrl: 'https://www.theguardian.com/world/series/coronavirus-live',
		apiUrl: 'https://content.guardianapis.com/world/series/coronavirus-live',
		references: [],
		description: `<p>Follow the Guardian's live coverage of the <a href="https://www.theguardian.com/world/coronavirus-outbreak">coronavirus pandemic</a><br></p>`,
		internalName: 'Coronavirus live (LIVE BLOG ONLY series tag)',
	}),
	commentable: true,
	tags: tags,
	shouldHideReaderRevenue: false,
	branding: some({
		aboutUri:
			'x-gu://item/mobile.guardianapis.com/uk/items/info/2016/jan/25/content-funding',
		altLogo:
			'https://static.theguardian.com/commercial/sponsor/05/May/2020/ca7c95d2-6aef-4710-ac1b-ad539763ed9f-JNI_rgb_rev_180.png',
		brandingType: 'sponsored',
		label: 'Supported by',
		logo: 'https://static.theguardian.com/commercial/sponsor/05/May/2020/2b724f07-add3-4abb-b7a3-b6bbb05a3bd0-JNI_rgb_180.png',
		sponsorName: 'Judith Nielson Institute',
		sponsorUri: 'https://jninstitute.org/',
	}),
	commentCount: some(1223),
	relatedContent: none,
	footballContent: none,
	logo: none,
	webUrl: '',
	edition: Edition.UK,
	promotedNewsletter: none,
	shouldHideAdverts: false,
	outline: [],
};

const pinnedBlock: LiveBlock = {
	id: '5',
	isKeyEvent: false,
	title: Optional.some('Block Five'),
	firstPublished: new Date('2021-11-02T10:20:20Z'),
	lastModified: new Date('2021-11-02T11:13:13Z'),
	body: [],
	contributors: [],
	isPinned: true,
};

const blocks: LiveBlock[] = [
	{
		id: '1',
		isKeyEvent: true,
		title: Optional.some('Block One'),
		firstPublished: new Date('2021-11-02T12:00:00Z'),
		lastModified: new Date('2021-11-02T13:13:13Z'),
		body: [],
		contributors: [
			{
				id: '',
				apiUrl: '',
				name: 'Alex Hern',
				image: some({
					src: 'https://i.guim.co.uk/img/uploads/2021/02/18/Alex_Hern.png?width=64&quality=85&fit=bounds&s=23a43b779a5093807af839a51836919a',
					srcset: 'https://i.guim.co.uk/img/uploads/2021/02/18/Alex_Hern.png?width=64&quality=85&fit=bounds&s=23a43b779a5093807af839a51836919a',
					dpr2Srcset:
						'https://i.guim.co.uk/img/uploads/2021/02/18/Alex_Hern.png?width=64&quality=85&fit=bounds&s=23a43b779a5093807af839a51836919a',
					alt: some('image'),
					width: 36,
					height: 36,
					caption: captionDocFragment,
					credit: none,
					nativeCaption: none,
					role: ArticleElementRole.Standard,
					imageSubtype: Optional.none(),
				}),
			},
		],
		isPinned: false,
	},
	{
		id: '2',
		isKeyEvent: false,
		title: Optional.some('Block Two'),
		firstPublished: new Date('2021-11-02T11:20:00Z'),
		lastModified: new Date('2021-11-02T13:03:13Z'),
		body: [],
		contributors: [],
		isPinned: false,
	},
	{
		id: '3',
		isKeyEvent: true,
		title: Optional.some('Block Three'),
		firstPublished: new Date('2021-11-02T11:05:12Z'),
		lastModified: new Date('2021-11-02T12:13:13Z'),
		body: [],
		contributors: [],
		isPinned: false,
	},
	{
		id: '4',
		isKeyEvent: true,
		title: Optional.some('Block Four'),
		firstPublished: new Date('2021-11-02T10:55:03Z'),
		lastModified: new Date('2021-11-02T11:13:13Z'),
		body: [],
		contributors: [],
		isPinned: false,
	},
	pinnedBlock,
];

const pagedBlocks: LiveBlogPagedBlocks = {
	currentPage: {
		blocks: blocks,
		pageNumber: 1,
		suffix: '',
	},
	pagination: {
		older: none,
		oldest: none,
		newer: none,
		newest: none,
		numberOfPages: 1,
	},
};

const live: LiveBlog = {
	design: ArticleDesign.LiveBlog,
	...fields,
	blocks: blocks,
	pagedBlocks,
	totalBodyBlocks: 5,
};

const deadBlog: DeadBlog = {
	design: ArticleDesign.DeadBlog,
	...fields,
	blocks: blocks,
	pagedBlocks,
	totalBodyBlocks: 5,
};

export { live, deadBlog };
