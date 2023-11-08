import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { render } from '@testing-library/react';
import { ConfigProvider } from './ConfigContext';
import { KeyEventsContainer } from './KeyEventsContainer';

const baseProperties = {
	id: '123',
	elements: [],
	attributes: { keyEvent: false, pinned: false, summary: false },
	primaryDateLine: '',
	secondaryDateLine: '',
};

describe('KeyEventsContainer', () => {
	it('It should render KeyEventsContainer as expected', () => {
		const { container } = render(
			<ConfigProvider
				value={{ renderingTarget: 'Web', darkModeAvailable: false }}
			>
				<KeyEventsContainer
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
					keyEvents={[
						{
							...baseProperties,
							blockFirstPublished: 1638279933000,
							title: 'title',
						},
					]}
					filterKeyEvents={true}
				/>
			</ConfigProvider>,
		);
		expect(container).toHaveTextContent('title');
	});

	it('It should not render events without a blockFirstPublished property', () => {
		const { container } = render(
			<ConfigProvider
				value={{ renderingTarget: 'Web', darkModeAvailable: false }}
			>
				<KeyEventsContainer
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
					keyEvents={[
						{
							...baseProperties,
							blockFirstPublished: 1638279933000,
							title: 'title',
						},
						{ ...baseProperties, title: 'should not exist' },
					]}
					filterKeyEvents={true}
				/>
			</ConfigProvider>,
		);
		expect(container).toHaveTextContent('title');
		expect(container).not.toHaveTextContent('should not exist');
	});

	it('It should not render events without a title property', () => {
		const { container } = render(
			<ConfigProvider
				value={{ renderingTarget: 'Web', darkModeAvailable: false }}
			>
				<KeyEventsContainer
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
					keyEvents={[
						{
							...baseProperties,
							blockFirstPublished: 1638279933000,
							title: 'title',
						},
						{
							...baseProperties,
							blockFirstPublished: 1638279933000,
						},
					]}
					filterKeyEvents={true}
				/>
			</ConfigProvider>,
		);
		expect(container).toHaveTextContent('title');
		expect(container.getElementsByTagName('time')).toHaveLength(1);
	});
});
