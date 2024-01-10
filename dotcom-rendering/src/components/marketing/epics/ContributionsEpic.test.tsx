import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { SecondaryCtaType } from '@guardian/support-dotcom-components';
import type { ReminderFields } from '@guardian/support-dotcom-components/dist/shared/src/lib';
import type { EpicProps } from '@guardian/support-dotcom-components/dist/shared/src/types/props/epic';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ContributionsEpicUnvalidated as ContributionsEpic } from './ContributionsEpic';
import { props as baseProps } from './utils/storybook';

describe('ContributionsEpic', () => {
	it('renders the epic', () => {
		const heading = 'Epic';
		const props: EpicProps = {
			...baseProps,
			variant: { ...baseProps.variant, heading },
		};

		const { getByText } = render(<ContributionsEpic {...props} />);

		expect(getByText(heading)).toBeInTheDocument();
	});

	it('displays email input box when clicking remind me and fetchEmail not passed', async () => {
		const heading = 'Epic';
		const showReminderFields: ReminderFields = {
			reminderCta: 'Remind me in May',
			reminderPeriod: '2020-05-01',
			reminderLabel: 'May',
		};
		const props: EpicProps = {
			...baseProps,
			variant: {
				...baseProps.variant,
				secondaryCta: {
					type: SecondaryCtaType.ContributionsReminder,
				},
				heading,
				showReminderFields,
			},
		};

		render(<ContributionsEpic {...props} />);

		expect(screen.queryByRole('textbox')).toBeNull();
		expect(screen.queryByText('Set a reminder')).toBeNull();

		fireEvent.click(screen.getByText('Remind me in May'));

		await waitFor(() => {
			expect(screen.getByRole('textbox'));
			screen.getAllByText(/.*Set a reminder.*/);
		});
	});

	it('uses prefilled email when fetchEmail callback is passed', async () => {
		const heading = 'Epic';
		const showReminderFields: ReminderFields = {
			reminderCta: 'Remind me in May',
			reminderPeriod: '2020-05-01',
			reminderLabel: 'May',
		};

		const fetchEmail = jest.fn(() =>
			Promise.resolve('test@guardian.co.uk'),
		);

		const props: EpicProps = {
			...baseProps,
			variant: {
				...baseProps.variant,
				secondaryCta: {
					type: SecondaryCtaType.ContributionsReminder,
				},
				heading,
				showReminderFields,
			},
			fetchEmail,
		};

		render(<ContributionsEpic {...props} />);

		expect(fetchEmail).not.toHaveBeenCalled();
		expect(screen.queryByText('Set a reminder')).toBeNull();
		expect(screen.queryByRole('textbox')).toBeNull();

		fireEvent.click(screen.getByText('Remind me in May'));

		await waitFor(() => {
			expect(fetchEmail).toHaveBeenCalled();
			expect(screen.queryByRole('textbox')).toBeNull();
			screen.getAllByText(/.*Set a reminder.*/);
		});
	});
});
