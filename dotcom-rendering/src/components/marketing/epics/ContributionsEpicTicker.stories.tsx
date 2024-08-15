import {
	TickerCountType,
	TickerEndType,
} from '@guardian/support-dotcom-components';
import type { Meta, StoryObj } from '@storybook/react';
import lzstring from 'lz-string';
import React from 'react';
import { ContributionsEpicTicker } from './ContributionsEpicTicker';

type WithJsonProps<T> = T & { json?: string };
type Props = WithJsonProps<
	React.ComponentProps<typeof ContributionsEpicTicker>
>;
const meta: Meta<Props> = {
	component: ContributionsEpicTicker,
	title: 'Components/marketing/ContributionsEpicTicker',
	args: {
		json: '',
	},
	render: ({ json, ...args }) => {
		const jsonProps = json
			? JSON.parse(lzstring.decompressFromEncodedURIComponent(json))
			: {};

		return <ContributionsEpicTicker {...args} {...jsonProps} />;
	},
};
export default meta;

type Story = StoryObj<Props>;

export const MoneyTickerHalfwayWithHeadline: Story = {
	args: {
		...meta.args,
		tickerSettings: {
			endType: TickerEndType.unlimited,
			countType: TickerCountType.money,
			currencySymbol: '£',
			copy: {
				countLabel: 'Help us reach our end-of-year goal',
				goalReachedPrimary: '',
				goalReachedSecondary: '',
			},
			name: 'US',
		},
		total: 100000,
		goal: 200000,
	},
};

export const MoneyTickerNoContributions: Story = {
	args: {
		...meta.args,
		tickerSettings: {
			endType: TickerEndType.unlimited,
			countType: TickerCountType.money,
			currencySymbol: '$',
			copy: {
				countLabel: '',
				goalReachedPrimary: '',
				goalReachedSecondary: '',
			},
			name: 'US',
		},
		total: 0,
		goal: 2000000,
	},
};

export const MoneyTickerGoalReached: Story = {
	args: {
		...meta.args,
		tickerSettings: {
			endType: TickerEndType.hardstop,
			countType: TickerCountType.money,
			currencySymbol: '£',
			copy: {
				countLabel: 'Help us reach our end-of-year goal',
				goalReachedPrimary: '',
				goalReachedSecondary: '',
			},
			name: 'US',
		},
		total: 15000000,
		goal: 1500000,
	},
};
