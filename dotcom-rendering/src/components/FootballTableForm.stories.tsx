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
				matchId: '1',
				self: { id: '9', name: 'Torino', score: 10 },
				foe: { id: '26474', name: 'Cagliari', score: 0 },
			},
			{
				matchId: '2',
				self: { id: '9', name: 'Torino', score: 4 },
				foe: { id: '6136', name: 'Inter', score: 3 },
			},
			{
				matchId: '3',
				self: { id: '9', name: 'Torino', score: 1 },
				foe: { id: '26362', name: 'Lazio', score: 3 },
			},
			{
				matchId: '4',
				self: { id: '9', name: 'Torino', score: 0 },
				foe: { id: '26371', name: 'Bologna', score: 0 },
			},
			{
				matchId: '5',
				self: { id: '9', name: 'Torino', score: 1 },
				foe: { id: '6136', name: 'Inter', score: 4 },
			},
		],
	},
};
