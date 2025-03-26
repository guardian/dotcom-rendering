import type { Meta, StoryObj } from '@storybook/react/*';
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
		pageId: 'football/tables',
		competitions: TableListDefault.args.competitions,
		renderAds: true,
		guardianBaseUrl: 'https://www.theguardian.com',
	},
} satisfies Story;
