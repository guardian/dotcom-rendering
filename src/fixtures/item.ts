// ----- Imports ----- //

import {
	Design,
	Display,
	none,
	OptionKind,
	Pillar,
	ResultKind,
	Role,
	some,
	Special,
	toOption,
} from '@guardian/types';
import type { Option } from '@guardian/types';
import type { Body } from 'bodyElement';
import { ElementKind } from 'bodyElement';
import { parse } from 'client/parser';
import type { Contributor } from 'contributor';
import type { MainMedia } from 'headerMedia';
import { MainMediaKind } from 'headerMedia';
import type { Image } from 'image';
import type { Item, Review } from 'item';
import { pipe2 } from 'lib';
import { galleryBody } from './galleryBody';

// ----- Fixture ----- //

const parser = new DOMParser();
const parseHtml = parse(parser);

const headline =
	'Reclaimed lakes and giant airports: how Mexico City might have looked';

const standfirst: Option<DocumentFragment> = pipe2(
	'<p>The Mexican capital was founded by Aztecs on an island in a vast lake. No wonder water flows through so many of its unbuilt projects</p>',
	parseHtml,
	toOption,
);

const bylineHtml: Option<DocumentFragment> = pipe2(
	'<a href="https://theguardian.com">Jane Smith</a> Editor of things',
	parseHtml,
	toOption,
);

const docFixture = (): DocumentFragment => {
	const doc = new DocumentFragment();

	const el = document.createElement('p');

	el.innerText =
		'Readers of Prospect magazine recently voted him the world’s fourth-best thinker. And right now he is thinking about 3 November, and whether the United States will reject or endorse Donald Trump. No one knows what will happen; not even West, not least because in the US he sees contradictions that even he can’t fully explain.';

	doc.appendChild(el);

	return doc;
};

const srcset =
	'https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=32&quality=85&fit=bounds&s=100fc280274e40946afb34d4b561ce9f 32w, https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=64&quality=85&fit=bounds&s=b6b6831a7a599a815002b8a4c041342e 64w, https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=128&quality=85&fit=bounds&s=35b6ce614cae19fbdcdefa55a670eda5 128w, https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=192&quality=85&fit=bounds&s=930a05d87b62a1f613ff76f3ee0c97a0 192w, https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=256&quality=85&fit=bounds&s=8c44b90de342114bd3bf6145767d4b31 256w, https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=400&quality=85&fit=bounds&s=8491504dfb944eee7ef173e739cb4f74 400w, https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=600&quality=85&fit=bounds&s=668fc2d7278f6c4a553f806c9b2d47d3 600w';

const image: Image = {
	src:
		'https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=64&quality=85&fit=bounds&s=b6b6831a7a599a815002b8a4c041342e',
	srcset: srcset,
	dpr2Srcset: srcset,
	alt: some('image'),
	width: 550,
	height: 550,
	role: Role.Standard,
	caption: none,
	nativeCaption: none,
	credit: none,
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
			src:
				'https://i.guim.co.uk/img/media/305593466a8bbd045d233b207b368a5dbcfd08f4/0_101_3000_1800/master/3000.jpg?width=500&quality=85&fit=bounds&s=6d0b66dcc9233754f89c07e74c44158f',
			srcset:
				'https://i.guim.co.uk/img/media/305593466a8bbd045d233b207b368a5dbcfd08f4/0_101_3000_1800/master/3000.jpg?width=140&quality=85&fit=bounds&s=d0c466d24ac750ce4b1c9fe8a40fbdd3 140w, https://i.guim.co.uk/img/media/305593466a8bbd045d233b207b368a5dbcfd08f4/0_101_3000_1800/master/3000.jpg?width=500&quality=85&fit=bounds&s=6d0b66dcc9233754f89c07e74c44158f 500w, https://i.guim.co.uk/img/media/305593466a8bbd045d233b207b368a5dbcfd08f4/0_101_3000_1800/master/3000.jpg?width=1000&quality=85&fit=bounds&s=8f38bcd742d1ae10a3f01508e31c7f5f 1000w, https://i.guim.co.uk/img/media/305593466a8bbd045d233b207b368a5dbcfd08f4/0_101_3000_1800/master/3000.jpg?width=1500&quality=85&fit=bounds&s=45e33e51a33abe2b327882eb9de69d04 1500w, https://i.guim.co.uk/img/media/305593466a8bbd045d233b207b368a5dbcfd08f4/0_101_3000_1800/master/3000.jpg?width=2000&quality=85&fit=bounds&s=5bc078a6facde21b41d2c649ac36e01b 2000w',
			dpr2Srcset:
				'https://i.guim.co.uk/img/media/305593466a8bbd045d233b207b368a5dbcfd08f4/0_101_3000_1800/master/3000.jpg?width=140&quality=45&fit=bounds&s=5b4d13a66861d58dff15b371d11043ae 140w, https://i.guim.co.uk/img/media/305593466a8bbd045d233b207b368a5dbcfd08f4/0_101_3000_1800/master/3000.jpg?width=500&quality=45&fit=bounds&s=e043c3329b11500e9b907ac2c93275ff 500w, https://i.guim.co.uk/img/media/305593466a8bbd045d233b207b368a5dbcfd08f4/0_101_3000_1800/master/3000.jpg?width=1000&quality=45&fit=bounds&s=bb69b200c27229f685132af3eddd10b3 1000w, https://i.guim.co.uk/img/media/305593466a8bbd045d233b207b368a5dbcfd08f4/0_101_3000_1800/master/3000.jpg?width=1500&quality=45&fit=bounds&s=5ea519b33cadfdca59a7d7b1ce570631 1500w, https://i.guim.co.uk/img/media/305593466a8bbd045d233b207b368a5dbcfd08f4/0_101_3000_1800/master/3000.jpg?width=2000&quality=45&fit=bounds&s=fe2810561ff271c2a97583ca67cd97e8 2000w',
			alt: some('image'),
			width: 3000,
			height: 1800,
			caption: none,
			credit: {
				kind: OptionKind.Some,
				value: 'Photograph: Philip Keith/The Guardian',
			},
			nativeCaption: {
				kind: OptionKind.Some,
				value:
					'‘They could kill me any day; that’s all right with me. I am going down swinging, brother’ … West.',
			},
			role: Role.Standard,
		},
	},
};

const doc = docFixture();

const body: Body = [
	{
		kind: ResultKind.Ok,
		value: {
			kind: ElementKind.Text,
			doc,
		},
	},
	{
		kind: ResultKind.Ok,
		value: {
			kind: ElementKind.Image,
			src:
				'https://i.guim.co.uk/img/media/8cbb56d2c2df876a9f3255bf99da6034eaac9fa8/0_307_2000_2500/master/2000.jpg?width=500&quality=85&fit=bounds&s=8c34202360927c9ececb6f241c57859d',
			srcset:
				'https://i.guim.co.uk/img/media/8cbb56d2c2df876a9f3255bf99da6034eaac9fa8/0_307_2000_2500/master/2000.jpg?width=140&quality=85&fit=bounds&s=978ea68731deea77a6ec549b36f5e32b 140w, https://i.guim.co.uk/img/media/8cbb56d2c2df876a9f3255bf99da6034eaac9fa8/0_307_2000_2500/master/2000.jpg?width=500&quality=85&fit=bounds&s=8c34202360927c9ececb6f241c57859d 500w, https://i.guim.co.uk/img/media/8cbb56d2c2df876a9f3255bf99da6034eaac9fa8/0_307_2000_2500/master/2000.jpg?width=1000&quality=85&fit=bounds&s=8d92ccc42745c327145fa3bcd7aea0c1 1000w, https://i.guim.co.uk/img/media/8cbb56d2c2df876a9f3255bf99da6034eaac9fa8/0_307_2000_2500/master/2000.jpg?width=1500&quality=85&fit=bounds&s=f677266ce93d0c51eb6a7a5c0162ed89 1500w, https://i.guim.co.uk/img/media/8cbb56d2c2df876a9f3255bf99da6034eaac9fa8/0_307_2000_2500/master/2000.jpg?width=2000&quality=85&fit=bounds&s=90415465f0f60ef29d5067933e7df697 2000w',
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
				value:
					'Jane Giddins outside her home in Newton St Loe, Somerset. She is denied the legal right to buy the freehold because of an exemption granted to Prince Charles.',
			},
			role: Role.Standard,
		},
	},
	{
		kind: ResultKind.Ok,
		value: {
			kind: ElementKind.Text,
			doc,
		},
	},
	{
		kind: ResultKind.Ok,
		value: {
			kind: ElementKind.Text,
			doc,
		},
	},
	{
		kind: ResultKind.Ok,
		value: {
			kind: ElementKind.GuideAtom,
			html:
				"<p>Queen's consent is a little-known procedure whereby the government asks the monarch's permission for parliament to be able to debate laws that affect her. Unlike royal assent, which is a formality that takes place at the end of the process of drafting a bill, Queen's consent takes place before parliament is permitted to debate the legislation.</p><p>Consent has to be sought for any legislation affecting either the royal prerogative – fundamental powers of state, such as the ability to declare war – or the assets of the crown, such as the royal palaces. Buckingham Palace says the procedure also covers assets that the monarch owns privately, such as the estates of Sandringham and Balmoral.</p><p>If parliamentary lawyers decide that a bill requires consent, a government minister writes to the Queen formally requesting her permission for parliament to debate it. A copy of the bill is sent to the Queen's private lawyers, who have 14 days to consider it and to advise her.</p><p>If the Queen grants her consent, parliament can debate the legislation and the process is formally signified in Hansard, the record of parliamentary debates. If the Queen withholds consent, the bill cannot proceed and parliament is in effect banned from debating it.&nbsp,</p><p>The royal household claims consent has only ever been withheld on the advice of government ministers.</p>",
			title: "What is Queen's consent?",
			id: '575888ee-9973-4256-9a96-bad4b9c65d81',
			image: undefined,
			credit: undefined,
		},
	},
	{
		kind: ResultKind.Ok,
		value: {
			kind: ElementKind.Text,
			doc,
		},
	},
	{
		kind: ResultKind.Ok,
		value: {
			kind: ElementKind.Text,
			doc,
		},
	},
	{
		kind: ResultKind.Ok,
		value: {
			kind: ElementKind.Pullquote,
			quote:
				'Why should the crown be allowed to carry on with a feudal system just because they want to?',
			attribution: { kind: 0, value: 'Jane Giddins' },
		},
	},
	{
		kind: ResultKind.Ok,
		value: {
			kind: ElementKind.Text,
			doc,
		},
	},
	{
		kind: ResultKind.Ok,
		value: {
			kind: ElementKind.Text,
			doc,
		},
	},
];

const fields = {
	theme: Pillar.News,
	display: Display.Standard,
	body: body,
	headline: headline,
	standfirst: standfirst,
	byline: '',
	bylineHtml: bylineHtml,
	publishDate: none,
	contributors: contributors,
	mainMedia: mainMedia,
	series: some({
		id: '',
		type: 0,
		webTitle: '',
		webUrl: '',
		apiUrl: '',
		references: [],
	}),
	commentable: false,
	tags: [],
	shouldHideReaderRevenue: false,
	branding: none,
	internalShortId: none,
	commentCount: none,
	relatedContent: none,
	footballContent: none,
	logo: none,
};

const article: Item = {
	design: Design.Article,
	...fields,
};

const analysis: Item = {
	design: Design.Analysis,
	...fields,
};

const feature: Item = {
	design: Design.Feature,
	...fields,
};

const review: Review = {
	design: Design.Review,
	starRating: 4,
	...fields,
};

const labs: Item = {
	design: Design.Article,
	...fields,
	theme: Special.Labs,
};

const comment: Item = {
	design: Design.Comment,
	...fields,
};

const letter: Item = {
	design: Design.Letter,
	...fields,
};

const editorial: Item = {
	design: Design.Editorial,
	...fields,
};

const interview: Item = {
	design: Design.Interview,
	...fields,
};

const media: Item = {
	design: Design.Media,
	...fields,
	body: galleryBody,
};

// ----- Exports ----- //

export {
	article,
	analysis,
	feature,
	review,
	labs,
	comment,
	interview,
	media,
	editorial,
	letter,
};
