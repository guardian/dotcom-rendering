import type { Meta, StoryObj } from '@storybook/react/*';
import { FootballTable as TableDefault } from './FootballTable.stories';
import { FootballTableList as FootballTableListComponent } from './FootballTableList';

const meta = {
	title: 'Components/Football Table List',
	component: FootballTableListComponent,
	decorators: [
		// To make it easier to see the top border
		(Story) => (
			<>
				<div css={{ padding: 4 }}></div>
				<Story />
			</>
		),
	],
} satisfies Meta<typeof FootballTableListComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FootballTableList = {
	args: {
		competitions: [
			{
				name: 'Premier League',
				url: '/football/premierleague',
				tables: [{ ...TableDefault.args.table, groupName: 'League' }],
				dividers: [1],
				hasGroups: false,
			},
			{
				name: 'Champions League',
				url: '/football/championsleague',
				tables: [
					{ ...TableDefault.args.table, groupName: 'Group A' },
					{ ...TableDefault.args.table, groupName: 'Group B' },
				],
				dividers: [1],
				hasGroups: true,
			},
		],
		guardianBaseUrl: 'https://www.theguardian.com',
	},
} satisfies Story;
