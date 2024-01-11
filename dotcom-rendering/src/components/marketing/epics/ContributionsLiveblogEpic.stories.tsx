/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/9c3eae7cb0b159db4a1c40679d6b37710b0bb937/packages/modules/src/modules/epics/ContributionsLiveblogEpic.stories.tsx
 */
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
