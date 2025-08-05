/**
 * @file Terms.stories.tsx
 * This file was migrated from:
 * https://github.com/guardian/gateway/blob/b980d008f91bd1abb108e50de9cdd1c364f37f4d/src/client/components/Terms.stories.tsx
 */
import type { Meta } from '@storybook/react';
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
