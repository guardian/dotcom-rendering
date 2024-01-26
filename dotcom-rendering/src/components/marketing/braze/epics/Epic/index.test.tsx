/**
 * @jest-environment jsdom
 */

import { fireEvent, render } from '@testing-library/react';
import type { FetchEmail } from '../../types/dcrTypes';
import type { BrazeMessageProps } from '.';
import { Epic } from '.';

const mockFetchEmail: FetchEmail = () => {
	console.log(`fetchEmail invoked`);
	return new Promise((resolve) => {
		setTimeout(() => {
			console.log(`fetchEmail resolved`);
			resolve('some.person@example.com');
		}, 1000);
	});
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noOpCallback = () => {};

describe('Epic', () => {
	describe('when component is rendered', () => {
		const messageProps: BrazeMessageProps = {
			heading: `Since you're here`,
			ophanComponentId: 'Epic',
			paragraph1: 'Plz donate',
			paragraph2: 'Support very much yes?',
			paragraph3: 'Breaking news',
			paragraph4: 'Om nom nom',
			buttonText: 'Support The Guardian',
			highlightedText:
				'Support from a little as %%CURRENCY_SYMBOL%%1 per month',
			buttonUrl: 'http://support.theguardian.com',
		};

		const baseProps = () => ({
			trackClick: noOpCallback,
			brazeMessageProps: messageProps,
			countryCode: 'GB',
			fetchEmail: mockFetchEmail,
		});

		it('replaces CURRENCY_SYMBOL for GB (£)', () => {
			const { getByText } = render(<Epic {...baseProps()} />);

			const elem = getByText('Support from a little as £1 per month');
			expect(elem).toBeDefined();
		});

		it('replaces CURRENCY_SYMBOL for US ($)', () => {
			const { getByText } = render(
				<Epic {...baseProps()} countryCode="US" />,
			);

			const elem = getByText('Support from a little as $1 per month');
			expect(elem).toBeDefined();
		});
	});

	describe('when component has the remind me button', () => {
		it('responds with a confirmation message and tracks the click', async () => {
			const trackClick = jest.fn();
			const brazeMessageProps: BrazeMessageProps = {
				ophanComponentId: 'Epic',
				paragraph1: 'Plz donate',
				buttonText: 'Support The Guardian',
				buttonUrl: 'http://support.theguardian.com',
				reminderStage: 'PRE',
			};
			const baseProps = () => ({
				trackClick,
				brazeMessageProps,
				countryCode: 'GB',
				fetchEmail: mockFetchEmail,
			});
			const { getByText } = render(<Epic {...baseProps()} />);

			setTimeout(() => {
				fireEvent.click(getByText('Remind me in', { exact: false }));

				expect(trackClick).toHaveBeenCalledWith({
					ophanComponentId: brazeMessageProps.ophanComponentId,
					internalButtonId: 1,
				});
			}, 100);
		});
	});
});
