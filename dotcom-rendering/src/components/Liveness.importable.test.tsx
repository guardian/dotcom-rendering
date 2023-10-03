/**
 * @jest-environment node
 */

import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { renderToString } from 'react-dom/server';
import { Liveness } from './Liveness.importable';

describe('Liveness', () => {
	it('Does not throw in Node render', () => {
		const html = renderToString(
			<Liveness
				webTitle=""
				ajaxUrl=""
				pageId=""
				filterKeyEvents={false}
				format={{
					theme: Pillar.News,
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
				}}
				enhanceTweetsSwitch={false}
				onFirstPage={true}
				webURL=""
				mostRecentBlockId=""
				hasPinnedPost={false}
			/>,
		);
		expect(html).toBe('');
	});
});
