import { Live as exampleLiveBlog } from '../../fixtures/generated/fe-articles/Live';
import { Quiz as exampleQuiz } from '../../fixtures/generated/fe-articles/Quiz';
import { Standard as exampleStandard } from '../../fixtures/generated/fe-articles/Standard';
import { decideFormat } from '../lib/format';
import type {
	KeyTakeawaysBlockElement,
	Newsletter,
	NewsletterSignupBlockElement,
	TextBlockElement,
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

const testTextElement: TextBlockElement = {
	_type: 'model.dotcomrendering.pageElements.TextBlockElement',
	elementId: 'test-text-element-id-1',
	dropCap: 'on',
	html: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesquepharetra libero nec varius feugiat. Nulla commodo sagittis erat amalesuada. Ut iaculis interdum eros, et tristique ex. In veldignissim arcu. Nulla nisi urna, laoreet a aliquam at, viverra eueros. Proin imperdiet pellentesque turpis sed luctus. Donecdignissim lacus in risus fermentum maximus eu vel justo. Duis nontortor ac elit dapibus imperdiet ut at risus. Etiam pretium, odioeget accumsan venenatis, tortor mi aliquet nisl, vel ullamcorperneque nulla vel elit. Etiam porta mauris nec sagittis luctus.</p>',
};

const LIST_ELEMENT: KeyTakeawaysBlockElement = {
	_type: 'model.dotcomrendering.pageElements.KeyTakeawaysBlockElement',
	keyTakeaways: [
		{
			title: 'The first key takeaway',
			body: [testTextElement],
		},
		{
			title: 'The second key takeaway',
			body: [testTextElement],
		},
	],
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

	it('will not insert a NewsletterSignupBlockElement before a nested list element', () => {
		const elements = exampleStandard.blocks[0]?.elements ?? [];

		elements[4] = LIST_ELEMENT;

		const elementsWithNewsletter = insertPromotedNewsletter(
			elements,
			exampleStandard.blocks[0]?.id ?? 'mock id',
			decideFormat(exampleStandard.format),
			NEWSLETTER,
		);
		const insertedBlock = elementsWithNewsletter.find(
			(element) =>
				element._type ===
				'model.dotcomrendering.pageElements.NewsletterSignupBlockElement',
		);

		const indexOfNewsletter = elementsWithNewsletter.indexOf(
			insertedBlock as NewsletterSignupBlockElement,
		);

		expect(indexOfNewsletter).toBeGreaterThan(4);
	});
});
