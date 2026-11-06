import type { ComponentEvent } from '@guardian/ophan-tracker-js';
import { SecondaryCtaType } from '@guardian/support-dotcom-components';
import type {
	BannerProps,
	ConfigurableDesign,
	HexColour,
	TickerName,
} from '@guardian/support-dotcom-components/dist/shared/types';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import type { BannerRenderProps } from '../../common/types';
import { BannerComponent, BannerUnvalidated } from '../exports';

jest.mock('../../../../../lib/useMatchMedia', () => ({
	useMatchMedia: jest.fn(() => true),
	removeMediaRulePrefix: jest.fn(() => ''),
}));

const hex = (r: string, g: string, b: string): HexColour =>
	({
		r,
		g,
		b,
		kind: 'hex',
	}) as HexColour;

const mockProps: BannerRenderProps = {
	onCtaClick: jest.fn(),
	onSecondaryCtaClick: jest.fn(),
	onNotNowClick: jest.fn(),
	onCloseClick: jest.fn(),
	onCollapseClick: jest.fn(),
	onExpandClick: jest.fn(),
	submitComponentEvent: jest.fn(() => Promise.resolve()),
	reminderTracking: {
		onReminderCtaClick: jest.fn(),
		onReminderSetClick: jest.fn(),
		onReminderCloseClick: jest.fn(),
	},
	content: {
		mainContent: {
			heading: <span>Main Heading</span>,
			paragraphs: [<span key="1">Main Paragraph 1</span>],
			highlightedText: <span>Main Highlighted</span>,
			primaryCta: {
				ctaText: 'Main CTA',
				ctaUrl: 'https://example.com/main',
			},
			secondaryCta: null,
		},
		mobileContent: {
			heading: <span>Mobile Heading</span>,
			paragraphs: [<span key="1">Mobile Paragraph 1</span>],
			highlightedText: null,
			primaryCta: {
				ctaText: 'Mobile CTA',
				ctaUrl: 'https://example.com/mobile',
			},
			secondaryCta: null,
		},
	},
	tracking: {
		abTestName: 'test',
		abTestVariant: 'variant',
		campaignCode: 'campaign',
		componentType: 'ACQUISITIONS_HEADER',
		products: [],
		ophanPageId: 'page-id',
		platformId: 'platform-id',
		referrerUrl: 'referrer-url',
	},
	articleCounts: {
		forTargetedWeeks: 0,
		for52Weeks: 0,
	},
	design: {
		colours: {
			basic: {
				background: hex('F6', 'F6', 'F6'),
				bodyText: hex('12', '12', '12'),
				headerText: hex('12', '12', '12'),
				articleCountText: hex('12', '12', '12'),
				logo: hex('05', '29', '62'),
			},
			primaryCta: {
				default: {
					background: hex('05', '29', '62'),
					text: hex('FF', 'FF', 'FF'),
				},
			},
			secondaryCta: {
				default: {
					background: hex('FF', 'FF', 'FF'),
					text: hex('05', '29', '62'),
					border: hex('05', '29', '62'),
				},
			},
			highlightedText: {
				text: hex('12', '12', '12'),
				highlight: hex('FF', 'E5', '00'),
			},
			closeButton: {
				default: {
					background: hex('FF', 'FF', 'FF'),
					text: hex('05', '29', '62'),
					border: hex('05', '29', '62'),
				},
			},
			ticker: {
				filledProgress: hex('05', '29', '62'),
				progressBarBackground: hex('FF', 'FF', 'FF'),
				headlineColour: hex('12', '12', '12'),
				totalColour: hex('05', '29', '62'),
				goalColour: hex('05', '29', '62'),
			},
		},
	},
	bannerChannel: 'contributions',
};

describe('DesignableBanner V2', () => {
	it('renders the banner with heading and body', () => {
		render(<BannerComponent {...mockProps} />);

		expect(screen.getByText('Main Heading')).toBeInTheDocument();
		expect(screen.getByText('Main Paragraph 1')).toBeInTheDocument();
		expect(screen.getByText('Main Highlighted')).toBeInTheDocument();
	});

	it('calls onCtaClick when the primary CTA is clicked', () => {
		render(<BannerComponent {...mockProps} />);

		const cta = screen.getByText('Main CTA');
		fireEvent.click(cta);

		expect(mockProps.onCtaClick).toHaveBeenCalled();
	});

	it('calls onCloseClick when the close button is clicked', () => {
		render(<BannerComponent {...mockProps} />);

		const closeButton = screen.getByRole('button', {
			name: /Close/i,
		});
		fireEvent.click(closeButton);

		expect(mockProps.onCloseClick).toHaveBeenCalled();
	});

	it('renders as uncollapsed by default when isCollapsible is true', () => {
		render(<BannerComponent {...mockProps} isCollapsible={true} />);

		// Now starts uncollapsed by default
		expect(screen.getByText('Main Paragraph 1')).toBeInTheDocument();
		expect(screen.getByText('Main Heading')).toBeInTheDocument();
	});

	it('toggles collapse when the toggle button is clicked', () => {
		render(<BannerComponent {...mockProps} isCollapsible={true} />);

		// Starts uncollapsed
		expect(screen.getByText('Main Paragraph 1')).toBeInTheDocument();

		const toggleButton = screen.getByRole('button', {
			name: /Collapse banner/i,
		});
		fireEvent.click(toggleButton);

		// Now should be collapsed
		expect(screen.queryByText('Main Paragraph 1')).not.toBeInTheDocument();
		expect(mockProps.onCollapseClick).toHaveBeenCalled();
	});

	it('renders the ticker when tickerSettings are provided', () => {
		const tickerProps: BannerRenderProps = {
			...mockProps,
			tickerSettings: {
				name: 'US_2024' as TickerName,
				tickerData: { total: 100, goal: 200 },
				currencySymbol: '£',
				copy: {
					countLabel: 'Total raised',
					goalCopy: 'Goal',
				},
			},
		};

		render(<BannerComponent {...tickerProps} />);

		// Ticker is a complex component, we just check if the container is there
		// or if we should mock it. For now, let's see if it renders something recognizable.
		expect(screen.getByText('Total raised')).toBeInTheDocument();
	});

	it('renders choice cards when choiceCardSettings are provided', () => {
		const choiceCardProps: BannerRenderProps = {
			...mockProps,
			choiceCardsSettings: {
				choiceCards: [
					{
						product: {
							supportTier: 'Contribution',
							ratePlan: 'Monthly',
						},
						label: '£10',
						isDefault: true,
						benefits: [],
					},
					{
						product: {
							supportTier: 'Contribution',
							ratePlan: 'Monthly',
						},
						label: '£20',
						isDefault: false,
						benefits: [],
					},
				],
			},
			design: {
				...mockProps.design!,
				visual: {
					kind: 'ChoiceCards',
					buttonColour: hex('FF', 'FF', 'FF'),
					buttonTextColour: hex('00', '00', '00'),
					buttonBorderColour: hex('00', '00', '00'),
					buttonSelectColour: hex('00', '00', '00'),
					buttonSelectTextColour: hex('FF', 'FF', 'FF'),
					buttonSelectBorderColour: hex('00', '00', '00'),
				} as ConfigurableDesign['visual'],
			},
		};

		render(<BannerComponent {...choiceCardProps} />);

		expect(screen.getByRole('radio', { name: /£10/ })).toBeChecked();
		expect(screen.getByRole('radio', { name: /£20/ })).not.toBeChecked();
		expect(screen.getAllByRole('radio')).toHaveLength(2);
	});

	it('renders article count when separateArticleCount is true and >= 5 articles', () => {
		const articleCountProps: BannerRenderProps = {
			...mockProps,
			separateArticleCount: true,
			articleCounts: {
				forTargetedWeeks: 5,
				for52Weeks: 10,
			},
		};

		render(<BannerComponent {...articleCountProps} />);

		// We look for the article count text
		// Usually it's something like "You've read 5 articles..."
		expect(screen.getByText(/You've read/)).toBeInTheDocument();
		expect(screen.getByText(/5/)).toBeInTheDocument();
	});

	it('does not render article count when separateArticleCount is true but user has read < 5 articles', () => {
		const articleCountProps: BannerRenderProps = {
			...mockProps,
			separateArticleCount: true,
			articleCounts: {
				forTargetedWeeks: 4,
				for52Weeks: 10,
			},
		};

		render(<BannerComponent {...articleCountProps} />);

		// Should not be in the document
		expect(screen.queryByText(/You've read/)).not.toBeInTheDocument();
		expect(screen.queryByText(/4/)).not.toBeInTheDocument();
	});
});

describe('DesignableBanner tracking through BannerWrapper', () => {
	const bannerProps: BannerProps = {
		tracking: {
			...mockProps.tracking,
			componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
		},
		bannerChannel: mockProps.bannerChannel,
		articleCounts: mockProps.articleCounts,
		design: mockProps.design,
		countryCode: 'GB',
		content: {
			heading: 'Support journalism',
			paragraphs: ['Reader support makes our journalism possible.'],
			cta: {
				text: 'Support us',
				baseUrl: 'https://support.theguardian.com/contribute',
			},
			secondaryCta: {
				type: SecondaryCtaType.Custom,
				cta: {
					text: 'Other ways to support',
					baseUrl: 'https://support.theguardian.com',
				},
			},
		},
	};
	const primaryClickEvent: ComponentEvent = {
		action: 'CLICK',
		component: {
			id: 'designable-banner : cta',
			componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
			campaignCode: 'campaign',
			products: [],
			labels: [],
		},
		abTest: { name: 'test', variant: 'variant' },
	};

	it.each([
		{ scenario: 'standard CTA', cardDefault: undefined },
		{ scenario: 'choice cards without a selection', cardDefault: false },
		{ scenario: 'choice cards with a selection', cardDefault: true },
	])('submits one Ophan CLICK for $scenario', ({ cardDefault }) => {
		const submitComponentEvent = jest
			.fn<Promise<void>, [ComponentEvent]>()
			.mockResolvedValue(undefined);
		render(
			<BannerUnvalidated
				{...bannerProps}
				submitComponentEvent={submitComponentEvent}
				design={
					cardDefault === undefined
						? bannerProps.design
						: {
								...bannerProps.design!,
								visual: { kind: 'ChoiceCards' },
							}
				}
				choiceCardsSettings={
					cardDefault === undefined
						? undefined
						: {
								choiceCards: [
									{
										product: {
											supportTier: 'SupporterPlus',
											ratePlan: 'Monthly',
										},
										destination: 'Checkout',
										label: 'Monthly support',
										isDefault: cardDefault,
										benefits: [],
									},
								],
							}
				}
			/>,
		);
		if (cardDefault !== undefined) {
			expect(screen.getByRole('radio')).toHaveProperty(
				'checked',
				cardDefault,
			);
		}
		// Exclude the INSERT event emitted when the banner mounts.
		submitComponentEvent.mockClear();

		fireEvent.click(
			screen.getByRole('link', {
				name: cardDefault === undefined ? 'Support us' : 'Continue',
			}),
		);

		expect(submitComponentEvent).toHaveBeenCalledTimes(1);
		expect(submitComponentEvent).toHaveBeenCalledWith(primaryClickEvent);
		expect(screen.queryByRole('alert')).not.toBeInTheDocument();
	});

	it.each([
		{
			role: 'link',
			name: 'Other ways to support',
			component: 'secondary-cta',
		},
		{ role: 'button', name: 'Close', component: 'close' },
	])('submits one Ophan CLICK for $name', ({ role, name, component }) => {
		const submitComponentEvent = jest
			.fn<Promise<void>, [ComponentEvent]>()
			.mockResolvedValue(undefined);
		render(
			<BannerUnvalidated
				{...bannerProps}
				submitComponentEvent={submitComponentEvent}
			/>,
		);
		submitComponentEvent.mockClear();

		fireEvent.click(screen.getByRole(role, { name }));

		expect(submitComponentEvent).toHaveBeenCalledTimes(1);
		expect(submitComponentEvent).toHaveBeenCalledWith({
			...primaryClickEvent,
			component: {
				...primaryClickEvent.component,
				id: `designable-banner : ${component}`,
			},
		});
		expect(screen.queryByRole('alert')).not.toBeInTheDocument();
	});

	it('tracks collapse and expand once while retaining the banner', () => {
		const submitComponentEvent = jest
			.fn<Promise<void>, [ComponentEvent]>()
			.mockResolvedValue(undefined);
		render(
			<BannerUnvalidated
				{...bannerProps}
				isCollapsible={true}
				submitComponentEvent={submitComponentEvent}
			/>,
		);
		submitComponentEvent.mockClear();

		fireEvent.click(
			screen.getByRole('button', { name: 'Collapse banner' }),
		);
		expect(
			screen.queryByText('Reader support makes our journalism possible.'),
		).not.toBeInTheDocument();
		fireEvent.click(screen.getByRole('button', { name: 'Expand banner' }));
		expect(
			screen.getByText('Reader support makes our journalism possible.'),
		).toBeInTheDocument();

		expect(submitComponentEvent.mock.calls).toEqual(
			['collapse', 'expand'].map((component) => [
				{
					...primaryClickEvent,
					component: {
						...primaryClickEvent.component,
						id: `designable-banner : ${component}`,
					},
				},
			]),
		);
		expect(screen.getByRole('alert')).toBeInTheDocument();
	});
});
