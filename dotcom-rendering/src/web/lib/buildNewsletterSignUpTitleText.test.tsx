import { renderToStaticMarkup } from 'react-dom/server';
import { buildTitleText } from './buildNewsletterSignUpTitleText';

const TEST_DISPLAY_NAMES = [
	'First Edition',
	'The Guardian Headlines UK',
	'Australian Politics',
	'Best of Guardian Opinion UK',
	'The Week in Patriarchy',
	'First Dog on the Moon',
	'Inside Saturday',
	'The Long Read',
	'Five Great Reads',
	'Bookmarks',
	'Hear Here',
	'Art Weekly',
	'Design Review',
	'Word of Mouth',
	'Fashion Statement',
	'Saved for Later',
	'The Observer Food Monthly',
	'The Recap',
	'Moving the Goalposts',
	'Guardian Australia Sports',
	'The Day Today',
	'On The Hour',
];

const NAME_STARTING_WITH_THE = 'The Day Today';
const NAME_WITH_THE_IN_THE_MIDDLE = 'On The Hour';

const htmlStrings =
	TEST_DISPLAY_NAMES.map(buildTitleText).map(renderToStaticMarkup);

describe('buildTitleText', () => {
	it('produces content that includes the display name', () => {
		htmlStrings.forEach((html, index) => {
			expect(html.includes(TEST_DISPLAY_NAMES[index])).toBeTruthy();
		});
	});

	it('will not repeat "the"', () => {
		const html = renderToStaticMarkup(
			buildTitleText(NAME_STARTING_WITH_THE),
		);

		expect(html).toBe(
			`Sign up to <span>${NAME_STARTING_WITH_THE}</span> newsletter`,
		);
	});

	it('will add "the" before the name if it does not start with "the"', () => {
		const html = renderToStaticMarkup(
			buildTitleText(NAME_WITH_THE_IN_THE_MIDDLE),
		);

		expect(html).toBe(
			`Sign up to the <span>${NAME_WITH_THE_IN_THE_MIDDLE}</span> newsletter`,
		);
	});
});
