import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CallToActionAtom } from './CallToActionAtom';

describe('CallToActionAtom', () => {
	it('should render with url and a default button text when not provided', () => {
		const { getByRole } = render(
			<CallToActionAtom
				linkUrl="https://example.com"
				backgroundImage="https://example.com/image.jpg"
			/>,
		);

		const link = getByRole('link', { name: 'Learn more' });
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute('href', 'https://example.com');
	});

	it('should display custom button text when provided', () => {
		const { getByRole } = render(
			<CallToActionAtom
				linkUrl="https://example.com"
				backgroundImage="https://example.com/image.jpg"
				buttonText="Click here"
			/>,
		);

		const link = getByRole('link', { name: 'Click here' });
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute('href', 'https://example.com');
	});

	it('should display the label when provided', () => {
		const { getByRole } = render(
			<CallToActionAtom
				linkUrl="https://example.com"
				backgroundImage="https://example.com/image.jpg"
				text="Label"
				buttonText="Click here"
			/>,
		);

		const heading = getByRole('heading', { name: 'Label' });
		expect(heading).toBeInTheDocument();
	});

	it('should not display a label when not provided', () => {
		const { queryByRole } = render(
			<CallToActionAtom
				linkUrl="https://example.com"
				backgroundImage="https://example.com/image.jpg"
				buttonText="Click here"
			/>,
		);

		const heading = queryByRole('heading');
		expect(heading).not.toBeInTheDocument();
	});

	it('should apply the accent colour to the button when provided', () => {
		const { getByRole } = render(
			<CallToActionAtom
				linkUrl="https://example.com"
				backgroundImage="https://example.com/image.jpg"
				buttonText="Click here"
				accentColor="#d71920"
			/>,
		);

		const link = getByRole('link', { name: 'Click here' });
		const computedStyle = window.getComputedStyle(link);
		expect(computedStyle.color).toBe('rgb(255, 255, 255)');
		expect(computedStyle.backgroundColor).toBe('rgb(215, 25, 32)');
	});

	it('should apply the default theme to the button when no accent colour is provided', () => {
		const { getByRole } = render(
			<CallToActionAtom
				linkUrl="https://example.com"
				backgroundImage="https://example.com/image.jpg"
				buttonText="Click here"
			/>,
		);

		const link = getByRole('link', { name: 'Click here' });
		const computedStyle = window.getComputedStyle(link);
		expect(computedStyle.color).toBe('rgb(0, 0, 0)');
		expect(computedStyle.backgroundColor).toBe('rgb(255, 255, 255)');
	});
});
