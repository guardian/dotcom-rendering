import { Live as exampleLiveBlog } from '../../fixtures/generated/articles/Live';
import { Quiz as exampleQuiz } from '../../fixtures/generated/articles/Quiz';
import { Standard as exampleStandard } from '../../fixtures/generated/articles/Standard';
import {
	findInsertIndex,
	insertNewsletterSignup,
} from './insert-newsletter-signup';

const sampleNewsletter: Newsletter = {
	listId: 123,
	identityName: 'patriarchy',
	description:
		'Reviewing the most important stories on feminism and sexism and those fighting for equality',
	name: 'The Week in Patriarchy',
	frequency: 'Weekly',
	successDescription: 'You have signed up, but the newsletter is fake',
	theme: 'opinion',
	group: 'Opinion',
	elementId: 'ElementID',
};

const sampleNewsletterSignupBlockElement: CAPIElement = {
	_type: 'model.dotcomrendering.pageElements.NewsletterSignupBlockElement',
	elementId: 'ElementID',
	newsletter: sampleNewsletter,
};

const toElementTypeLists = (blocks: Block[]): string[][] =>
	blocks.map((block) => block.elements.map((element) => element._type));

describe('Insert Newsletter Signups', () => {
	it('makes no change if there is no newsletter', () => {
		const elementTypesBeforeEnhancement = toElementTypeLists(
			exampleStandard.blocks,
		);

		const elementTypesAfterEnhance = toElementTypeLists(
			insertNewsletterSignup(
				exampleStandard.blocks,
				exampleStandard.format,
				undefined,
			),
		);

		expect(elementTypesAfterEnhance).toEqual(elementTypesBeforeEnhancement);
	});

	it('inserts a NewsletterSignupBlockElement to a standard article if there is a newsletter', () => {
		expect(
			insertNewsletterSignup(
				exampleStandard.blocks,
				exampleStandard.format,
				sampleNewsletter,
			)
				.flatMap((block) => block.elements)
				.find(
					(element) =>
						element._type ===
						'model.dotcomrendering.pageElements.NewsletterSignupBlockElement',
				),
		).toEqual(sampleNewsletterSignupBlockElement);
	});

	it('will not insert a NewsletterSignupBlockElement into a blog', () => {
		expect(
			insertNewsletterSignup(
				exampleLiveBlog.blocks,
				exampleLiveBlog.format,
				sampleNewsletter,
			)
				.flatMap((block) => block.elements)
				.find(
					(element) =>
						element._type ===
						'model.dotcomrendering.pageElements.NewsletterSignupBlockElement',
				),
		).toBeFalsy();
	});

	it('will not insert a NewsletterSignupBlockElement into a quiz', () => {
		expect(
			insertNewsletterSignup(
				exampleQuiz.blocks,
				exampleQuiz.format,
				sampleNewsletter,
			)
				.flatMap((block) => block.elements)
				.find(
					(element) =>
						element._type ===
						'model.dotcomrendering.pageElements.NewsletterSignupBlockElement',
				),
		).toBeFalsy();
	});
});

const SubheadingBlockElement = {
	_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
} as CAPIElement;
const PullquoteBlockElement = {
	_type: 'model.dotcomrendering.pageElements.PullquoteBlockElement',
} as CAPIElement;
const TextBlockElement = {
	_type: 'model.dotcomrendering.pageElements.TextBlockElement',
} as CAPIElement;
const testElementsOne = [
	PullquoteBlockElement,
	SubheadingBlockElement,
	PullquoteBlockElement,
	TextBlockElement,
	TextBlockElement,
	TextBlockElement,
];
const testElementsTwo = [
	TextBlockElement,
	SubheadingBlockElement,
	TextBlockElement,
	SubheadingBlockElement,
	TextBlockElement,
	TextBlockElement,
	TextBlockElement,
] as CAPIElement[];

describe('Find index to insert Newsletter Signup', () => {
	it('will move the shortst distance from the target to be in a good spot', () => {
		expect(findInsertIndex(testElementsTwo, 2, 100)).toBe(1);
	});
	it('will place at the target index when max distance is 0', () => {
		expect(findInsertIndex(testElementsOne, 1, 0)).toBe(1);
	});
	it('will move to find a place at least two spaces after any pullquote, if there is one within the max distance', () => {
		expect(findInsertIndex(testElementsOne, 2, 3)).toBe(5);
	});
	it('will move not move futher than the max distance to find a better place than the target', () => {
		expect(findInsertIndex(testElementsOne, 2, 1)).toBe(2);
	});
});
