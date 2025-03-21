import type { Meta, StoryObj } from '@storybook/react/*';
import { Default as TableDefault } from './FootballTable.stories';
import { FootballTableList } from './FootballTableList';

const meta = {
	title: 'Components/Football Table List',
	component: FootballTableList,
	decorators: [
		// To make it easier to see the top border
		(Story) => (
			<>
				<div css={{ padding: 4 }}></div>
				<Story />
			</>
		),
	],
} satisfies Meta<typeof FootballTableList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		tables: [
			{ ...TableDefault.args.table },
			{ ...TableDefault.args.table },
		],
		guardianBaseUrl: 'https://www.theguardian.com',
	},
} satisfies Story;
