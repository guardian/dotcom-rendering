import type { ChoiceCard } from '@guardian/support-dotcom-components/dist/shared/types/props/choiceCards';
import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { ThreeTierChoiceCards } from './ThreeTierChoiceCards';

// Mock choice cards for testing
const mockChoiceCards: (ChoiceCard & { defaultExpanded?: boolean })[] = [
	{
		product: {
			supportTier: 'Contribution',
			ratePlan: 'Monthly',
		},
		label: 'Support £5/month',
		isDefault: false,
		benefits: [
			{
				copy: 'Give to the Guardian every month with Support',
			},
		],
	},
	{
		product: {
			supportTier: 'SupporterPlus',
			ratePlan: 'Monthly',
		},
		label: 'Support £12/month',
		isDefault: false,
		defaultExpanded: true, // This card is expanded by default but not selected
		benefitsLabel: 'Unlock All-access digital benefits:',
		benefits: [
			{ copy: 'Unlimited access to the Guardian app' },
			{ copy: 'Ad-free reading on all your devices' },
		],
	},
	{
		product: {
			supportTier: 'OneOff',
		},
		label: `Support with another amount`,
		isDefault: false,
		benefits: [
			{
				copy: 'We welcome support of any size, any time',
			},
		],
	},
];

describe('ThreeTierChoiceCards', () => {
	it('should handle default expanded card correctly', () => {
		const TestComponent = () => {
			const [selectedChoiceCard, setSelectedChoiceCard] = useState<
				ChoiceCard | undefined
			>();

			return (
				<ThreeTierChoiceCards
					selectedChoiceCard={selectedChoiceCard}
					setSelectedChoiceCard={setSelectedChoiceCard}
					choices={mockChoiceCards}
					id="banner"
				/>
			);
		};

		render(<TestComponent />);

		// Initially, the SupporterPlus card should be expanded (defaultExpanded: true)
		// but no card should be selected
		const supporterPlusCard = screen.getByText('Support £12/month');
		expect(supporterPlusCard).toBeInTheDocument();

		// Check that benefits are shown for the default expanded card
		expect(
			screen.getByText('Unlock All-access digital benefits:'),
		).toBeInTheDocument();
		expect(
			screen.getByText('Unlimited access to the Guardian app'),
		).toBeInTheDocument();
	});

	it('should only select and expand the clicked card', () => {
		const TestComponent = () => {
			const [selectedChoiceCard, setSelectedChoiceCard] = useState<
				ChoiceCard | undefined
			>();

			return (
				<ThreeTierChoiceCards
					selectedChoiceCard={selectedChoiceCard}
					setSelectedChoiceCard={setSelectedChoiceCard}
					choices={mockChoiceCards}
					id="banner"
				/>
			);
		};

		render(<TestComponent />);

		// Initially, SupporterPlus card is expanded but not selected
		expect(
			screen.getByText('Unlock All-access digital benefits:'),
		).toBeInTheDocument();

		// Click on the first card (Contribution)
		const contributionCard = screen.getByText('Support £5/month');
		fireEvent.click(contributionCard);

		// Now the Contribution card should be selected and expanded
		// The previously expanded SupporterPlus card should collapse
		expect(
			screen.getByText('Give to the Guardian every month with Support'),
		).toBeInTheDocument();

		// The SupporterPlus benefits should no longer be visible
		expect(
			screen.queryByText('Unlock All-access digital benefits:'),
		).not.toBeInTheDocument();
	});

	it('should only have one card selected at any time', () => {
		const TestComponent = () => {
			const [selectedChoiceCard, setSelectedChoiceCard] = useState<
				ChoiceCard | undefined
			>();

			return (
				<ThreeTierChoiceCards
					selectedChoiceCard={selectedChoiceCard}
					setSelectedChoiceCard={setSelectedChoiceCard}
					choices={mockChoiceCards}
					id="banner"
				/>
			);
		};

		render(<TestComponent />);

		// Click on the first card
		const contributionCard = screen.getByText('Support £5/month');
		fireEvent.click(contributionCard);

		// Only one card should have the checked state
		const checkedRadios = screen.getAllByRole('radio', { checked: true });
		expect(checkedRadios).toHaveLength(1);

		// Click on the third card
		const oneOffCard = screen.getByText('Support with another amount');
		fireEvent.click(oneOffCard);

		// Still only one card should be checked
		const checkedRadiosAfter = screen.getAllByRole('radio', {
			checked: true,
		});
		expect(checkedRadiosAfter).toHaveLength(1);

		// The checked radio should be the OneOff card
		expect(checkedRadiosAfter[0]).toBeChecked();
		expect(checkedRadiosAfter[0]).toHaveAttribute(
			'value',
			'choicecard-banner-OneOff',
		);
	});
});
