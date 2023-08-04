import { jest } from '@jest/globals';
import { Live as exampleLiveBlog } from '../../fixtures/generated/articles/Live';
import { Quiz as exampleQuiz } from '../../fixtures/generated/articles/Quiz';
import { Standard as exampleStandard } from '../../fixtures/generated/articles/Standard';
import type {
	Newsletter,
	NewsletterSignupBlockElement,
} from '../types/content';

jest.unstable_mockModule('../../src/server/lib/logging', () => ({
	logger: jest.fn(),
}));

const { insertPromotedNewsletter } = await import('./insertPromotedNewsletter');

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

describe('Insert Newsletter Signups', () => {
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
