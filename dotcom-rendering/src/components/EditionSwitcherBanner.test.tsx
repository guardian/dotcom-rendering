import '@testing-library/jest-dom';
import { userEvent } from '@storybook/test';
import { act, render, screen } from '@testing-library/react';
import { EditionSwitcherBanner } from './EditionSwitcherBanner.importable';

describe('EditionSwitcherBanner', () => {
	it('should display the correct text', () => {
		render(<EditionSwitcherBanner pageId="us" edition="UK" />);

		screen.getByText('You are viewing the US homepage');

		const link = screen.getByRole('link', { name: 'View the UK homepage' });
		expect(link).toHaveAttribute('href', 'https://www.theguardian.com/uk');
	});

	test('should no longer be present in DOM after clicking the close button', async () => {
		const { container } = render(
			<EditionSwitcherBanner pageId="us" edition="UK" />,
		);
		container.querySelector('[data-component="edition-switcher-banner"]');

		const closeButton = screen.getByRole('button');
		await act(async () => {
			await userEvent.click(closeButton);
		});

		expect(
			container.querySelector(
				'[data-component="edition-switcher-banner"]',
			),
		).toBeNull();
	});
});
