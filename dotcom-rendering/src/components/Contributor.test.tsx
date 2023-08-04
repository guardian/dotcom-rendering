import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { jest } from '@jest/globals';
import { render } from '@testing-library/react';
import { interactiveLegacyClasses } from '../layouts/lib/interactiveLegacyStyling';
import { ConfigProvider } from './ConfigContext';

jest.unstable_mockModule('../../src/lib/bridgetApi', () => ({
	getNotificationsClient: jest.fn(),
}));

const { Contributor } = await import('./Contributor');

describe('Contributor', () => {
	it('It should contain legacy class names to support customised styling in interactives', () => {
		const format = {
			theme: Pillar.Lifestyle,
			design: ArticleDesign.Interactive,
			display: ArticleDisplay.Immersive,
		};

		const { container } = render(
			<ConfigProvider value={{ renderingTarget: 'Web' }}>
				<Contributor
					format={format}
					byline="Observer writers"
					tags={[
						{
							id: 'lifeandstyle/series/observer-design',
							type: 'Series',
							title: 'Observer Design',
						},
					]}
				/>
			</ConfigProvider>,
		);

		expect(
			container.querySelector(`.${interactiveLegacyClasses.byline}`),
		).not.toBeNull();
	});

	it("It should not contain legacy class names for articles that aren't interactives", () => {
		const format = {
			theme: Pillar.Lifestyle,
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
		};

		const { container } = render(
			<ConfigProvider value={{ renderingTarget: 'Web' }}>
				<Contributor
					format={format}
					byline="Observer writers"
					tags={[
						{
							id: 'lifeandstyle/series/observer-design',
							type: 'Series',
							title: 'Observer Design',
						},
					]}
				/>
			</ConfigProvider>,
		);

		expect(
			container.querySelector(`.${interactiveLegacyClasses.byline}`),
		).toBeNull();
	});
});
