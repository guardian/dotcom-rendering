import { ArticleDesign, ArticlePillar } from '@guardian/libs';
import { Result, ResultKind, some, ok } from '@guardian/types';
import type { NewsletterSignUp, Text } from 'bodyElement';
import { ElementKind } from 'bodyElementKind';
import type { Standard, LiveBlog, Quiz } from 'item';
import { JSDOM } from 'jsdom';
import { Newsletter } from '../newsletter';
import { insertNewsletterIntoItem } from './insertNewsletter';

const NEWSLETTER: Newsletter = {
	id: 'patriarchy',
	description:
		'Reviewing the most important stories on feminism and sexism and those fighting for equality',
	displayName: 'The Week in Patriarchy',
	frequency: 'Weekly',
	theme: ArticlePillar.Opinion,
	group: 'Opinion',
};

const makeTextElement = (html: string): Result<string, Text> => ({
	kind: ResultKind.Ok,
	value: { kind: ElementKind.Text, doc: JSDOM.fragment(html) },
});

const CONTENT_1 = `
<p>paragraph one</p>
<p>paragraph two</p>
<p>paragraph three</p>
<p>paragraph four</p>
`;
const CONTENT_2 = `
<p>paragraph five</p>
`;

const makeStandard = (): Standard =>
	({
		design: ArticleDesign.Standard,
		body: [makeTextElement(CONTENT_1), makeTextElement(CONTENT_2)],
		internalShortId: some('standard article id'),
	} as Standard);

const makeBlog = (): LiveBlog =>
	({
		design: ArticleDesign.LiveBlog,
		internalShortId: some('Blog id'),
	} as LiveBlog);

const makeQuiz = (): Quiz =>
	({
		design: ArticleDesign.Quiz,
		body: [makeTextElement(CONTENT_1), makeTextElement(CONTENT_2)],
		internalShortId: some('quiz id'),
	} as Quiz);

describe('Insert Newsletter Signups', () => {
	it('makes no change if there is no newsletter', () => {
		const before = makeStandard();
		const after = insertNewsletterIntoItem(
			makeStandard(),
			undefined,
		) as Standard;

		expect(after.body.length).toBe(before.body.length);
	});

	it('inserts a NewsletterSignupBlockElement to a standard article if there is a newsletter', () => {
		const before = makeStandard();
		const after = insertNewsletterIntoItem(
			makeStandard(),
			NEWSLETTER,
		) as Standard;

		const expectedElement: NewsletterSignUp = {
			kind: ElementKind.NewsletterSignUp,
			...NEWSLETTER,
		};

		expect(after.body.length).toBe(before.body.length + 2);

		expect(after.body).toEqual(
			expect.arrayContaining([ok(expectedElement)]),
		);

	});

	it('will not insert a NewsletterSignupBlockElement into a blog', () => {
		const before = makeBlog();
		const after = insertNewsletterIntoItem(makeBlog(), NEWSLETTER);
		expect(after).toEqual(before);
	});

	it('will not insert a NewsletterSignupBlockElement into a quiz', () => {
		const before = makeQuiz();
		const after = insertNewsletterIntoItem(makeQuiz(), NEWSLETTER);
		expect(after).toEqual(before);
	});
});
