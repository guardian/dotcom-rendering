import { css } from '@emotion/react';
import { space, textSans15 } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react';
import type { EditionId } from '../lib/edition';
import { ConfigProvider } from './ConfigContext';
import { DateTime } from './DateTime';

interface Parameters {
	config?: { editionId?: EditionId };
}
const meta: Meta<typeof DateTime> = {
	title: 'Components/DateTime',
	component: DateTime,
	decorators: (Story, { parameters }: { parameters: Parameters }) => {
		const editionId = parameters?.config?.editionId ?? 'UK';
		return (
			<div
				css={css`
					padding: ${space[2]}px;
					${textSans15}
				`}
			>
				<ConfigProvider
					value={{
						renderingTarget: 'Web',
						darkModeAvailable: false,
						assetOrigin: '/',
						editionId,
					}}
				>
					<Story />
				</ConfigProvider>
			</div>
		);
	},
};

type Story = StoryObj<typeof DateTime>;

/** January 14th, 2024, 12.34pm */
const date = new Date('2024-01-14T12:34:00.000Z');

export const UK: Story = {
	args: { date },
};

export const TimeOnly: Story = {
	args: {
		date,
		showWeekday: false,
		showDate: false,
		showTime: true,
	},
};

export const DateOnly: Story = {
	args: {
		date,
		showWeekday: false,
		showDate: true,
		showTime: false,
	},
};

export const WeekdayDateOnly: Story = {
	args: {
		date,
		showWeekday: true,
		showDate: true,
		showTime: false,
	},
};

export const US: Story = {
	parameters: { config: { editionId: 'US' } },
	args: {
		date,
		showWeekday: true,
		showDate: true,
		showTime: true,
	},
};

export const AU: Story = {
	parameters: { config: { editionId: 'AU' } },
	args: {
		date,
		showWeekday: true,
		showDate: true,
		showTime: true,
	},
};

export const EUR: Story = {
	parameters: { config: { editionId: 'EUR' } },
	args: {
		date,
		showWeekday: true,
		showDate: true,
		showTime: true,
	},
};

export const INT: Story = {
	parameters: { config: { editionId: 'INT' } },
	args: {
		date,
		showWeekday: true,
		showDate: true,
		showTime: true,
	},
};

export default meta;
