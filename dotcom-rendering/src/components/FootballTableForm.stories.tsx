import type { Meta, StoryObj } from '@storybook/react';
import { FootballTableForm as FootballTableFormComponent } from './FootballTableForm';

const meta = {
	title: 'Components/Football Table Form',
	component: FootballTableFormComponent,
	decorators: [
		// To make the story not shoved in the corner.
		(Story) => (
			<>
				<div css={{ padding: 16 }}>
					<Story />
				</div>
			</>
		),
	],
} satisfies Meta<typeof FootballTableFormComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FootballTableForm: Story = {
	args: {
		teamResults: [
			{
				id: '1',
				self: { name: 'Torino', score: 10 },
				foe: { name: 'Cagliari', score: 0 },
			},
			{
				id: '2',
				self: { name: 'Torino', score: 4 },
				foe: { name: 'Inter', score: 3 },
			},
			{
				id: '3',
				self: { name: 'Torino', score: 1 },
				foe: { name: 'Lazio', score: 3 },
			},
			{
				id: '4',
				self: { name: 'Torino', score: 0 },
				foe: { name: 'Bologna', score: 0 },
			},
			{
				id: '5',
				self: { name: 'Torino', score: 1 },
				foe: { name: 'Inter', score: 4 },
			},
		],
	},
};
