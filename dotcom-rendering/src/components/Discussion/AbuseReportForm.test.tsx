import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { reportAbuse } from '../../lib/discussionApi';
import { mockFetch } from '../../lib/mockRESTCallsInJest';
import { ok } from '../../lib/result';
import { AbuseReportForm } from './AbuseReportForm';

describe('Dropdown', () => {
	beforeEach(() => {
		mockFetch();
	});

	it('Should show the expected label names', () => {
		const { getByLabelText } = render(
			<AbuseReportForm
				toggleSetShowForm={() => undefined}
				commentId="123"
				reportAbuse={() => Promise.resolve(ok(true))}
			/>,
		);

		expect(getByLabelText('Category')).toBeInTheDocument();
		expect(getByLabelText('Reason Optional')).toBeInTheDocument();
		expect(getByLabelText('Email Optional')).toBeInTheDocument();
	});

	it('Should show the category error message if not chosen on submit', () => {
		const { getByText } = render(
			<AbuseReportForm
				toggleSetShowForm={() => undefined}
				commentId="123"
				reportAbuse={() => Promise.resolve(ok(true))}
			/>,
		);

		fireEvent.click(getByText('Report'));
		expect(
			getByText('You must select a category before submitting'),
		).toBeInTheDocument();
	});

	it('Should show the success message category is selected', async () => {
		const user = userEvent.setup();
		const { getByText, getByLabelText, getByRole } = render(
			<AbuseReportForm
				toggleSetShowForm={() => undefined}
				commentId="123"
				reportAbuse={reportAbuse(undefined)}
			/>,
		);

		await user.selectOptions(getByLabelText('Category'), 'Trolling');
		await user.click(getByRole('button', { name: 'Report' }));

		const [, requestInit] = (global.fetch as jest.Mock).mock.calls[0];

		await waitFor(() => {
			expect(requestInit?.body).toBe('categoryId=4');
		});

		await waitFor(() => {
			expect(getByText('Report submitted')).toBeInTheDocument();
		});
	});
});
