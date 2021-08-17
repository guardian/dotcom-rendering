import { render } from '@testing-library/react';

import { Design, Display, Pillar } from '@guardian/types';

import { Standfirst } from './Standfirst';
import { interactiveLegacyClasses } from '../layouts/lib/interactiveLegacyStyling';

describe('Standfirst', () => {
	it('It should contain legacy class names to support customised styling in interactives', () => {
		const { container } = render(
			<Standfirst
				format={{
					theme: Pillar.Lifestyle,
					design: Design.Interactive,
					display: Display.Immersive,
				}}
				standfirst="Standfirst"
			/>,
		);

		expect(
			container.querySelector(`.${interactiveLegacyClasses.standFirst}`),
		).not.toBeNull();
	});

	it("It should not contain legacy class names for articles that aren't interactives", () => {
		const { container } = render(
			<Standfirst
				format={{
					theme: Pillar.Lifestyle,
					design: Design.Article,
					display: Display.Standard,
				}}
				standfirst="Standfirst"
			/>,
		);

		expect(
			container.querySelector(`.${interactiveLegacyClasses.standFirst}`),
		).toBeNull();
	});
});
