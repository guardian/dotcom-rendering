// ----- Imports ----- //

import { matchers } from '@emotion/jest';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { some } from '../../../vendor/@guardian/types/index';
import { JSDOM } from 'jsdom';
import renderer from 'react-test-renderer';
import MainMediaCaption from '.';

// ----- Setup ----- //

expect.extend(matchers);
const captionId = 'header-image-caption';

// ----- Tests ----- //

describe('MainMediaCaption component renders as expected', () => {
	it('formats the caption correctly', () => {
		const mainMediaCaption = renderer.create(
			<MainMediaCaption
				caption={some(
					JSDOM.fragment(
						'Here is a caption with <em>emphasis</em>, a <strong>strong tag</strong>, and a <a href="https://www.theguardian.com">link</a>.',
					),
				)}
				credit={some('Photograph: cameraman')}
				format={{
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
					theme: ArticlePillar.News,
				}}
				id={captionId}
			/>,
		);

		const root = mainMediaCaption.root;
		const emphasis = root.findByType('em');
		const strong = root.findByType('strong');
		const anchor = root.findByType('a');

		expect(emphasis.children[0]).toBe('emphasis');
		expect(strong.children[0]).toBe('strong tag');
		expect(anchor.children[0]).toBe('link');
	});
});
