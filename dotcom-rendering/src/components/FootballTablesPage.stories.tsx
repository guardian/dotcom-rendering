import type { Meta, StoryObj } from '@storybook/react/*';
import { fn } from '@storybook/test';
import { regions } from '../../fixtures/manual/footballData';
import { FootballTableList as TableListDefault } from './FootballTableList.stories';
import { FootballTablesPage as FootballTablesPageComponent } from './FootballTablesPage';

const meta = {
	title: 'Components/Football Tables Page',
	component: FootballTablesPageComponent,
} satisfies Meta<typeof FootballTablesPageComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FootballTablesPage = {
	args: {
		regions,
		goToCompetitionSpecificPage: fn(),
		pageId: 'football/tables',
		competitions: TableListDefault.args.competitions,
		renderAds: true,
		guardianBaseUrl: 'https://www.theguardian.com',
	},
} satisfies Story;
