import { Live as exampleLiveBlog } from '../../fixtures/generated/dcr-articles/Live';
import { Quiz as exampleQuiz } from '../../fixtures/generated/dcr-articles/Quiz';
import { Standard as exampleStandard } from '../../fixtures/generated/dcr-articles/Standard';
import { decideFormat } from '../lib/decideFormat';
import type {
	Newsletter,
	NewsletterSignupBlockElement,
} from '../types/content';
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

describe('Insert Newsletter Signups', () => {
	it('inserts a NewsletterSignupBlockElement to a standard article if there is a newsletter', () => {
		const elements = exampleStandard.blocks[0]?.elements ?? [];
		const insertedBlock = insertPromotedNewsletter(
			elements,
			exampleStandard.blocks[0]?.id ?? 'mock id',
			decideFormat(exampleStandard.format),
			NEWSLETTER,
		).find(
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
		const elements = exampleStandard.blocks[0]?.elements ?? [];
		expect(
			insertPromotedNewsletter(
				elements,
				exampleLiveBlog.blocks[0]?.id ?? 'mock id',
				decideFormat(exampleLiveBlog.format),
				NEWSLETTER,
			).find(
				(element) =>
					element._type ===
					'model.dotcomrendering.pageElements.NewsletterSignupBlockElement',
			),
		).toBeFalsy();
	});

	it('will not insert a NewsletterSignupBlockElement into a quiz', () => {
		const elements = exampleStandard.blocks[0]?.elements ?? [];
		expect(
			insertPromotedNewsletter(
				elements,
				exampleQuiz.blocks[0]?.id ?? 'mock id',
				decideFormat(exampleQuiz.format),
				NEWSLETTER,
			).find(
				(element) =>
					element._type ===
					'model.dotcomrendering.pageElements.NewsletterSignupBlockElement',
			),
		).toBeFalsy();
	});
});
