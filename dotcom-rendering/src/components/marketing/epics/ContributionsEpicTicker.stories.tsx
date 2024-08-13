import type { Meta, StoryObj } from '@storybook/react';
import lzstring from 'lz-string';
import React from 'react';
import { ContributionsEpicTicker } from './ContributionsEpicTicker';
import { tickerDataProps } from './utils/storybook';

const { tickerSettings, total, goal } = tickerDataProps;

type WithJsonProps<T> = T & { json?: string };
type Props = WithJsonProps<
	React.ComponentProps<typeof ContributionsEpicTicker>
>;
const meta: Meta<Props> = {
	component: ContributionsEpicTicker,
	title: 'Components/marketing/ContributionsEpicTicker',
	args: {
		tickerSettings,
		total,
		goal,
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

export const MoneyTicker: Story = {
	name: 'MoneyTicker',
	args: {
		...meta.args,
		tickerSettings: {
			...tickerSettings,
		},
	},
};
