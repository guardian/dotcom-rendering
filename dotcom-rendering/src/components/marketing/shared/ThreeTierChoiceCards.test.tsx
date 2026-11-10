import type { ChoiceCard } from '@guardian/support-dotcom-components/dist/shared/types/props/choiceCards';
import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import type { ChoiceCardDesignSettings } from '../banners/designableBanner/settings';
import { ThreeTierChoiceCards } from './ThreeTierChoiceCards';

const cardCssForRadio = (radio: HTMLElement): string => {
	const classNames = new Set<string>();
	let element: HTMLElement | null = radio;
	while (element) {
		for (const className of element.classList) {
			classNames.add(className);
		}
		element = element.parentElement;
	}

	const rules = Array.from(document.styleSheets).flatMap((sheet) =>
		Array.from(sheet.cssRules).map((rule) => rule.cssText),
	);
	const cardStyleRule = rules.find(
		(rule) =>
			rule.includes('box-shadow') &&
			rule.includes('background-color') &&
			Array.from(classNames).some((className) =>
				rule.includes(`.${className}`),
			),
	);
	const cardStyleClassName = Array.from(classNames).find(
		(className) => cardStyleRule?.includes(`.${className}`) === true,
	);
	if (cardStyleClassName === undefined) return '';
	return rules
		.filter((rule) => rule.includes(`.${cardStyleClassName}`))
		.join('\n');
};

const benefitsContainerFor = (copy: string) =>
	screen.getByText(copy).closest('[aria-hidden]');

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
	const translucentDesign = {
		buttonColour: '#FFFFFF',
		buttonOpacity: 0.8,
		buttonTextColour: '#121212',
		buttonBorderColour: '#121212',
		buttonSelectColour: '#FFFFFF',
		buttonSelectOpacity: 0.95,
		buttonSelectTextColour: '#606060',
		buttonSelectBorderColour: '#121212',
	};

	const renderStyledCards = (
		choiceCardDesignSettings: ChoiceCardDesignSettings = translucentDesign,
	) =>
		render(
			<ThreeTierChoiceCards
				selectedChoiceCard={mockChoiceCards[0]}
				setSelectedChoiceCard={jest.fn()}
				choices={mockChoiceCards}
				id="banner"
				choiceCardDesignSettings={choiceCardDesignSettings}
			/>,
		);

	it('renders the selected fill, text, and 2px stroke at configured values', () => {
		renderStyledCards();

		const selectedRadio = screen.getByRole('radio', {
			name: /Support £5\/month/,
		});
		const selectedCss = cardCssForRadio(selectedRadio);

		expect(selectedCss).toContain(
			'background-color: rgba(255, 255, 255, 0.95)',
		);
		expect(selectedCss).toContain('color: #606060');
		expect(selectedCss).toContain('inset 0 0 0 2px #121212');
	});

	it('renders the unselected fill and 1px stroke at configured values', () => {
		renderStyledCards();

		const unselectedRadio = screen.getByRole('radio', {
			name: /Support £12\/month/,
		});
		const unselectedCss = cardCssForRadio(unselectedRadio);

		expect(unselectedCss).toContain(
			'background-color: rgba(255, 255, 255, 0.8)',
		);
		expect(unselectedCss).toContain('inset 0 0 0 1px #121212');
	});

	it('uses the selected fill for the unselected card hover state', () => {
		renderStyledCards();

		const unselectedRadio = screen.getByRole('radio', {
			name: /Support £12\/month/,
		});
		const cardCss = cardCssForRadio(unselectedRadio);

		expect(cardCss).toContain(':hover');
		expect(cardCss).toContain(
			'background-color: rgba(255, 255, 255, 0.95)',
		);
	});

	it('does not select an unselected radio on hover', () => {
		renderStyledCards();

		const unselectedRadio = screen.getByRole('radio', {
			name: /Support £12\/month/,
		});

		expect(unselectedRadio).not.toBeChecked();
		fireEvent.mouseOver(unselectedRadio);
		expect(unselectedRadio).not.toBeChecked();
	});

	it('keeps legacy fills opaque and does not add a hover fill', () => {
		renderStyledCards({
			buttonColour: '#FFFFFF',
			buttonTextColour: '#121212',
			buttonBorderColour: '#121212',
			buttonSelectColour: '#FFFFFF',
			buttonSelectTextColour: '#606060',
			buttonSelectBorderColour: '#121212',
		});

		const selectedRadio = screen.getByRole('radio', {
			name: /Support £5\/month/,
		});
		const unselectedRadio = screen.getByRole('radio', {
			name: /Support £12\/month/,
		});
		const selectedCss = cardCssForRadio(selectedRadio);
		const unselectedCss = cardCssForRadio(unselectedRadio);

		expect(selectedCss).toContain('background-color: #FFFFFF');
		expect(selectedCss).not.toContain(':hover');
		expect(unselectedCss).toContain('background-color: #FFFFFF');
		expect(unselectedCss).not.toContain(':hover');
	});

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
		const supporterPlusCard = screen.getByRole('radio', {
			name: /Support £12\/month/,
		});
		expect(supporterPlusCard).toBeInTheDocument();
		expect(supporterPlusCard).not.toBeChecked();
		expect(
			screen.getByText('Unlock All-access digital benefits:')
				.parentElement?.parentElement?.parentElement,
		).toHaveAttribute('aria-hidden', 'false');
		expect(
			screen.getByText('Unlock All-access digital benefits:')
				.parentElement?.parentElement?.parentElement,
		).toHaveStyle({ gridTemplateRows: '1fr' });

		// Check that benefits are shown for the default expanded card
		expect(
			screen.getByText('Unlock All-access digital benefits:'),
		).toBeInTheDocument();
		expect(
			screen.getByText('Unlimited access to the Guardian app'),
		).toBeInTheDocument();
	});

	it('expands the first pill card when none is selected and no expansion is configured', () => {
		const choices = mockChoiceCards.map((card, index) => ({
			...card,
			defaultExpanded: undefined,
			pill: index < 2 ? { copy: 'Highlighted' } : undefined,
		}));

		render(
			<ThreeTierChoiceCards
				setSelectedChoiceCard={() => undefined}
				choices={choices}
				id="banner"
			/>,
		);

		screen.getAllByRole('radio').forEach((radio) => {
			expect(radio).not.toBeChecked();
		});
		expect(
			benefitsContainerFor(
				'Give to the Guardian every month with Support',
			),
		).toHaveAttribute('aria-hidden', 'false');
		expect(
			benefitsContainerFor('Unlock All-access digital benefits:'),
		).toHaveAttribute('aria-hidden', 'true');
	});

	it('expands the middle card when no card has a pill or expansion setting', () => {
		const choices = mockChoiceCards.map((card) => ({
			...card,
			defaultExpanded: undefined,
			pill: undefined,
		}));

		render(
			<ThreeTierChoiceCards
				setSelectedChoiceCard={() => undefined}
				choices={choices}
				id="banner"
			/>,
		);

		expect(
			benefitsContainerFor('Unlock All-access digital benefits:'),
		).toHaveAttribute('aria-hidden', 'false');
		expect(
			benefitsContainerFor(
				'Give to the Guardian every month with Support',
			),
		).toHaveAttribute('aria-hidden', 'true');
	});

	it('respects explicit defaultExpanded values before pill-based expansion', () => {
		const choices = mockChoiceCards.map((card, index) => ({
			...card,
			defaultExpanded: index === 2,
			pill: index < 2 ? { copy: 'Highlighted' } : undefined,
		}));

		render(
			<ThreeTierChoiceCards
				setSelectedChoiceCard={() => undefined}
				choices={choices}
				id="banner"
			/>,
		);

		expect(
			benefitsContainerFor('We welcome support of any size, any time'),
		).toHaveAttribute('aria-hidden', 'false');
		expect(
			benefitsContainerFor(
				'Give to the Guardian every month with Support',
			),
		).toHaveAttribute('aria-hidden', 'true');
	});

	it('keeps every card collapsed when defaultExpanded is explicitly false', () => {
		const choices = mockChoiceCards.map((card, index) => ({
			...card,
			defaultExpanded: false,
			pill: index < 2 ? { copy: 'Highlighted' } : undefined,
		}));

		render(
			<ThreeTierChoiceCards
				setSelectedChoiceCard={() => undefined}
				choices={choices}
				id="banner"
			/>,
		);

		[
			'Give to the Guardian every month with Support',
			'Unlock All-access digital benefits:',
			'We welcome support of any size, any time',
		].forEach((copy) => {
			expect(benefitsContainerFor(copy)).toHaveAttribute(
				'aria-hidden',
				'true',
			);
		});
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
		const contributionCard = screen.getByRole('radio', {
			name: /Support £5\/month/,
		});
		fireEvent.click(contributionCard);
		expect(contributionCard).toBeChecked();

		// Now the Contribution card should be selected and expanded
		// The previously expanded SupporterPlus card should collapse
		expect(
			screen.getByText('Give to the Guardian every month with Support'),
		).toBeInTheDocument();

		// Benefits stay mounted so their container can animate closed.
		expect(
			screen.getByText('Unlock All-access digital benefits:')
				.parentElement?.parentElement?.parentElement,
		).toHaveAttribute('aria-hidden', 'true');
		expect(
			screen.getByText('Unlock All-access digital benefits:')
				.parentElement?.parentElement?.parentElement,
		).toHaveStyle({ gridTemplateRows: '0fr' });
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
		const contributionCard = screen.getByRole('radio', {
			name: /Support £5\/month/,
		});
		fireEvent.click(contributionCard);

		// Only one card should have the checked state
		const checkedRadios = screen.getAllByRole('radio', { checked: true });
		expect(checkedRadios).toHaveLength(1);

		// Click on the third card
		const oneOffCard = screen.getByRole('radio', {
			name: /Support with another amount/,
		});
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
		// association). Each card has one native Radio label.
		const labels = document.querySelectorAll('label[for]');
		expect(labels).toHaveLength(radios.length);
		expect(document.querySelector('label label')).toBeNull();
		const labelFors = Array.from(labels).map((l) => l.getAttribute('for'));
		for (const forAttr of labelFors) {
			expect(ids).toContain(forAttr);
		}
		expect(new Set(labelFors)).toEqual(new Set(ids));

		// Only the default (card 1) is checked initially; card 2 is not
		expect(radios[0]).toBeChecked();
		expect(radios[1]).not.toBeChecked();

		// Clicking card 2 selects only card 2
		fireEvent.click(screen.getByRole('radio', { name: /One-time 2/ }));
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

		fireEvent.click(screen.getByRole('radio', { name: /One-time 2/ }));
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
