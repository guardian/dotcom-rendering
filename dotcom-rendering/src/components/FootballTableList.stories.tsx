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
		tables: [TableDefault.args.table, TableDefault.args.table],
		guardianBaseUrl: 'https://www.theguardian.com',
	},
} satisfies Story;
