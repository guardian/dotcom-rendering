import { render } from '@testing-library/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { TextBlockComponent } from './TextBlockComponent';

const format = {
	theme: Pillar.News,
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
};

describe('TextBlockComponent', () => {
	/**
	 * The `case 'A'` branch of `buildElementTree` is an allowlist, so anchor
	 * attributes set by `enhanceExternalLinks` only reach the DOM because it
	 * forwards them. This pins that behaviour.
	 * @see ../model/enhance-external-links.ts
	 */
	it('preserves the target and rel set on anchors by the model', () => {
		const { container } = render(
			<TextBlockComponent
				format={format}
				isFirstParagraph={false}
				html='<p>Buy it <a href="https://www.johnlewis.com/" target="_blank" rel="noreferrer noopener">here</a>.</p>'
			/>,
		);

		const anchor = container.querySelector('a');

		expect(anchor?.getAttribute('target')).toBe('_blank');
		expect(anchor?.getAttribute('rel')).toBe('noreferrer noopener');
	});

	it('does not add a target to anchors that have none', () => {
		const { container } = render(
			<TextBlockComponent
				format={format}
				isFirstParagraph={false}
				html='<p>Read <a href="https://www.theguardian.com/uk">the news</a>.</p>'
			/>,
		);

		expect(container.querySelector('a')?.getAttribute('target')).toBeNull();
	});
});
