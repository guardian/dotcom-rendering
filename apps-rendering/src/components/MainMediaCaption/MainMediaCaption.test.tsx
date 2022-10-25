// ----- Imports ----- //

import { matchers } from '@emotion/jest';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { some } from '@guardian/types';
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
				caption={some(JSDOM.fragment('Here is a caption.'))}
				credit={some('Photograph: cameraman')}
				format={{
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
					theme: ArticlePillar.News,
				}}
				id={captionId}
			/>,
		);

		const caption = mainMediaCaption.root.findByProps({ id: captionId });
		const captionText = caption.children.join('');

		expect(captionText).toBe('Here is a caption. Photograph: cameraman');
	});
});
