/**
 * @jest-environment jsdom
 */
import { Newsletter } from '@guardian/apps-rendering-api-models/newsletter';
import { none, some } from '@guardian/types';
import type { Body } from 'bodyElement';
import { ElementKind } from 'bodyElementKind';
import type { DeadBlog, Quiz, Standard } from 'item';
import { Optional } from 'optional';
import { Result } from 'result';
import { quiz, article } from 'fixtures/item';
import { deadBlog } from 'fixtures/live';
import { insertNewsletterIntoItem } from './insertNewsletterIntoItem';

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

const makeBodyWithPlaceToInsert = (): Body => [
	Result.ok({
		kind: ElementKind.Text,
		doc: makeTextElementNode('Introductory paragraph.'),
	}),
	Result.ok({
		kind: ElementKind.HeadingTwo,
		id: Optional.some('who-qualifies-for-student-loan-forgiveness'),
		doc: makeTextElementNode(
			'Who qualifies for student loan forgiveness?',
			'h2',
		),
	}),
	Result.ok({
		kind: ElementKind.Text,
		doc: makeTextElementNode('Another paragraph.'),
	}),
	Result.ok({
		kind: ElementKind.HeadingTwo,
		id: Optional.some('how-the-student-debt-crisis-started'),
		doc: makeTextElementNode('How the student debt crisis started?', 'h2'),
	}),
	Result.ok({
		kind: ElementKind.Text,
		doc: makeTextElementNode('Another paragraph.'),
	}),
	Result.ok({
		kind: ElementKind.Text,
		doc: makeTextElementNode('Another paragraph.'),
	}),
	Result.ok({
		kind: ElementKind.Text,
		doc: makeTextElementNode('Another paragraph.'),
	}),
	Result.ok({
		kind: ElementKind.Text,
		doc: makeTextElementNode('Another paragraph.'),
	}),
	Result.ok({
		kind: ElementKind.Text,
		doc: makeTextElementNode('Another paragraph.'),
	}),
	Result.ok({
		kind: ElementKind.HeadingTwo,
		id: Optional.some('what-student-debt-looks-like-today'),
		doc: makeTextElementNode('What student debt looks like today?', 'h2'),
	}),
	Result.ok({
		kind: ElementKind.Text,
		doc: makeTextElementNode('Another paragraph.'),
	}),
	Result.ok({
		kind: ElementKind.Pullquote,
		quote: 'Why should the crown be allowed to carry on with a feudal system just because they want to?',
		attribution: { kind: 0, value: 'Jane Giddins' },
	}),
	Result.ok({
		kind: ElementKind.Text,
		doc: makeTextElementNode('Another paragraph.'),
	}),
	Result.ok({
		kind: ElementKind.Text,
		doc: makeTextElementNode('Another paragraph.'),
	}),
];

const makeBodyWithNoPlacesToInsert = (): Body => [
	Result.ok({
		kind: ElementKind.Text,
		doc: makeTextElementNode('Introductory paragraph.'),
	}),
	Result.ok({
		kind: ElementKind.HeadingTwo,
		id: Optional.some('who-qualifies-for-student-loan-forgiveness'),
		doc: makeTextElementNode(
			'Who qualifies for student loan forgiveness?',
			'h2',
		),
	}),
	Result.ok({
		kind: ElementKind.Text,
		doc: makeTextElementNode('Another paragraph.'),
	}),
	Result.ok({
		kind: ElementKind.HeadingTwo,
		id: Optional.some('how-the-student-debt-crisis-started'),
		doc: makeTextElementNode('How the student debt crisis started?', 'h2'),
	}),
	Result.ok({
		kind: ElementKind.Text,
		doc: makeTextElementNode('Another paragraph.'),
	}),
	Result.ok({
		kind: ElementKind.HeadingTwo,
		id: Optional.some('what-student-debt-looks-like-today'),
		doc: makeTextElementNode('What student debt looks like today?', 'h2'),
	}),
	Result.ok({
		kind: ElementKind.Text,
		doc: makeTextElementNode('Another paragraph.'),
	}),
	Result.ok({
		kind: ElementKind.Pullquote,
		quote: 'Why should the crown be allowed to carry on with a feudal system just because they want to?',
		attribution: { kind: 0, value: 'Jane Giddins' },
	}),
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

	it('inserts a NewsletterSignupBlockElement to a standard article if there is a newsletter', () => {
		const newItem = insertNewsletterIntoItem({
			...article,
			body: makeBodyWithPlaceToInsert(),
			promotedNewsletter: some(TEST_NEWSLETTER),
		}) as Standard;

		const insertedElement = newItem.body.find(
			(result) =>
				result.isOk() &&
				result.value.kind === ElementKind.NewsletterSignUp,
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
