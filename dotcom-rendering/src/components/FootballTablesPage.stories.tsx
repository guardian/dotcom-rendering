import type { Meta, StoryObj } from '@storybook/react/*';
import { fn } from '@storybook/test';
import { regions } from '../../fixtures/manual/footballData';
import { Default as TableDefault } from './FootballTable.stories';
import { FootballTablesPage } from './FootballTablesPage';

const meta = {
	title: 'Components/Football Tables Page',
	component: FootballTablesPage,
} satisfies Meta<typeof FootballTablesPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		regions,
		goToCompetitionSpecificPage: fn(),
		pageId: 'football/tables',
		tables: [
			{ ...TableDefault.args.table },
			{ ...TableDefault.args.table },
		],
		renderAds: true,
		guardianBaseUrl: 'https://www.theguardian.com',
	},
} satisfies Story;
