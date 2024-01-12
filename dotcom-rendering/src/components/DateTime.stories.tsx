import { css } from '@emotion/react';
import { space, textSans } from '@guardian/source-foundations';
import type { Meta, StoryObj } from '@storybook/react';
import { DateTime } from './DateTime';

const meta: Meta<typeof DateTime> = {
	title: 'Components/Time',
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
	args: { date, edition: 'UK' },
};

export const US: Story = {
	args: { date, edition: 'US' },
};

export const AU: Story = {
	args: { date, edition: 'AU' },
};

export const EUR: Story = {
	args: { date, edition: 'EUR' },
};

export const INT: Story = {
	args: { date, edition: 'INT' },
};

export default meta;
