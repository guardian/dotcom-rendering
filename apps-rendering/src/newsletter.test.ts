/**
 * @jest-environment jsdom
 */
import { Newsletter } from '@guardian/apps-rendering-api-models/newsletter';
import { none, some } from '../vendor/@guardian/types/index';
import type { Body, BodyElement } from 'bodyElement';
import { ElementKind } from 'bodyElementKind';
import type { DeadBlog, Quiz, Standard } from 'item';
import { Optional } from 'optional';
import { quiz, article } from 'fixtures/item';
import { deadBlog } from 'fixtures/live';
import { insertNewsletterIntoItem } from './newsletter';

const TEST_NEWSLETTER: Newsletter = {
	identityName: 'patriarchy',
	description:
		'Reviewing the most important stories on feminism and sexism and those fighting for equality',
	name: 'The Week in Patriarchy',
	frequency: 'Weekly',
	theme: 'opinion',
	successDescription: 'signed up',
};

const makeTextElementNode = (html: string, outerTag = 'p'): Node => {
	const doc = new DocumentFragment();
	const el = document.createElement(outerTag);
	el.innerHTML = html;
	doc.appendChild(el);
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- this value is not `null`
	return doc.firstChild!;
};

const makeParagraph = (html: string): BodyElement => ({
	kind: ElementKind.Text,
	doc: makeTextElementNode(html),
});

const makeHeading = (html: string, id: string): BodyElement => ({
	kind: ElementKind.HeadingTwo,
	id: Optional.some(id),
	doc: makeTextElementNode(html, 'h2'),
});

const makePullquote = (): BodyElement => ({
	kind: ElementKind.Pullquote,
	quote: 'Why should the crown be allowed to carry on with a feudal system just because they want to?',
	attribution: { kind: 0, value: 'Jane Giddins' },
});

const makeBodyWithPlaceToInsert = (): Body => [
	makeParagraph('Introductory paragraph.'),
	makeHeading('first subheading', 'first-subheading'),
	makeParagraph('Another paragraph.'),
	makeHeading('Another heading', 'another-heading'),
	makeParagraph('Another paragraph.'),
	makeParagraph('Another paragraph.'),
	makeParagraph('Another paragraph.'),
	makeParagraph('Another paragraph.'),
	makeHeading('Another heading', 'another-heading'),
	makeParagraph('Another paragraph.'),
	makePullquote(),
	makeParagraph('Another paragraph.'),
	makeParagraph('Another paragraph.'),
];

const makeBodyWithNoPlacesToInsert = (): Body => [
	makeParagraph('Introductory paragraph.'),
	makeHeading('first subheading', 'first-subheading'),
	makeParagraph('Another paragraph.'),
	makeHeading('Another heading', 'another-heading'),
	makeParagraph('Another paragraph.'),
	makeHeading('Another heading', 'another-heading'),
	makeParagraph('Another paragraph.'),
	makePullquote(),
];

const makeBodyWithNoPlacesToInsertInTheTargetZone = (): Body => [
	makeParagraph('Another paragraph.'),
	makeParagraph('Another paragraph.'),
	makeParagraph('Another paragraph.'),
	makePullquote(),
	makePullquote(),
	makePullquote(),
	makePullquote(),
	makePullquote(),
	makePullquote(),
	makePullquote(),
	makePullquote(),
	makePullquote(),
	makePullquote(),
	makePullquote(),
	makePullquote(),
	makePullquote(),
	makePullquote(),
	makeParagraph('Another paragraph.'),
	makeParagraph('Another paragraph.'),
	makeParagraph('Another paragraph.'),
];

describe('Insert Newsletter Signups', () => {
	it('makes no change if there is no newsletter', () => {
		const originalBody = makeBodyWithPlaceToInsert();
		const newItem = insertNewsletterIntoItem({
			...article,
			body: originalBody,
			promotedNewsletter: none,
		}) as Standard;
		expect(originalBody).toEqual(newItem.body);
	});

	it('makes no change if there are no suitable places in the body', () => {
		const originalBody = makeBodyWithNoPlacesToInsert();
		const newItem = insertNewsletterIntoItem({
			...article,
			body: originalBody,
			promotedNewsletter: some(TEST_NEWSLETTER),
		}) as Standard;
		expect(newItem.body).toEqual(originalBody);
	});

	it('will not insert a NewsletterSignupBlockElement outside the target range', () => {
		const originalBody = makeBodyWithNoPlacesToInsertInTheTargetZone();
		const newItem = insertNewsletterIntoItem({
			...article,
			body: originalBody,
			promotedNewsletter: some(TEST_NEWSLETTER),
		}) as Standard;
		expect(newItem.body).toEqual(originalBody);
	});

	it('inserts a NewsletterSignupBlockElement to a standard article if there is a newsletter', () => {
		const newItem = insertNewsletterIntoItem({
			...article,
			body: makeBodyWithPlaceToInsert(),
			promotedNewsletter: some(TEST_NEWSLETTER),
		}) as Standard;

		const insertedElement = newItem.body.find(
			(element) => element.kind === ElementKind.NewsletterSignUp,
		);
		expect(insertedElement).toBeTruthy();
	});

	it('will not insert a NewsletterSignupBlockElement into a blog', () => {
		const blogWithPromotedNewsletter: DeadBlog = {
			...deadBlog,
			blocks: deadBlog.blocks.map((block) => ({
				...block,
				body: makeBodyWithPlaceToInsert(),
			})),
			promotedNewsletter: some(TEST_NEWSLETTER),
		};
		const newItem = insertNewsletterIntoItem(blogWithPromotedNewsletter);
		expect(blogWithPromotedNewsletter).toEqual(newItem);
	});

	it('will not insert a NewsletterSignupBlockElement into a quiz', () => {
		const originalBody = makeBodyWithPlaceToInsert();
		const newItem = insertNewsletterIntoItem({
			...quiz,
			body: originalBody,
			promotedNewsletter: some(TEST_NEWSLETTER),
		}) as Quiz;
		expect(newItem.body).toEqual(originalBody);
	});
});
