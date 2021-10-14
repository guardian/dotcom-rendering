import { render } from '@testing-library/react';

import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';

import { Contributor } from './Contributor';
import { decidePalette } from '../lib/decidePalette';
import { interactiveLegacyClasses } from '../layouts/lib/interactiveLegacyStyling';

describe('Contributor', () => {
	it('It should contain legacy class names to support customised styling in interactives', () => {
		const format = {
			theme: ArticlePillar.Lifestyle,
			design: ArticleDesign.Interactive,
			display: ArticleDisplay.Immersive,
		};

		const { container } = render(
			<Contributor
				format={format}
				palette={decidePalette(format)}
				author={{ byline: 'Observer writers' }}
				tags={[
					{
						id: 'lifeandstyle/series/observer-design',
						type: 'Series',
						title: 'Observer Design',
					},
				]}
				guardianBaseURL="https://www.theguardian.com/uk"
			/>,
		);

		expect(
			container.querySelector(`.${interactiveLegacyClasses.byline}`),
		).not.toBeNull();
	});

	it("It should not contain legacy class names for articles that aren't interactives", () => {
		const format = {
			theme: ArticlePillar.Lifestyle,
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
		};

		const { container } = render(
			<Contributor
				format={format}
				palette={decidePalette(format)}
				author={{ byline: 'Observer writers' }}
				tags={[
					{
						id: 'lifeandstyle/series/observer-design',
						type: 'Series',
						title: 'Observer Design',
					},
				]}
				guardianBaseURL="https://www.theguardian.com/uk"
			/>,
		);

		expect(
			container.querySelector(`.${interactiveLegacyClasses.byline}`),
		).toBeNull();
	});
});
