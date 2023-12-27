/**
 * @jest-environment jsdom
 */

import {
	renderStandfirstText,
	renderText,
	transformHref,
	shouldShowDropCap,
} from 'renderer';
import { JSDOM } from 'jsdom';
import { ArticlePillar } from '@guardian/libs';
import { isValidElement, ReactNode } from 'react';
import { compose } from 'lib';
import { BodyElement, ElementKind } from 'bodyElement';
import { none, some } from '../vendor/@guardian/types/index';
import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import { renderToStaticMarkup } from 'react-dom/server';
import { EmbedKind } from 'embed';
import { EmbedTracksType } from '@guardian/content-api-models/v1/embedTracksType';
import { ArticleElementRole } from '@guardian/libs';
import {
	mockFormat,
	mockRenderEditions,
	mockRenderElement,
	renderTextElement,
	mockRenderWithoutStyles,
	textElements,
} from 'testsHelper';
import { Optional } from 'optional';
import { ImageSubtype } from 'image/image';

beforeEach(() => {
	console.error = jest.fn();
});

const imageElement = (): BodyElement => ({
	kind: ElementKind.Image,
	src: 'https://theguardian.com/image.jpg',
	srcset: '',
	dpr2Srcset: '',
	alt: some('alt tag'),
	caption: some(JSDOM.fragment('this caption contains <em>html</em>')),
	nativeCaption: some('caption'),
	credit: some('credit'),
	width: 500,
	height: 500,
	role: ArticleElementRole.Standard,
	imageSubtype: Optional.some(ImageSubtype.Jpeg),
});

const imageElementWithRole = () => ({
	...imageElement(),
});

const pullquoteElement = (): BodyElement => ({
	kind: ElementKind.Pullquote,
	quote: 'quote',
	attribution: none,
});

const pullquoteWithAttributionElement = (): BodyElement => ({
	kind: ElementKind.Pullquote,
	quote: 'quote',
	attribution: some('attribution'),
});

const richLinkElement = (): BodyElement => ({
	kind: ElementKind.RichLink,
	url: 'https://theguardian.com',
	linkText: 'this links to a related article',
});

const interactiveElement = (): BodyElement => ({
	kind: ElementKind.Interactive,
	url: 'https://theguardian.com',
	alt: none,
});

const tweetElement = (): BodyElement => ({
	kind: ElementKind.Tweet,
	content: JSDOM.fragment('<span>Tweet contents<span>').querySelectorAll(
		'span',
	),
});

const instagramElement = (): BodyElement => ({
	kind: ElementKind.Embed,
	embed: {
		kind: EmbedKind.Instagram,
		id: 'embedId',
		caption: some('<blockquote>Instagram</blockquote>'),
		tracking: EmbedTracksType.DOES_NOT_TRACK,
	},
});

const embedElement: BodyElement = {
	kind: ElementKind.Embed,
	embed: {
		kind: EmbedKind.Generic,
		html: '<section>Embed</section>',
		height: 300,
		alt: none,
		mandatory: false,
		source: some('mockSource'),
		sourceDomain: some('mockSourceDomain'),
		tracking: EmbedTracksType.DOES_NOT_TRACK,
	},
};

const videoElement: BodyElement = {
	kind: ElementKind.Embed,
	embed: {
		kind: EmbedKind.YouTube,
		id: 'mockYoutubeId',
		height: 300,
		width: 500,
		tracking: EmbedTracksType.DOES_NOT_TRACK,
	},
};

const audioElement: BodyElement = {
	kind: ElementKind.Embed,
	embed: {
		kind: EmbedKind.Spotify,
		src: 'https://www.spotify.com/',
		height: 300,
		width: 500,
		tracking: EmbedTracksType.DOES_NOT_TRACK,
	},
};

const liveEventElement = (): BodyElement => ({
	kind: ElementKind.LiveEvent,
	linkText: 'this links to a live event',
	url: 'https://theguardian.com',
});

const atomElement = (): BodyElement => ({
	kind: ElementKind.InteractiveAtom,
	css: 'main { background: yellow; }',
	html: '<main>Some content</main>',
	js: some("console.log('init')"),
});

const explainerElement = (): BodyElement => ({
	kind: ElementKind.ExplainerAtom,
	html: '<main>Explainer content</main>',
	title: 'this is an explainer atom',
	id: '',
});

const guideElement = (): BodyElement => ({
	kind: ElementKind.GuideAtom,
	html: '<main>Guide content</main>',
	title: 'this is a guide atom',
	id: '',
});

const qandaElement = (): BodyElement => ({
	kind: ElementKind.QandaAtom,
	html: '<main>QandA content</main>',
	title: 'this is a qanda atom',
	id: '',
});

const profileElement = (): BodyElement => ({
	kind: ElementKind.ProfileAtom,
	html: '<main>Profile content</main>',
	title: 'this is a profile atom',
	id: '',
});

const timelineElement = (): BodyElement => ({
	kind: ElementKind.TimelineAtom,
	title: 'this is a timeline atom',
	id: '',
	events: [
		{
			title: ' ',
			date: '1 May 2019',
			body: '<p><a href="https://www.theguardian.com/media/2019/may/01/julian-assange-jailed-for-50-weeks-for-breaching-bail-in-2012">He is jailed for 50 weeks</a>&nbsp;in the UK for breaching his bail conditions back in 2012. An apology letter from Assange is read out in court, but the judge rules that he had engaged in a \'deliberate attempt to evade justice\'. On the following day <a href="https://www.theguardian.com/media/2019/may/02/us-begins-extradition-case-against-julian-assange-in-london">the US extradition proceedings were formally started</a>.&nbsp;</p>',
			unixDate: 1556732925,
		},
		{
			title: ' ',
			date: '13 May 2019',
			body: '<p>Swedish prosecutors announce they are <a href="https://www.theguardian.com/media/2019/may/13/sweden-reopens-case-against-julian-assange">reopening an investigation into a rape allegation</a> against Julian Assange.</p><p><br></p>',
			unixDate: 1557769725,
		},
	],
});

const chartElement = (): BodyElement => ({
	kind: ElementKind.ChartAtom,
	html: '<main>Chart content</main>',
	title: 'this is a chart atom',
	id: '',
	css: [],
	js: [],
});

const knowledgeQuizAtom = (): BodyElement => ({
	kind: ElementKind.KnowledgeQuizAtom,
	id: '',
	questions: [],
	resultGroups: [],
});

const audioAtom = (): BodyElement => ({
	kind: ElementKind.AudioAtom,
	title: 'title',
	id: '',
	trackUrl: 'trackUrl',
	kicker: 'kicker',
});

const renderTextElementWithoutStyles = compose(
	mockRenderWithoutStyles,
	textElements,
);

const renderCaptionElement = compose(mockRenderElement, imageElement);

const getHtml = (node: ReactNode): string =>
	isValidElement(node) ? renderToStaticMarkup(node) : '';

describe('renderer returns expected content', () => {
	test('Renders supported node types for text elements', () => {
		const elements = [
			'<h2></h2>',
			'<blockquote></blockquote>',
			'<strong></strong>',
			'<em></em>',
			'<br>',
			'<ul><li></li></ul>',
			'<mark></mark>',
			'<p></p>',
			'<span></span>',
			'<a></a>',
			'text',
		];

		expect(renderTextElement(elements).length).toBe(11);
		expect(renderTextElementWithoutStyles(elements).length).toBe(11);
	});

	test('Renders caption node types', () => {
		const text = renderCaptionElement(
			JSDOM.fragment('this caption contains'),
		);
		expect(getHtml(text.flat()[0])).toContain('<p');
	});

	test('Removes unsupported caption node types', () => {
		const text = renderCaptionElement(
			JSDOM.fragment(
				'this caption contains <blockquote>html</blockquote>',
			),
		);
		text.flatMap((element) => expect(element).not.toContain('blockquote'));
	});
});

describe('Transforms text nodes', () => {
	test('Transforms bullet points', () => {
		const nodes = renderTextElement([
			'• This is a bullet point we receive from capi',
		]);
		const bullet = nodes.flat()[0];
		expect(getHtml(bullet)).not.toContain(
			'• This is a bullet point we receive from capi',
		);
	});

	test('Transforms horizontal rules', () => {
		const nodes = renderTextElement(['* * *']);
		const horizontalRule = nodes.flat()[0];
		expect(getHtml(horizontalRule)).not.toContain('* * *');
	});
});

describe('Renders different types of elements', () => {
	test('ElementKind.Image', () => {
		const nodes = mockRenderElement(imageElement());
		const bodyImage = nodes.flat()[0];
		expect(getHtml(bodyImage)).toContain('img');
		expect(getHtml(bodyImage)).toContain('figcaption');
		expect(getHtml(bodyImage)).toContain('caption="caption"');
		expect(getHtml(bodyImage)).toContain('credit="credit"');
	});

	test('ElementKind.Image with thumbnail role', () => {
		const nodes = mockRenderElement(imageElementWithRole());
		const bodyImage = nodes.flat()[0];
		expect(getHtml(bodyImage)).toContain('img');
	});

	test('ElementKind.Pullquote', () => {
		const nodes = mockRenderElement(pullquoteElement());
		const pullquote = nodes.flat()[0];
		expect(getHtml(pullquote)).toContain('quote');
		expect(getHtml(pullquote)).not.toContain('attribution');
	});

	test('ElementKind.Pullquote with attribution', () => {
		const nodes = mockRenderElement(pullquoteWithAttributionElement());
		const pullquote = nodes.flat()[0];
		expect(getHtml(pullquote)).toContain('attribution');
		expect(getHtml(pullquote)).toContain('quote');
	});

	test('ElementKind.RichLink', () => {
		const nodes = mockRenderElement(richLinkElement());
		const richLink = nodes.flat()[0];
		expect(getHtml(richLink)).toContain(
			'<h1>this links to a related article</h1>',
		);
		expect(getHtml(richLink)).toContain('href="https://theguardian.com"');
	});

	test('ElementKind.Interactive', () => {
		const nodes = mockRenderElement(interactiveElement());
		const interactive = nodes.flat()[0];
		expect(getHtml(interactive)).toContain('iframe');
		expect(getHtml(interactive)).toContain('src="https://theguardian.com"');
		expect(getHtml(interactive)).toContain('height="500"');
	});

	test('ElementKind.Tweet', () => {
		const nodes = mockRenderElement(tweetElement());
		const tweet = nodes.flat()[0];
		expect(getHtml(tweet)).toContain('twitter-tweet');
	});

	test('ElementKind.Instagram', () => {
		const nodes = mockRenderElement(instagramElement());
		const instagram = nodes.flat()[0];
		expect(getHtml(instagram)).toBe(
			'<iframe src="https://www.instagram.com/p/embedId/embed" height="830" title="&lt;blockquote&gt;Instagram&lt;/blockquote&gt;"></iframe>',
		);
	});

	test('ElementKind.Embed', () => {
		const nodes = mockRenderElement(embedElement);
		const embed = nodes.flat()[0];
		expect(getHtml(embed)).toContain(
			'<iframe srcDoc="&lt;section&gt;Embed&lt;/section&gt;" title="Embed" height="322"></iframe>',
		);
	});

	test('ElementKind.Audio', () => {
		const nodes = mockRenderElement(audioElement);
		const audio = nodes.flat()[0];
		expect(getHtml(audio)).toContain(
			'src="https://www.spotify.com/" sandbox="allow-scripts" height="300" width="500" title="Audio element"',
		);
	});

	test('ElementKind.Video', () => {
		const nodes = mockRenderElement(videoElement);
		const video = nodes.flat()[0];
		expect(getHtml(video)).toContain(
			'src="https://www.youtube-nocookie.com/embed/mockYoutubeId?wmode=opaque&amp;feature=oembed" height="300" width="500" allowfullscreen="" title="Video element"',
		);
	});

	test('ElementKind.LiveEvent', () => {
		const nodes = mockRenderElement(liveEventElement());
		const liveEvent = nodes.flat()[0];
		expect(getHtml(liveEvent)).toContain(
			'<h1>this links to a live event</h1>',
		);
	});

	test('ElementKind.InteractiveAtom', () => {
		const nodes = mockRenderElement(atomElement());
		const atom = nodes.flat()[0];
		expect(atom).toBeNull();
	});

	test('ElementKind.ExplainerAtom', () => {
		const nodes = mockRenderElement(explainerElement());
		const explainer = nodes.flat()[0];
		expect(explainer).toBeNull();
	});

	test('ElementKind.GuideAtom', () => {
		const nodes = mockRenderElement(guideElement());
		const guide = nodes.flat()[0];
		expect(guide).toBeNull();
	});

	test('ElementKind.QandaAtom', () => {
		const nodes = mockRenderElement(qandaElement());
		const qanda = nodes.flat()[0];
		expect(qanda).toBeNull();
	});

	test('ElementKind.ProfileAtom', () => {
		const nodes = mockRenderElement(profileElement());
		const profile = nodes.flat()[0];
		expect(profile).toBeNull();
	});

	test('ElementKind.TimelineAtom', () => {
		const nodes = mockRenderElement(timelineElement());
		const timeline = nodes.flat()[0];
		expect(timeline).toBeNull();
	});

	test('ElementKind.ChartAtom', () => {
		const nodes = mockRenderElement(chartElement());
		const chart = nodes.flat()[0];
		expect(chart).toBeNull();
	});

	test('ElementKind.KnowledgeQuizAtom', () => {
		const nodes = mockRenderElement(knowledgeQuizAtom());
		const quiz = nodes.flat()[0];
		expect(quiz).toBeNull();
	});

	test('ElementKind.AudioAtom', () => {
		const nodes = mockRenderElement(audioAtom());
		const audio = nodes.flat()[0];
		expect(audio).toBeNull();
	});
});

describe('Renders different types of Editions elements', () => {
	test('ElementKind.Image', () => {
		const nodes = mockRenderEditions(imageElement());
		const bodyImage = nodes.flat()[0];
		expect(getHtml(bodyImage)).toContain('img');
		expect(getHtml(bodyImage)).toContain('figcaption');
		expect(getHtml(bodyImage)).toContain('caption="caption"');
		expect(getHtml(bodyImage)).toContain('credit="credit"');
	});

	test('ElementKind.Image with thumbnail role', () => {
		const nodes = mockRenderEditions(imageElementWithRole());
		const bodyImage = nodes.flat()[0];
		expect(getHtml(bodyImage)).toContain('img');
	});

	test('ElementKind.Pullquote', () => {
		const nodes = mockRenderEditions(pullquoteElement());
		const pullquote = nodes.flat()[0];
		expect(getHtml(pullquote)).toContain('quote');
		expect(getHtml(pullquote)).not.toContain('attribution');
	});

	test('ElementKind.Pullquote with attribution', () => {
		const nodes = mockRenderEditions(pullquoteWithAttributionElement());
		const pullquote = nodes.flat()[0];
		expect(getHtml(pullquote)).toContain('attribution');
		expect(getHtml(pullquote)).toContain('quote');
	});

	test('ElementKind.Tweet', () => {
		const nodes = mockRenderEditions(tweetElement());
		const tweet = nodes.flat()[0];
		expect(getHtml(tweet)).toContain('twitter-tweet');
	});

	test('ElementKind.Embed', () => {
		const nodes = mockRenderEditions(embedElement);
		const embed = nodes.flat()[0];
		// Editions shouldn't render generic embeds
		expect(getHtml(embed)).toBeNull;
	});

	test('ElementKind.Video', () => {
		const nodes = mockRenderEditions(videoElement);
		const video = nodes.flat()[0];
		expect(getHtml(video)).toContain(
			'src="https://www.youtube-nocookie.com/embed/mockYoutubeId?wmode=opaque&amp;feature=oembed" height="300" width="500" allowfullscreen="" title="Video element"',
		);
	});

	test('ElementKind.LiveEvent', () => {
		const nodes = mockRenderEditions(liveEventElement());
		const liveEvent = nodes.flat()[0];
		expect(getHtml(liveEvent)).toContain(
			'<h1>this links to a live event</h1>',
		);
	});
});

describe('Paragraph tags rendered correctly', () => {
	test('Contains no styles in standfirsts', () => {
		const fragment = JSDOM.fragment(
			'<a href="#"><ul><li><strong><p>Standfirst link</p></strong></li></ul></a>',
		);
		const nodes = renderStandfirstText(fragment, mockFormat);
		const html = getHtml(nodes.flat()[0]);
		expect(html).toContain('<p>Standfirst link</p>');
	});

	test('Contains styles in article body', () => {
		const fragment = JSDOM.fragment(
			'<ul><li><strong><p>Standfirst link</p></strong></li></ul>',
		);
		const nodes = renderText(fragment, mockFormat);
		const html = getHtml(nodes);
		expect(html).not.toContain('<strong><p>Standfirst link</p></strong>');
	});
});

describe('Transforms hrefs', () => {
	test('Transforms profile links', () => {
		const href = 'profile/firstname_lastname';
		const transformed = transformHref(href);
		expect(transformed).toBe(
			'https://www.theguardian.com/profile/firstname_lastname',
		);
	});

	test('Transforms latest links', () => {
		const href =
			'https://www.theguardian.com/world/series/coronavirus-live/latest';
		const transformed = transformHref(href);
		expect(transformed).toBe(
			'https://www.theguardian.com/world/series/coronavirus-live',
		);
	});

	test('Does not transform valid link', () => {
		const href =
			'https://www.theguardian.com/world/series/coronavirus-live';
		const transformed = transformHref(href);
		expect(transformed).toBe(
			'https://www.theguardian.com/world/series/coronavirus-live',
		);
	});
});

describe('Shows drop caps', () => {
	const paragraph = new Array(50).fill('word').join(' ');
	const isEditions = true;
	const isFirstParagraph = true;
	const format = {
		display: ArticleDisplay.Standard,
		theme: ArticlePillar.Culture,
		design: ArticleDesign.Interview,
	};

	test('Shows drop cap if the paragraph is at least 200 characters long, and the article has the correct design', () => {
		const showDropCap = shouldShowDropCap(
			paragraph,
			format,
			true,
			!isEditions,
		);
		expect(showDropCap).toBe(true);
	});

	test('Shows drop cap for eligible paragraphs including Unicode Latin-1 characters', () => {
		const unicodeLatin = `Česká ${paragraph}`;
		const showDropCap = shouldShowDropCap(
			unicodeLatin,
			format,
			isFirstParagraph,
			!isEditions,
		);
		expect(showDropCap).toBe(true);
	});

	test('Does not show drop cap if the paragraph is shorter than 200 characters', () => {
		const shortParagraph =
			'The pen might not be mightier than the sword, but maybe the printing press was heavier than the siege weapon. Just a few words can change everything.';
		const showDropCap = shouldShowDropCap(
			shortParagraph,
			format,
			isFirstParagraph,
			!isEditions,
		);
		expect(showDropCap).toBe(false);
	});

	test('Does not show drop cap if the article is not an allowed design (e.g. standard design)', () => {
		const showDropCap = shouldShowDropCap(
			paragraph,
			mockFormat,
			isFirstParagraph,
			!isEditions,
		);
		expect(showDropCap).toBe(false);
	});

	test('Does not show drop cap if the article is an Editions article', () => {
		const showDropCap = shouldShowDropCap(
			paragraph,
			format,
			isFirstParagraph,
			isEditions,
		);
		expect(showDropCap).toBe(false);
	});

	test('Does not show drop cap if the paragraph is not the first paragraph', () => {
		const showDropCap = shouldShowDropCap(
			paragraph,
			format,
			!isFirstParagraph,
			!isEditions,
		);
		expect(showDropCap).toBe(false);
	});
});
