import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { imageStory } from '../../fixtures/manual/qandaAtom';
import { ConfigProvider } from './ConfigContext';
import { QandaAtom } from './QandaAtom.importable';

describe('QandaAtom', () => {
	it('should render & expand works', () => {
		const { getByText, queryByText } = render(
			<ConfigProvider
				value={{
					renderingTarget: 'Web',
					darkModeAvailable: false,
					inAdvertisingPartnerABTest: false,
					assetOrigin: '/',
				}}
			>
				<QandaAtom {...imageStory} />
			</ConfigProvider>,
		);

		expect(getByText('Q&A')).toBeInTheDocument();

		// Test that the 'Show' part of the expand switch is hidden on expand
		expect(getByText('Show')).toBeInTheDocument();
		fireEvent.click(getByText('Show'));
		expect(queryByText('Show')).toBe(null);
		// Test that 'Hide' is hidden after closing the Q & A
		expect(getByText('Hide')).toBeInTheDocument();
		fireEvent.click(getByText('Hide'));
		expect(queryByText('Hide')).toBe(null);
	});

	it('Show feedback on like', () => {
		const { getByText, queryByText, queryByTestId } = render(
			<ConfigProvider
				value={{
					renderingTarget: 'Web',
					darkModeAvailable: false,
					inAdvertisingPartnerABTest: false,
					assetOrigin: '/',
				}}
			>
				<QandaAtom {...imageStory} />
			</ConfigProvider>,
		);

		// Expand Q&A
		fireEvent.click(getByText('Show'));
		// Like button should be visibile and feedback not visibile
		expect(queryByTestId('like')).toBeVisible();
		expect(queryByText('Thank you for your feedback.')).not.toBeVisible();

		// Fire like event
		fireEvent.click(queryByTestId('like') as HTMLElement);
		// Feedback should be visible, like button should be hidden
		expect(queryByText('Thank you for your feedback.')).toBeVisible();
		expect(queryByTestId('like')).not.toBeVisible();
	});

	it('Show feedback on dislike', () => {
		const { getByText, queryByText, queryByTestId } = render(
			<ConfigProvider
				value={{
					renderingTarget: 'Web',
					darkModeAvailable: false,
					inAdvertisingPartnerABTest: false,
					assetOrigin: '/',
				}}
			>
				<QandaAtom {...imageStory} />
			</ConfigProvider>,
		);

		// Expand Q&A
		fireEvent.click(getByText('Show'));
		// Like button should be visibile and feedback not visibile
		expect(queryByTestId('dislike')).toBeVisible();
		expect(queryByText('Thank you for your feedback.')).not.toBeVisible();

		// Fire dislike event
		fireEvent.click(queryByTestId('dislike') as HTMLElement);
		// Feedback should be visible, like button should be hidden
		expect(queryByText('Thank you for your feedback.')).toBeVisible();
		expect(queryByTestId('dislike')).not.toBeVisible();
	});
});
