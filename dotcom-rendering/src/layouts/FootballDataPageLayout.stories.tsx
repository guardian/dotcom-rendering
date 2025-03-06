import type { StoryObj } from '@storybook/react';
import { footballData } from '../../fixtures/generated/football-live';
import { initialDays, regions } from '../../fixtures/manual/footballData';
import { extractNAV } from '../model/extract-nav';
import { FootballDataPageLayout } from './FootballDataPageLayout';

const meta = {
	title: 'Components/Football Data Page Layout',
	component: FootballDataPageLayout,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Results = {
	args: {
		footballData: {
			matchesList: initialDays,
			regions,
			kind: 'Result',
			guardianBaseURL: 'https://www.theguardian.com',
			editionId: 'UK',
			config: footballData.config,
			nav: extractNAV(footballData.nav),
			pageFooter: footballData.pageFooter,
			contributionsServiceUrl: 'https://contributions.guardianapis.com',
			isAdFreeUser: false,
		},
	},
} satisfies Story;

export const Live = {
	args: {
		footballData: {
			...Results.args.footballData,
			kind: 'Live',
		},
	},
} satisfies Story;

export const Fixtures = {
	args: {
		footballData: {
			...Results.args.footballData,
			kind: 'Fixture',
		},
	},
} satisfies Story;
