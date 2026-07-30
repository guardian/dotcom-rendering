import type { ChoiceCard } from '@guardian/support-dotcom-components/dist/shared/types/props/choiceCards';
import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { ThreeTierChoiceCards } from './ThreeTierChoiceCards';

// Mock choice cards for testing
const mockChoiceCards: Array<ChoiceCard & { defaultExpanded?: boolean }> = [
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

		// The checked radio should be the OneOff card. Its value is unique per
		// card (index-suffixed) so duplicate supportTiers cannot collide.
		expect(checkedRadiosAfter[0]).toBeChecked();
		expect(checkedRadiosAfter[0]).toHaveAttribute(
			'value',
			'choicecard-banner-OneOff-2',
		);
	});

	it('renders unique ids/values and selects only the chosen card when two OneOff cards are present', () => {
		const duplicateOneOffCards: Array<
			ChoiceCard & { defaultExpanded?: boolean }
		> = [
			{
				product: { supportTier: 'OneOff' },
				label: 'One-time 1',
				isDefault: true,
				benefits: [
					{ copy: 'We welcome support of any size, any time' },
				],
			},
			{
				product: { supportTier: 'OneOff' },
				label: 'One-time 2',
				isDefault: false,
				benefits: [
					{ copy: 'We welcome support of any size, any time' },
				],
			},
		];

		const TestComponent = () => {
			const [selectedChoiceCard, setSelectedChoiceCard] = useState<
				ChoiceCard | undefined
			>(duplicateOneOffCards[0]);

			return (
				<ThreeTierChoiceCards
					selectedChoiceCard={selectedChoiceCard}
					setSelectedChoiceCard={setSelectedChoiceCard}
					choices={duplicateOneOffCards}
					id="banner"
				/>
			);
		};

		render(<TestComponent />);

		const radios = screen.getAllByRole('radio');

		// Each radio has a unique id and value
		const ids = radios.map((r) => r.getAttribute('id'));
		const values = radios.map((r) => r.getAttribute('value'));
		expect(new Set(ids).size).toBe(ids.length);
		expect(new Set(values).size).toBe(values.length);

		// Every label[for] points at a real radio id, and the set of
		// labels' targets is exactly the set of radio ids (no cross-card
		// association). Note: each card has two labels (outer card label +
		// inner Radio label), so labelFors may repeat a valid id.
		const labels = document.querySelectorAll('label[for]');
		const labelFors = Array.from(labels).map((l) => l.getAttribute('for'));
		for (const forAttr of labelFors) {
			expect(ids).toContain(forAttr);
		}
		expect(new Set(labelFors)).toEqual(new Set(ids));

		// Only the default (card 1) is checked initially; card 2 is not
		expect(radios[0]).toBeChecked();
		expect(radios[1]).not.toBeChecked();

		// Clicking card 2 selects only card 2
		fireEvent.click(screen.getByText('One-time 2'));
		expect(radios[1]).toBeChecked();
		expect(radios[0]).not.toBeChecked();
	});

	it('applies the same uniqueness/selection guarantees in the epic context (id="epic")', () => {
		// The component is shared, but the `id` prop seeds
		// the radio id/name strings, so verify it directly.
		const duplicateOneOffCards: Array<
			ChoiceCard & {
				defaultExpanded?: boolean;
			}
		> = [
			{
				product: { supportTier: 'OneOff' },
				label: 'One-time 1',
				isDefault: true,
				benefits: [
					{ copy: 'We welcome support of any size, any time' },
				],
			},
			{
				product: { supportTier: 'OneOff' },
				label: 'One-time 2',
				isDefault: false,
				benefits: [
					{ copy: 'We welcome support of any size, any time' },
				],
			},
		];

		const TestComponent = () => {
			const [selectedChoiceCard, setSelectedChoiceCard] = useState<
				ChoiceCard | undefined
			>(duplicateOneOffCards[0]);

			return (
				<ThreeTierChoiceCards
					selectedChoiceCard={selectedChoiceCard}
					setSelectedChoiceCard={setSelectedChoiceCard}
					choices={duplicateOneOffCards}
					id="epic"
				/>
			);
		};

		render(<TestComponent />);

		const radios = screen.getAllByRole('radio');
		const ids = radios.map((r) => r.getAttribute('id'));
		const values = radios.map((r) => r.getAttribute('value'));

		// (Epic): unique ids and values, seeded with "epic"
		expect(new Set(ids).size).toBe(ids.length);
		expect(new Set(values).size).toBe(values.length);
		expect(ids[0]).toBe('choicecard-epic-OneOff-0');
		expect(values[0]).toBe('choicecard-epic-OneOff-0');

		// (Epic): only the default card is checked initially
		expect(radios[0]).toBeChecked();
		expect(radios[1]).not.toBeChecked();

		fireEvent.click(screen.getByText('One-time 2'));
		expect(radios[1]).toBeChecked();
		expect(radios[0]).not.toBeChecked();
	});

	it('does not emit a duplicate-key warning for duplicate supportTiers', () => {
		// React keys must be unique per card; a duplicate key only surfaces as
		// a console.error warning (not DOM breakage), so assert on the warning
		// to guard the key={radioId} choice against regression.
		const duplicateOneOffCards: Array<
			ChoiceCard & {
				defaultExpanded?: boolean;
			}
		> = [
			{
				product: { supportTier: 'OneOff' },
				label: 'One-time 1',
				isDefault: true,
				benefits: [
					{ copy: 'We welcome support of any size, any time' },
				],
			},
			{
				product: { supportTier: 'OneOff' },
				label: 'One-time 2',
				isDefault: false,
				benefits: [
					{ copy: 'We welcome support of any size, any time' },
				],
			},
		];

		const consoleErrorSpy = jest
			.spyOn(console, 'error')
			.mockImplementation(() => {});

		const TestComponent = () => {
			const [selectedChoiceCard, setSelectedChoiceCard] = useState<
				ChoiceCard | undefined
			>(duplicateOneOffCards[0]);

			return (
				<ThreeTierChoiceCards
					selectedChoiceCard={selectedChoiceCard}
					setSelectedChoiceCard={setSelectedChoiceCard}
					choices={duplicateOneOffCards}
					id="banner"
				/>
			);
		};

		render(<TestComponent />);

		const duplicateKeyCalls = consoleErrorSpy.mock.calls.filter((args) =>
			String(args[0]).includes(
				'Encountered two children with the same key',
			),
		);
		expect(duplicateKeyCalls).toHaveLength(0);

		consoleErrorSpy.mockRestore();
	});

	it('selects the default card when selectedChoiceCard is a stale reference from a previous array identity', () => {
		// Regression: useMatchMedia resolves after mount, so the banner/epic
		// switches from mobileChoiceCards to choiceCards. The initial default
		// (captured via useState from the first array) then no longer
		// reference-matches any card, so reference-only selection leaves
		// nothing selected. A structurally equal card must still be selected.
		const staleSelected: ChoiceCard = {
			product: { supportTier: 'SupporterPlus', ratePlan: 'Monthly' },
			label: 'Support £12/month',
			isDefault: true,
			benefits: [
				{ copy: 'Unlimited access to the Guardian app' },
				{ copy: 'Ad-free reading on all your devices' },
			],
		};

		render(
			<ThreeTierChoiceCards
				selectedChoiceCard={staleSelected}
				setSelectedChoiceCard={() => {}}
				choices={mockChoiceCards}
				id="banner"
			/>,
		);

		const radios = screen.getAllByRole('radio');
		expect(radios[0]).not.toBeChecked(); // Contribution
		expect(radios[1]).toBeChecked(); // SupporterPlus (value-matches stale ref)
		expect(radios[2]).not.toBeChecked(); // OneOff
	});

	it('resolves a stale reference to the correct card when duplicates exist', () => {
		// With two OneOff cards, a stale selectedChoiceCard must resolve by
		// value (product + label) to the matching card only — not both.
		const duplicateOneOffCards: Array<
			ChoiceCard & { defaultExpanded?: boolean }
		> = [
			{
				product: { supportTier: 'OneOff' },
				label: 'One-time 1',
				isDefault: true,
				benefits: [
					{ copy: 'We welcome support of any size, any time' },
				],
			},
			{
				product: { supportTier: 'OneOff' },
				label: 'One-time 2',
				isDefault: false,
				benefits: [
					{ copy: 'We welcome support of any size, any time' },
				],
			},
		];

		const staleSelected: ChoiceCard = {
			// Matches the SECOND card by value — product alone cannot
			// distinguish the duplicates, so this asserts the label
			// participates in the structural match.
			product: { supportTier: 'OneOff' },
			label: 'One-time 2',
			isDefault: false,
			benefits: [{ copy: 'We welcome support of any size, any time' }],
		};

		render(
			<ThreeTierChoiceCards
				selectedChoiceCard={staleSelected}
				setSelectedChoiceCard={() => {}}
				choices={duplicateOneOffCards}
				id="banner"
			/>,
		);

		const radios = screen.getAllByRole('radio');
		expect(radios[0]).not.toBeChecked(); // One-time 1
		expect(radios[1]).toBeChecked(); // One-time 2
	});

	it('distinguishes cards with identical product and label by reference when clicked', () => {
		// When duplicates are fully identical (same product AND label), value
		// comparison cannot tell them apart — selection after a click must
		// follow the clicked card only.
		const identicalCards: Array<
			ChoiceCard & { defaultExpanded?: boolean }
		> = [
			{
				product: { supportTier: 'OneOff' },
				label: 'One-time',
				isDefault: true,
				benefits: [
					{ copy: 'We welcome support of any size, any time' },
				],
			},
			{
				product: { supportTier: 'OneOff' },
				label: 'One-time',
				isDefault: false,
				benefits: [
					{ copy: 'We welcome support of any size, any time' },
				],
			},
		];

		const TestComponent = () => {
			const [selectedChoiceCard, setSelectedChoiceCard] = useState<
				ChoiceCard | undefined
			>(identicalCards[0]);

			return (
				<ThreeTierChoiceCards
					selectedChoiceCard={selectedChoiceCard}
					setSelectedChoiceCard={setSelectedChoiceCard}
					choices={identicalCards}
					id="banner"
				/>
			);
		};

		render(<TestComponent />);

		const radios = screen.getAllByRole('radio');
		expect(radios).toHaveLength(2);
		const [firstRadio, secondRadio] = radios as [HTMLElement, HTMLElement];
		expect(firstRadio).toBeChecked();
		expect(secondRadio).not.toBeChecked();

		fireEvent.click(secondRadio);
		expect(secondRadio).toBeChecked();
		expect(firstRadio).not.toBeChecked();
	});
});
