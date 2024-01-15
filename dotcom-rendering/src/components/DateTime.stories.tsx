import { css } from '@emotion/react';
import { space, textSans } from '@guardian/source-foundations';
import type { Meta, StoryObj } from '@storybook/react';
import { DateTime } from './DateTime';

const meta: Meta<typeof DateTime> = {
	title: 'Components/DateTime',
	component: DateTime,
	decorators: (Story) => (
		<div
			css={css`
				padding: ${space[2]}px;
				${textSans.small()}
			`}
		>
			<Story />
		</div>
	),
};

type Story = StoryObj<typeof DateTime>;

/** January 14th, 2024, 12.34pm */
const date = new Date('2024-01-14T12:34:00.000Z');

export const UK: Story = {
	args: { date, editionId: 'UK' },
};

export const TimeOnly: Story = {
	args: { date, editionId: 'UK', show: 'time' },
};

export const DateOnly: Story = {
	args: { date, editionId: 'UK', show: 'date' },
};

export const US: Story = {
	args: { date, editionId: 'US' },
};

export const AU: Story = {
	args: { date, editionId: 'AU' },
};

export const EUR: Story = {
	args: { date, editionId: 'EUR' },
};

export const INT: Story = {
	args: { date, editionId: 'INT' },
};

export default meta;
