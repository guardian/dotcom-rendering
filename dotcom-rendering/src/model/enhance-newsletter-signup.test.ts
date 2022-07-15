import { Live as exampleLiveBlog } from '../../fixtures/generated/articles/Live';
import { Quiz as exampleQuiz } from '../../fixtures/generated/articles/Quiz';
import { Standard as exampleStandard } from '../../fixtures/generated/articles/Standard';
import { enhanceNewsletterSignup } from './enhance-newsletter-signup';

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

describe('Enhance Newsletter Signups', () => {
	it('makes no change if there is no newsletter', () => {
		const elementTypesBeforeEnhancement = toElementTypeLists(
			exampleStandard.blocks,
		);

		const elementTypesAfterEnhance = toElementTypeLists(
			enhanceNewsletterSignup(
				exampleStandard.blocks,
				exampleStandard.format,
				undefined,
			),
		);

		expect(elementTypesAfterEnhance).toEqual(elementTypesBeforeEnhancement);
	});

	it('inserts a NewsletterSignupBlockElement to a standard article if there is a newsletter', () => {
		expect(
			enhanceNewsletterSignup(
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
			enhanceNewsletterSignup(
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
			enhanceNewsletterSignup(
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
