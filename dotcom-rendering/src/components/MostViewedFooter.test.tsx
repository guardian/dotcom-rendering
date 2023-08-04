import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { jest } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react';
import { ConfigProvider } from './ConfigContext';
import { responseWithTwoTabs } from './MostViewed.mocks';

jest.unstable_mockModule('../../src/lib/useApi', () => ({
	useApi: jest.fn<typeof import('../lib/useApi').useApi>(),
}));

const { useApi } = (await import('../lib/useApi')) as jest.MockedObject<
	typeof import('../lib/useApi')
>;

const { MostViewedFooterData } = await import(
	'./MostViewedFooterData.importable'
);

const VISIBLE = 'display: block';
const HIDDEN = 'display: none';

describe('MostViewedFooterData', () => {
	beforeEach(() => {
		useApi.mockReset();
	});

	it('should call the api and render the response as expected', async () => {
		useApi.mockReturnValue({ data: responseWithTwoTabs, loading: false });

		const { getByText, getAllByText, getByTestId } = render(
			<ConfigProvider value={{ renderingTarget: 'Web' }}>
				<MostViewedFooterData
					sectionId="Section Name"
					format={{
						theme: Pillar.News,
						design: ArticleDesign.Standard,
						display: ArticleDisplay.Standard,
					}}
					ajaxUrl="https://api.nextgen.guardianapps.co.uk"
					edition="UK"
				/>
			</ConfigProvider>,
		);

		// Calls api once only
		expect(useApi).toHaveBeenCalledTimes(1);

		// Renders all 20 items
		expect(getAllByText(/LINKTEXT/).length).toBe(20);

		// First tab defaults to visible
		expect(getByTestId(responseWithTwoTabs.tabs[0].heading)).toHaveStyle(
			VISIBLE,
		);

		// Prefixes live articles correctly
		expect(getAllByText(/Live/).length).toBe(3);

		// Renders appropriate number of age warnins
		expect(getAllByText(/This article is more than/).length).toBe(3);

		// Handles &nbsp char
		expect(getByText('Across The Guardian')).toBeInTheDocument();
	});

	it('should change the items shown when the associated tab is clicked', async () => {
		useApi.mockReturnValue({ data: responseWithTwoTabs, loading: false });

		const { getByTestId, getByText } = render(
			<ConfigProvider value={{ renderingTarget: 'Web' }}>
				<MostViewedFooterData
					sectionId="Section Name"
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
					ajaxUrl="https://api.nextgen.guardianapps.co.uk"
					edition="UK"
				/>
			</ConfigProvider>,
		);

		const firstHeading = responseWithTwoTabs.tabs[0].heading;
		const secondHeading = responseWithTwoTabs.tabs[1].heading;

		expect(getByTestId(firstHeading)).toHaveStyle(VISIBLE);
		expect(getByTestId(secondHeading)).toHaveStyle(HIDDEN);

		fireEvent.click(getByText(secondHeading));

		expect(getByTestId(firstHeading)).toHaveStyle(HIDDEN);
		expect(getByTestId(secondHeading)).toHaveStyle(VISIBLE);

		// Hardcode this text here because the actual raw data contains $nbsp; which is removed during rendering
		fireEvent.click(getByText('Across The Guardian'));

		expect(getByTestId(firstHeading)).toHaveStyle(VISIBLE);
		expect(getByTestId(secondHeading)).toHaveStyle(HIDDEN);
	});

	it("should display the text 'Live' for live blogs", () => {
		useApi.mockReturnValue({
			data: [
				{
					heading: 'Section header',
					trails: [
						{
							url: '',
							headline: 'Headline',
							showByline: false,
							byline: '',
							image: '',
							isLiveBlog: false, // No longer used
							format: {
								theme: 'NewsPillar',
								design: 'LiveBlogDesign',
								display: 'StandardDisplay',
							},
							pillar: 'news',
							designType: 'not-applicable', // Needed for the type but never used. Will eventually be removed upstream and then here.
						},
					],
				},
			],
			loading: false,
		});

		const { getByText } = render(
			<ConfigProvider value={{ renderingTarget: 'Web' }}>
				<MostViewedFooterData
					sectionId="Section Name"
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
					ajaxUrl="https://api.nextgen.guardianapps.co.uk"
					edition="UK"
				/>
			</ConfigProvider>,
		);

		expect(getByText('Live')).toBeInTheDocument();
	});

	it("should NOT display the text 'Live' when design is Article is false", () => {
		useApi.mockReturnValue({
			data: [
				{
					heading: 'Section header',
					trails: [
						{
							url: '',
							headline: 'Headline',
							showByline: false,
							byline: '',
							image: '',
							isLiveBlog: true, // No longer used
							format: {
								theme: 'NewsPillar',
								design: 'ArticleDesign',
								display: 'StandardDisplay',
							},
							pillar: 'news',
							designType: 'not-applicable', // Needed for the type but never used. Will eventually be removed upstream and then here.
						},
					],
				},
			],
			loading: false,
		});

		const { queryByText } = render(
			<ConfigProvider value={{ renderingTarget: 'Web' }}>
				<MostViewedFooterData
					sectionId="Section Name"
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
					ajaxUrl="https://api.nextgen.guardianapps.co.uk"
					edition="UK"
				/>
			</ConfigProvider>,
		);

		expect(queryByText('Live')).not.toBeInTheDocument();
	});

	it('should render the Ophan data link names as expected', async () => {
		useApi.mockReturnValue({ data: responseWithTwoTabs, loading: false });

		const { asFragment } = render(
			<ConfigProvider value={{ renderingTarget: 'Web' }}>
				<MostViewedFooterData
					sectionId="Section Name"
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
					ajaxUrl="https://api.nextgen.guardianapps.co.uk"
					edition="UK"
				/>
			</ConfigProvider>,
		);

		// Renders tab data link name
		// expect(
		//	asFragment().querySelectorAll('[data-link-name="in Music"]').length,
		// ).toBe(1); // Should add the data-link-name for Section Name tab */

		// Renders Trail data-link-names
		expect(
			asFragment().querySelectorAll('[data-link-name*="| text"]').length,
		).toBe(20); // Total stories in Related Footer (*= selector contains) (both tabs)

		expect(
			asFragment().querySelectorAll('[data-link-name="1 | text"]').length,
		).toBe(2); // 1 indexed so should start at 1, one for each tab

		expect(
			asFragment().querySelectorAll('[data-link-name="0 | text"]').length,
		).toBe(0); // 1 indexed so should start at 1

		// most commented
		expect(
			asFragment().querySelectorAll(
				'[data-link-name="comment | group-0 | card-@1"]',
			).length,
		).toBe(1);

		// most shared
		expect(
			asFragment().querySelectorAll(
				'[data-link-name="news | group-0 | card-@1"]',
			).length,
		).toBe(1);
	});
});
