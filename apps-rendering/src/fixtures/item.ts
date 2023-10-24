// ----- Imports ----- //

import { Edition } from '@guardian/apps-rendering-api-models/edition';
import type { Tag } from '@guardian/content-api-models/v1/tag';
import { TagType } from '@guardian/content-api-models/v1/tagType';
import type { ArticleTheme } from '@guardian/libs';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleElementRole,
	ArticlePillar,
	ArticleSpecial,
} from '@guardian/libs';
import type { Option } from '@guardian/types';
import { OptionKind, none, some } from '@guardian/types';
import type { Body } from 'bodyElement';
import { ElementKind } from 'bodyElement';
import { parse } from 'client/parser';
import type { Contributor } from 'contributor';
import type { MatchScores } from 'football';
import type { Image } from 'image';
import { ImageSubtype } from 'image/image';
import type {
	Analysis,
	Comment,
	Editorial,
	Explainer,
	Feature,
	Gallery,
	Interview,
	Item,
	Letter,
	MatchReport,
	NewsletterSignup,
	Obituary,
	PhotoEssay,
	PrintShop,
	Quiz,
	Recipe,
	Review,
	Standard,
} from 'item';
import type { LiveBlock } from 'liveBlock';
import type { MainMedia } from 'mainMedia';
import { MainMediaKind } from 'mainMedia';
import { Optional } from 'optional';
import { fromBodyElements } from 'outline';
import { galleryBody } from './galleryBody';
import { partialNewsletterItem } from './newsletterSignUpContent';
import { relatedContent } from './relatedContent';

// ----- Functions ----- //

/**
 * Updates the `theme` property of an `Item`
 *
 * @param theme The value to set `theme` to
 * @returns A new `Item` object
 */
const setTheme =
	(theme: ArticleTheme) =>
	<A extends Item>(item: A): A => ({ ...item, theme });

/**
 * Updates the `edition` property of an `Item`
 *
 * @param edition The value to set `edition` to
 * @returns A new `Item` object
 */
const setEdition =
	(edition: Edition) =>
	<A extends Item>(item: A): A => ({ ...item, edition });

// ----- Fixture ----- //

const parser = new DOMParser();
const parseHtml = (html: string): Optional<DocumentFragment> =>
	parse(parser)(html).toOptional();

const headline =
	'Reclaimed lakes and giant airports: how Mexico City might have looked';

const standfirst = parseHtml(
	'<p>The Mexican capital was founded by Aztecs on an island in a vast lake. No wonder water flows through so many of its unbuilt projects</p>',
);

const standfirstWithLink = parseHtml(
	'<p>Boris Johnson’s spokesperson says ‘it’s deeply regrettable that this took place at a time of national mourning’</p><ul><li><a href="https://www.theguardian.com/world/series/coronavirus-live/latest">Coronavirus – latest updates</a></li><li><a href="https://www.theguardian.com/world/coronavirus-outbreak">See all our coronavirus coverage</a></li></ul>',
);

const bylineHtml = parseHtml(
	'<a href="https://theguardian.com">Jane Smith</a> Editor of things',
).toOption();

const bylineHtmlNoJobTitle = parseHtml(
	'<a href="https://theguardian.com">Jane Smith</a>',
).toOption();

// const bylineMultipleAuthorsHtml = parseHtml(
// 	'<a href="https://theguardian.com">Tom Ambrose</a> (now); <a href="https://theguardian.com">Tom Ambrose</a> and <a href="https://theguardian.com">Tom Ambrose</a> (earlier)',
// ).toOption();

const captionDocFragment = parseHtml(
	'<em>Jane Smith</em> Editor of things',
).toOption();

const docFixture = (): Node => {
	const doc = new DocumentFragment();

	const el = document.createElement('p');

	el.innerHTML =
		'Readers of Prospect magazine recently voted him the world’s fourth-best thinker. And right now he is <a href="https://www.theguardian.com">thinking</a> about 3 November, and whether the United States will reject or endorse Donald Trump. No one knows what will happen; not even West, not least because in the US he sees contradictions that even he can’t fully explain.';

	doc.appendChild(el);

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- this value is not `null`
	return doc.firstChild!;
};

const elementFixture = (element: string, innerText: string): Node => {
	const doc = new DocumentFragment();

	const el = document.createElement(element);

	el.innerText = innerText;

	doc.appendChild(el);

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- this value is not `null`
	return doc.firstChild!;
};

const h2ElementWithSub = (): Node => {
	const doc = new DocumentFragment();

	const el = document.createElement('H2');
	const sub = document.createElement('SUB');
	sub.innerText = 'student';

	const el2 = document.createTextNode('loan forgiveness? ');

	el.innerText = ' Who qualifies for ';
	el.appendChild(sub);
	el.appendChild(el2);

	doc.appendChild(el);

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- this value is not `null`
	return doc.firstChild!;
};

const srcset =
	'https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=32&quality=85&fit=bounds&s=100fc280274e40946afb34d4b561ce9f 32w, https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=64&quality=85&fit=bounds&s=b6b6831a7a599a815002b8a4c041342e 64w, https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=128&quality=85&fit=bounds&s=35b6ce614cae19fbdcdefa55a670eda5 128w, https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=192&quality=85&fit=bounds&s=930a05d87b62a1f613ff76f3ee0c97a0 192w, https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=256&quality=85&fit=bounds&s=8c44b90de342114bd3bf6145767d4b31 256w, https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=400&quality=85&fit=bounds&s=8491504dfb944eee7ef173e739cb4f74 400w, https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=600&quality=85&fit=bounds&s=668fc2d7278f6c4a553f806c9b2d47d3 600w';

const image: Image = {
	src: 'https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=64&quality=85&fit=bounds&s=b6b6831a7a599a815002b8a4c041342e',
	srcset: srcset,
	dpr2Srcset: srcset,
	alt: some('image'),
	width: 550,
	height: 550,
	role: ArticleElementRole.Standard,
	caption: none,
	nativeCaption: none,
	credit: none,
	imageSubtype: Optional.some(ImageSubtype.Png),
};

const contributors: Contributor[] = [
	{
		id: 'profile/hannah-j-davies',
		apiUrl: 'https://content.guardianapis.com/profile/hannah-j-davies',
		name: 'Hannah J Davies',
		image: some(image),
	},
];

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

const doc = docFixture();

const body: Body = [
	{
		kind: ElementKind.Text,
		doc,
	},
	{
		kind: ElementKind.HeadingTwo,
		id: Optional.some('who-qualifies-for-student-loan-forgiveness'),
		doc: h2ElementWithSub(),
	},
	{
		kind: ElementKind.Image,
		src: 'https://i.guim.co.uk/img/media/8cbb56d2c2df876a9f3255bf99da6034eaac9fa8/0_307_2000_2500/master/2000.jpg?width=500&quality=85&fit=bounds&s=8c34202360927c9ececb6f241c57859d',
		srcset: 'https://i.guim.co.uk/img/media/8cbb56d2c2df876a9f3255bf99da6034eaac9fa8/0_307_2000_2500/master/2000.jpg?width=140&quality=85&fit=bounds&s=978ea68731deea77a6ec549b36f5e32b 140w, https://i.guim.co.uk/img/media/8cbb56d2c2df876a9f3255bf99da6034eaac9fa8/0_307_2000_2500/master/2000.jpg?width=500&quality=85&fit=bounds&s=8c34202360927c9ececb6f241c57859d 500w, https://i.guim.co.uk/img/media/8cbb56d2c2df876a9f3255bf99da6034eaac9fa8/0_307_2000_2500/master/2000.jpg?width=1000&quality=85&fit=bounds&s=8d92ccc42745c327145fa3bcd7aea0c1 1000w, https://i.guim.co.uk/img/media/8cbb56d2c2df876a9f3255bf99da6034eaac9fa8/0_307_2000_2500/master/2000.jpg?width=1500&quality=85&fit=bounds&s=f677266ce93d0c51eb6a7a5c0162ed89 1500w, https://i.guim.co.uk/img/media/8cbb56d2c2df876a9f3255bf99da6034eaac9fa8/0_307_2000_2500/master/2000.jpg?width=2000&quality=85&fit=bounds&s=90415465f0f60ef29d5067933e7df697 2000w',
		dpr2Srcset:
			'https://i.guim.co.uk/img/media/8cbb56d2c2df876a9f3255bf99da6034eaac9fa8/0_307_2000_2500/master/2000.jpg?width=140&quality=45&fit=bounds&s=498eae817a853dc03b77fc3fb3508d67 140w, https://i.guim.co.uk/img/media/8cbb56d2c2df876a9f3255bf99da6034eaac9fa8/0_307_2000_2500/master/2000.jpg?width=500&quality=45&fit=bounds&s=005b16c339d71fe13ef0946afbc6923d 500w, https://i.guim.co.uk/img/media/8cbb56d2c2df876a9f3255bf99da6034eaac9fa8/0_307_2000_2500/master/2000.jpg?width=1000&quality=45&fit=bounds&s=d49f1edee81d825f0d5402b45f228314 1000w, https://i.guim.co.uk/img/media/8cbb56d2c2df876a9f3255bf99da6034eaac9fa8/0_307_2000_2500/master/2000.jpg?width=1500&quality=45&fit=bounds&s=ed564fd8a52304188fdc419a0838ed0f 1500w, https://i.guim.co.uk/img/media/8cbb56d2c2df876a9f3255bf99da6034eaac9fa8/0_307_2000_2500/master/2000.jpg?width=2000&quality=45&fit=bounds&s=53c0fa1df2ec23b439c488d3801778e3 2000w',
		alt: {
			kind: OptionKind.Some,
			value: 'Jane Giddins outside her home in Newton St Loe',
		},
		width: 2000,
		height: 2500,
		caption: none,
		credit: {
			kind: OptionKind.Some,
			value: 'Photograph: Sam Frost/The Guardian',
		},
		nativeCaption: {
			kind: OptionKind.Some,
			value: 'Jane Giddins outside her home in Newton St Loe, Somerset. She is denied the legal right to buy the freehold because of an exemption granted to Prince Charles.',
		},
		role: ArticleElementRole.Standard,
		imageSubtype: Optional.some(ImageSubtype.Jpeg),
	},
	{
		kind: ElementKind.SpecialReportAltAtom,
	},
	{
		kind: ElementKind.Text,
		doc,
	},
	{
		kind: ElementKind.HeadingTwo,
		id: Optional.some('how-the-student-debt-crisis-started'),
		doc: elementFixture('h2', 'How the student debt crisis started?'),
	},
	{
		kind: ElementKind.Text,
		doc,
	},
	{
		kind: ElementKind.GuideAtom,
		html: "<p>Queen's consent is a little-known procedure whereby the government asks the monarch's permission for parliament to be able to debate laws that affect her. Unlike royal assent, which is a formality that takes place at the end of the process of drafting a bill, Queen's consent takes place before parliament is permitted to debate the legislation.</p><p>Consent has to be sought for any legislation affecting either the royal prerogative – fundamental powers of state, such as the ability to declare war – or the assets of the crown, such as the royal palaces. Buckingham Palace says the procedure also covers assets that the monarch owns privately, such as the estates of Sandringham and Balmoral.</p><p>If parliamentary lawyers decide that a bill requires consent, a government minister writes to the Queen formally requesting her permission for parliament to debate it. A copy of the bill is sent to the Queen's private lawyers, who have 14 days to consider it and to advise her.</p><p>If the Queen grants her consent, parliament can debate the legislation and the process is formally signified in Hansard, the record of parliamentary debates. If the Queen withholds consent, the bill cannot proceed and parliament is in effect banned from debating it.&nbsp,</p><p>The royal household claims consent has only ever been withheld on the advice of government ministers.</p>",
		title: "What is Queen's consent?",
		id: '575888ee-9973-4256-9a96-bad4b9c65d81',
		image: undefined,
		credit: undefined,
	},
	{
		kind: ElementKind.Text,
		doc,
	},
	{
		kind: ElementKind.HeadingTwo,
		id: Optional.some('what-student-debt-looks-like-today'),
		doc: elementFixture('h2', 'What student debt looks like today?'),
	},
	{
		kind: ElementKind.Text,
		doc,
	},
	{
		kind: ElementKind.Pullquote,
		quote: 'Why should the crown be allowed to carry on with a feudal system just because they want to?',
		attribution: { kind: 0, value: 'Jane Giddins' },
	},
	{
		kind: ElementKind.Text,
		doc,
	},
	{
		kind: ElementKind.Text,
		doc,
	},
];

const pinnedBlock: LiveBlock = {
	id: '5',
	isKeyEvent: false,
	title: Optional.some('Block Five'),
	firstPublished: new Date('2021-11-02T10:20:20Z'),
	lastModified: new Date('2021-11-02T11:13:13Z'),
	body: [
		{
			kind: ElementKind.Text,
			doc,
		},
	],
	contributors: [],
	isPinned: true,
};

const matchScores: MatchScores = {
	league: 'Premier League',
	stadium: 'The King Power Stadium',
	status: { kind: 4 },
	homeTeam: {
		id: '29',
		name: 'Leicester',
		shortCode: 'LEI',
		crestUri:
			'https://i.guim.co.uk/img/sport/football/crests/29.png?w=#{width}&h=#{height}&q=#{quality}&fit=bounds&sig-ignores-params=true&s=39ec5ce46e761b69ac55204fa6c0999a',
		score: 2,
		scorers: [
			{ player: 'Castagne', timeInMinutes: 50 },
			{ player: 'Iheanacho', timeInMinutes: 80 },
		],
	},
	awayTeam: {
		id: '5',
		name: 'Crystal Palace',
		shortCode: 'CRY',
		crestUri:
			'https://i.guim.co.uk/img/sport/football/crests/5.png?w=#{width}&h=#{height}&q=#{quality}&fit=bounds&sig-ignores-params=true&s=7fd29a0f99425f2f4b0c40165b4ed23b',
		score: 1,
		scorers: [{ player: 'Zaha', timeInMinutes: 12 }],
	},
};

const tags: Tag[] = [
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
		id: 'world/refugees',
		type: TagType.SERIES,
		webTitle: 'Refugees',
		webUrl: 'https://www.theguardian.com/world/refugees',
		apiUrl: 'https://content.guardianapis.com/world/refugees',
		references: [],
	},
	{
		id: 'uk/immigration',
		type: TagType.KEYWORD,
		webTitle: 'Immigration and asylum',
		webUrl: 'https://www.theguardian.com/uk/immigration',
		apiUrl: 'https://content.guardianapis.com/uk/immigration',
		references: [],
	},
	{
		id: 'uk/uk',
		type: TagType.KEYWORD,
		webTitle: 'UK news',
		webUrl: 'https://www.theguardian.com/uk/uk',
		apiUrl: 'https://content.guardianapis.com/uk/uk',
		references: [],
	},
	{
		id: 'world/world',
		type: TagType.KEYWORD,
		webTitle: 'World news',
		webUrl: 'https://www.theguardian.com/world/world',
		apiUrl: 'https://content.guardianapis.com/world/world',
		references: [],
	},
	{
		id: 'society/youngpeople',
		type: TagType.KEYWORD,
		webTitle: 'Young people',
		webUrl: 'https://www.theguardian.com/society/youngpeople',
		apiUrl: 'https://content.guardianapis.com/society/youngpeople"',
		references: [],
	},
	{
		id: 'profile/lukeharding',
		type: TagType.CONTRIBUTOR,
		webTitle: 'Luke Harding',
		webUrl: 'https://www.theguardian.com/profile/lukeharding',
		apiUrl: 'https://content.guardianapis.com/profile/lukeharding',
		references: [],
	},
	{
		id: 'tracking/commissioningdesk/saturday-magazine',
		type: TagType.TRACKING,
		webTitle: 'Saturday Magazine',
		webUrl: 'https://www.theguardian.com/tracking/commissioningdesk/saturday-magazine',
		apiUrl: 'https://content.guardianapis.com/tracking/commissioningdesk/saturday-magazine',
		references: [],
	},
];

const fields = {
	theme: ArticlePillar.News,
	display: ArticleDisplay.Standard,
	body: body,
	headline: headline,
	standfirst: standfirst,
	byline: '',
	bylineHtml: bylineHtml,
	publishDate: some(new Date('2021-10-17T03:24:00Z')),
	contributors: contributors,
	mainMedia: mainMedia,
	series: Optional.some({
		id: 'travel/series/readers-coronavirus-travel-questions',
		type: 2,
		sectionId: 'travel',
		sectionName: 'Travel',
		webTitle: 'Coronavirus travel Q&A',
		webUrl: 'https://www.theguardian.com/travel/series/readers-coronavirus-travel-questions',
		apiUrl: 'https://content.guardianapis.com/travel/series/readers-coronavirus-travel-questions',
		references: [],
		description:
			"<p>A weekly series answering readers' questions&nbsp;about how the coronavirus outbreak is impacting on their travel plans and holidays</p>",
		internalName: 'Coronavirus travel Q&A',
	}),
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
	commentable: true,
	commentCount: some(123),
	relatedContent: relatedContent,
	footballContent: none,
	logo: none,
	webUrl: '',
	promotedNewsletter: none,
	edition: Edition.UK,
	shouldHideAdverts: false,
	outline: [],
};

const noCommentFields = {
	commentable: false,
	commentCount: none,
};

const article: Standard = {
	design: ArticleDesign.Standard,
	...fields,
};

const articleNoComments: Standard = {
	design: ArticleDesign.Standard,
	...fields,
	...noCommentFields,
};

const articleNoJobTitle: Standard = {
	design: ArticleDesign.Standard,
	...fields,
	...{ bylineHtml: bylineHtmlNoJobTitle },
};

const articleWithStandfirstLink: Item = {
	design: ArticleDesign.Standard,
	...fields,
	standfirst: standfirstWithLink,
};

const analysis: Analysis = {
	design: ArticleDesign.Analysis,
	...fields,
	outline: fromBodyElements(fields.body),
};

const feature: Feature = {
	design: ArticleDesign.Feature,
	...fields,
};

const review: Review = {
	design: ArticleDesign.Review,
	starRating: some(4),
	...fields,
	theme: ArticlePillar.Culture,
};

const labs: Item = {
	design: ArticleDesign.Standard,
	...fields,
	theme: ArticleSpecial.Labs,
};

const comment: Comment = {
	design: ArticleDesign.Comment,
	...fields,
	theme: ArticlePillar.Opinion,
	outline: fromBodyElements(fields.body),
};
const commentWithCommentCount: Comment = {
	design: ArticleDesign.Comment,
	...fields,
	theme: ArticlePillar.Opinion,
	outline: fromBodyElements(fields.body),
};

const letter: Letter = {
	design: ArticleDesign.Letter,
	...fields,
	theme: ArticlePillar.Opinion,
};

const editorial: Editorial = {
	design: ArticleDesign.Editorial,
	...fields,
	theme: ArticlePillar.Opinion,
};

const interview: Interview = {
	design: ArticleDesign.Interview,
	...fields,
};

const media: Item = {
	design: ArticleDesign.Gallery,
	...fields,
	body: galleryBody,
};

const cartoon: Item = {
	design: ArticleDesign.Picture,
	...fields,
	body: [],
};

const matchReport: MatchReport = {
	design: ArticleDesign.MatchReport,
	football: Optional.some(matchScores),
	...fields,
	theme: ArticlePillar.Sport,
	body: galleryBody,
};

const correction: Item = {
	design: ArticleDesign.Correction,
	...fields,
};

const printShop: PrintShop = {
	design: ArticleDesign.PrintShop,
	...fields,
};

const photoEssay: PhotoEssay = {
	design: ArticleDesign.PhotoEssay,
	...fields,
};

const recipe: Recipe = {
	design: ArticleDesign.Recipe,
	...fields,
	theme: ArticlePillar.Lifestyle,
};

const quiz: Quiz = {
	design: ArticleDesign.Quiz,
	...fields,
	theme: ArticlePillar.Sport,
};

const explainer: Explainer = {
	design: ArticleDesign.Explainer,
	...fields,
	outline: fromBodyElements(fields.body),
};

const obituary: Obituary = {
	design: ArticleDesign.Obituary,
	...fields,
};

const newsletterSignUp: NewsletterSignup = {
	...fields,
	design: ArticleDesign.NewsletterSignup,
	...partialNewsletterItem,
};

const standardImmersive: Standard = {
	design: ArticleDesign.Standard,
	...fields,
	display: ArticleDisplay.Immersive,
	outline: fromBodyElements(fields.body),
};

const commentImmersive: Comment = {
	design: ArticleDesign.Comment,
	...fields,
	display: ArticleDisplay.Immersive,
	theme: ArticlePillar.Opinion,
};

const gallery: Gallery = {
	design: ArticleDesign.Gallery,
	...fields,
	body: body.filter((element) => element.kind === ElementKind.Image),
};

// ----- Exports ----- //

export {
	analysis,
	article,
	articleNoComments,
	articleNoJobTitle,
	articleWithStandfirstLink,
	cartoon,
	comment,
	commentImmersive,
	commentWithCommentCount,
	correction,
	editorial,
	explainer,
	feature,
	gallery,
	interview,
	labs,
	letter,
	matchReport,
	media,
	newsletterSignUp,
	obituary,
	parseHtml,
	photoEssay,
	pinnedBlock,
	printShop,
	quiz,
	recipe,
	review,
	setEdition,
	setTheme,
	standardImmersive,
};
