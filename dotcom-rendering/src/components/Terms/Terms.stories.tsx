import type { Meta } from '@storybook/react';
import React from 'react';
import { InformationBox } from '../InformationBox/InformationBox';
import { GuardianTerms, JobsTerms, RecaptchaTerms } from './Terms';

export default {
	title: 'Components/Terms',
	component: GuardianTerms,
	parameters: {
		layout: 'padded',
	},
} as Meta;

export const Default = () => (
	<InformationBox>
		<GuardianTerms />
		<RecaptchaTerms />
	</InformationBox>
);

Default.storyName = 'Terms';

export const Jobs = () => (
	<InformationBox>
		<JobsTerms />
		<RecaptchaTerms />
	</InformationBox>
);

Jobs.storyName = 'Jobs terms';
