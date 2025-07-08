import type { Meta, StoryObj } from '@storybook/react/*';
import { regions } from '../../fixtures/manual/footballData';
import { WomensEuro2025 } from './FootballCompetitionNav.stories';
import { FootballTableList as TableListDefault } from './FootballTableList.stories';
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
		pageId: 'football/tables',
		tableCompetitions: TableListDefault.args.competitions,
		renderAds: true,
		guardianBaseUrl: 'https://www.theguardian.com',
	},
} satisfies Story;

export const WithCompetitionNav = {
	args: {
		...Default.args,
		pageId: WomensEuro2025.args.pageId,
	},
} satisfies Story;
