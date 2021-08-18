import { render } from '@testing-library/react';

import { Design, Display, Pillar } from '@guardian/types';

import { Contributor } from './Contributor';
import { decidePalette } from '../lib/decidePalette';
import { interactiveLegacyClasses } from '../layouts/lib/interactiveLegacyStyling';

describe('Contributor', () => {
	it('It should contain legacy class names to support customised styling in interactives', () => {
		const format = {
			theme: Pillar.Lifestyle,
			design: Design.Interactive,
			display: Display.Immersive,
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
			/>,
		);

		expect(
			container.querySelector(`.${interactiveLegacyClasses.byline}`),
		).not.toBeNull();
	});

	it("It should not contain legacy class names for articles that aren't interactives", () => {
		const format = {
			theme: Pillar.Lifestyle,
			design: Design.Article,
			display: Display.Standard,
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
			/>,
		);

		expect(
			container.querySelector(`.${interactiveLegacyClasses.byline}`),
		).toBeNull();
	});
});
