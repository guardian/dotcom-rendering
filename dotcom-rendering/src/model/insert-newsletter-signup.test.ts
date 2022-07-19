import { Live as exampleLiveBlog } from '../../fixtures/generated/articles/Live';
import { Quiz as exampleQuiz } from '../../fixtures/generated/articles/Quiz';
import { Standard as exampleStandard } from '../../fixtures/generated/articles/Standard';
import {
	findInsertIndex,
	insertNewsletterSignup,
} from './insert-newsletter-signup';

const NEWSLETTER: Newsletter = {
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

const SIGNUP_BLOCK_ELEMENT: CAPIElement = {
	_type: 'model.dotcomrendering.pageElements.NewsletterSignupBlockElement',
	elementId: 'ElementID',
	newsletter: NEWSLETTER,
	role: 'inlineBox',
};

const SIGNUP_BLOCK_ELEMENT_CLEAR: CAPIElement = {
	...SIGNUP_BLOCK_ELEMENT,
	role: 'inlineBoxClearAtAllBreakpoints',
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
		expect([
			SIGNUP_BLOCK_ELEMENT,
			SIGNUP_BLOCK_ELEMENT_CLEAR,
		]).toContainEqual(
			insertNewsletterSignup(
				exampleStandard.blocks,
				exampleStandard.format,
				NEWSLETTER,
			)
				.flatMap((block) => block.elements)
				.find(
					(element) =>
						element._type ===
						'model.dotcomrendering.pageElements.NewsletterSignupBlockElement',
				),
		);
	});

	it('will not insert a NewsletterSignupBlockElement into a blog', () => {
		expect(
			insertNewsletterSignup(
				exampleLiveBlog.blocks,
				exampleLiveBlog.format,
				NEWSLETTER,
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
				NEWSLETTER,
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
const SupportingRoleBlockElement = {
	_type: 'model.dotcomrendering.pageElements.PullquoteBlockElement',
	role: 'supporting',
} as CAPIElement;
const TextBlockElement = {
	_type: 'model.dotcomrendering.pageElements.TextBlockElement',
} as CAPIElement;

const TEST_ELEMENTS = [
	TextBlockElement,
	SubheadingBlockElement,
	TextBlockElement,
	SubheadingBlockElement,
	TextBlockElement,
	TextBlockElement,
	TextBlockElement,
];

const TEST_ELEMENTS_WITH_SUPPORTING = [
	SupportingRoleBlockElement,
	SubheadingBlockElement,
	SupportingRoleBlockElement,
	TextBlockElement,
	TextBlockElement,
	TextBlockElement,
];

describe('Find index to insert Newsletter Signup', () => {
	it('will move the shortst distance from the target to be in a good spot', () => {
		expect(findInsertIndex(TEST_ELEMENTS, 2, 100)).toBe(1);
	});
	it('will place at the target index when max distance is 0', () => {
		expect(findInsertIndex(TEST_ELEMENTS_WITH_SUPPORTING, 1, 0)).toBe(1);
	});
	it('will move to find a place at least two spaces after any element where role=supporting, if there is one within the max distance', () => {
		expect(findInsertIndex(TEST_ELEMENTS_WITH_SUPPORTING, 2, 3)).toBe(5);
	});
	it('will move not move futher than the max distance to find a better place than the target', () => {
		expect(findInsertIndex(TEST_ELEMENTS_WITH_SUPPORTING, 2, 1)).toBe(2);
	});
});
