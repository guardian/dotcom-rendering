import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CallToActionAtom } from './CallToActionAtom';

describe('CallToActionAtom', () => {
	it('should render with url and button text', () => {
		const { getByRole } = render(
			<CallToActionAtom
				linkUrl="https://example.com"
				backgroundImage="https://example.com/image.jpg"
				buttonText="Click here"
			/>,
		);

		const link = getByRole('link');
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute('href', 'https://example.com');

		const button = getByRole('button', { name: 'Click here' });
		expect(button).toBeInTheDocument();
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

	it('should have correct link wrapping the entire component', () => {
		const { getByRole } = render(
			<CallToActionAtom
				linkUrl="https://example.com"
				buttonText="Learn more"
				text="Important Info"
				backgroundImage="https://example.com/image.jpg"
			/>,
		);

		const link = getByRole('link');
		expect(link).toHaveAttribute('href', 'https://example.com');

		// Check that the button is within the link
		const button = getByRole('button', { name: 'Learn more' });
		expect(link).toContainElement(button);
	});
});
