import type { OphanComponentType } from '@guardian/libs';
import type {
	ConfigurableDesign,
	HexColour,
	TickerName,
} from '@guardian/support-dotcom-components/dist/shared/types';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import type { BannerRenderProps } from '../../../common/types';
import {
	BannerArticleCount,
	BannerBody,
	BannerChoiceCards,
	BannerCloseButton,
	BannerComponent,
	BannerContent,
	BannerCtas,
	BannerHeader,
	BannerTicker,
} from '../index';

jest.mock('../../../../../../lib/useMatchMedia', () => ({
	useMatchMedia: jest.fn(() => true),
	removeMediaRulePrefix: jest.fn(() => ''),
}));

const hex = (r: string, g: string, b: string): HexColour =>
	({
		r,
		g,
		b,
		kind: 'hex',
	}) as any;

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
		componentType: 'ACQUISITIONS_HEADER' as OphanComponentType,
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
	} as ConfigurableDesign,
	bannerChannel: 'contributions',
};

describe('DesignableBanner V2', () => {
	it('renders the banner with heading and body', () => {
		render(
			<BannerComponent {...mockProps}>
				<BannerContent>
					<BannerHeader />
					<BannerBody />
					<BannerCtas />
				</BannerContent>
			</BannerComponent>,
		);

		expect(screen.getByText('Main Heading')).toBeInTheDocument();
		expect(screen.getByText('Main Paragraph 1')).toBeInTheDocument();
		expect(screen.getByText('Main Highlighted')).toBeInTheDocument();
	});

	it('calls onCtaClick when the primary CTA is clicked', () => {
		render(
			<BannerComponent {...mockProps}>
				<BannerContent>
					<BannerCtas />
				</BannerContent>
			</BannerComponent>,
		);

		const cta = screen.getByText('Main CTA');
		fireEvent.click(cta);

		expect(mockProps.onCtaClick).toHaveBeenCalled();
	});

	it('calls onCloseClick when the close button is clicked', () => {
		render(
			<BannerComponent {...mockProps}>
				<BannerCloseButton />
			</BannerComponent>,
		);

		const closeButton = screen.getByRole('button', { name: /Close/i });
		fireEvent.click(closeButton);

		expect(mockProps.onCloseClick).toHaveBeenCalled();
	});

	it('renders as collapsed when isCollapsible is true', () => {
		render(
			<BannerComponent {...mockProps} isCollapsible={true}>
				<BannerContent>
					<BannerHeader />
					<BannerBody />
				</BannerContent>
			</BannerComponent>,
		);

		// When collapsed, the body is usually hidden or different
		// Based on BannerBody.tsx: {!isCollapsed && (...)}
		expect(screen.queryByText('Main Paragraph 1')).not.toBeInTheDocument();
		// Header renders mobile content when collapsed
		expect(screen.getByText('Mobile Heading')).toBeInTheDocument();
	});

	it('toggles collapse when the toggle button is clicked', () => {
		render(
			<BannerComponent {...mockProps} isCollapsible={true}>
				<BannerHeader />
				<BannerBody />
				<BannerCloseButton />
			</BannerComponent>,
		);

		expect(screen.queryByText('Main Paragraph 1')).not.toBeInTheDocument();

		const toggleButton = screen.getByRole('button', {
			name: /Expand banner/i,
		});
		fireEvent.click(toggleButton);

		expect(screen.getByText('Main Paragraph 1')).toBeInTheDocument();
		expect(mockProps.onExpandClick).toHaveBeenCalled();
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

		render(
			<BannerComponent {...tickerProps}>
				<BannerTicker />
			</BannerComponent>,
		);

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
			} as any,
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
				} as any,
			},
		};

		render(
			<BannerComponent {...choiceCardProps}>
				<BannerChoiceCards />
			</BannerComponent>,
		);

		expect(screen.getByText('£10')).toBeInTheDocument();
		expect(screen.getByText('£20')).toBeInTheDocument();
	});

	it('renders article count when separateArticleCount is true', () => {
		const articleCountProps: BannerRenderProps = {
			...mockProps,
			separateArticleCount: true,
			articleCounts: {
				forTargetedWeeks: 5,
				for52Weeks: 10,
			},
		};

		render(
			<BannerComponent {...articleCountProps}>
				<BannerArticleCount />
			</BannerComponent>,
		);

		// We look for the article count text
		// Usually it's something like "You've read 5 articles..."
		expect(screen.getByText(/You've read/)).toBeInTheDocument();
		expect(screen.getByText(/5/)).toBeInTheDocument();
	});
});
