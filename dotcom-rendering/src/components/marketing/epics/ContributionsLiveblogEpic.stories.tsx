import { SecondaryCtaType } from '@guardian/support-dotcom-components';
import type { Meta, StoryObj } from '@storybook/react';
import lzstring from 'lz-string';
import React from 'react';
import { ContributionsLiveblogEpic } from './ContributionsLiveblogEpic';
import { props } from './utils/storybook';

const { variant, articleCounts, tracking } = props;

type WithJsonProps<T> = T & { json?: string };
type Props = WithJsonProps<
	React.ComponentProps<typeof ContributionsLiveblogEpic>
>;
const meta: Meta<Props> = {
	component: ContributionsLiveblogEpic,
	title: 'Components/marketing/ContributionsLiveblogEpic',
	args: {
		variant,
		articleCounts,
		tracking,
		countryCode: 'GB',
		json: '',
	},
	render: ({ json, ...args }) => {
		const jsonProps = json
			? JSON.parse(lzstring.decompressFromEncodedURIComponent(json))
			: {};

		return <ContributionsLiveblogEpic {...args} {...jsonProps} />;
	},
};
export default meta;

type Story = StoryObj<Props>;
export const Default: Story = {
	storyName: 'Basic ContributionsLiveblogEpic',
};

export const WithoutSupportUrl: Story = {
	storyName: 'ContributionsLiveblogEpic without Support URL',
	args: {
		...meta.args,
		variant: {
			...props.variant,
			cta: {
				baseUrl: 'https://theguardian.com',
				text: 'The Guardian',
			},
			secondaryCta: undefined,
		},
	},
};

export const WithReminderCta: Story = {
	storyName: 'ContributionsLiveblogEpic with Reminder CTA',
	args: {
		...meta.args,
		variant: {
			...props.variant,
			secondaryCta: {
				type: SecondaryCtaType.ContributionsReminder,
			},
			showReminderFields: {
				reminderCta: 'Remind me in December',
				reminderPeriod: '2022-12-01',
				reminderLabel: 'December',
			},
		},
	},
};
