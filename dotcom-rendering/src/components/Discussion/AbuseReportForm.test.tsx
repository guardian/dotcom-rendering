import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockRESTCalls } from '../../lib/mockRESTCalls';
import { AbuseReportForm } from './AbuseReportForm';

const fetchMock = mockRESTCalls();

describe('Dropdown', () => {
	it('Should show the expected label names', () => {
		const { getByText } = render(
			<AbuseReportForm
				toggleSetShowForm={() => undefined}
				commentId={123}
				authStatus={undefined}
			/>,
		);

		expect(getByText('Category')).toBeInTheDocument();
		expect(getByText('Reason (optional)')).toBeInTheDocument();
		expect(getByText('Email (optional)')).toBeInTheDocument();
	});

	it('Should show the category error message if not chosen on submit', () => {
		const { getByText } = render(
			<AbuseReportForm
				toggleSetShowForm={() => undefined}
				commentId={123}
				authStatus={undefined}
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
				commentId={123}
				authStatus={undefined}
			/>,
		);

		await user.selectOptions(getByLabelText('Category'), 'Trolling');
		await user.click(getByRole('button', { name: 'Report' }));

		await waitFor(() => {
			expect(fetchMock.lastOptions(/reportAbuse/)?.body).toBe(
				'categoryId=4',
			);
		});

		await waitFor(() => {
			expect(getByText('Report submitted')).toBeInTheDocument();
		});
	});
});
