import { Live as exampleLiveBlog } from '../../fixtures/generated/articles/Live';
import { Quiz as exampleQuiz } from '../../fixtures/generated/articles/Quiz';
import { Standard as exampleStandard } from '../../fixtures/generated/articles/Standard';
import { Newsletter, NewsletterSignupBlockElement } from '../types/content';
import { insertPromotedNewsletter } from './insertPromotedNewsletter';

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
};

const toElementTypeLists = (blocks: Block[]): string[][] =>
	blocks.map((block) => block.elements.map((element) => element._type));

describe('Insert Newsletter Signups', () => {
	it('makes no change if there is no newsletter', () => {
		const elementTypesBeforeEnhancement = toElementTypeLists(
			exampleStandard.blocks,
		);

		const elementTypesAfterEnhance = toElementTypeLists(
			insertPromotedNewsletter(
				exampleStandard.blocks,
				exampleStandard.format,
				undefined,
			),
		);

		expect(elementTypesAfterEnhance).toEqual(elementTypesBeforeEnhancement);
	});

	it('inserts a NewsletterSignupBlockElement to a standard article if there is a newsletter', () => {
		const insertedBlock = insertPromotedNewsletter(
			exampleStandard.blocks,
			exampleStandard.format,
			NEWSLETTER,
		)
			.flatMap((block) => block.elements)
			.find(
				(element) =>
					element._type ===
					'model.dotcomrendering.pageElements.NewsletterSignupBlockElement',
			);

		expect(insertedBlock).toBeTruthy();
		expect(
			(insertedBlock as NewsletterSignupBlockElement).newsletter,
		).toEqual(NEWSLETTER);
	});

	it('will not insert a NewsletterSignupBlockElement into a blog', () => {
		expect(
			insertPromotedNewsletter(
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
			insertPromotedNewsletter(
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
