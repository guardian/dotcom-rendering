import type { Meta, StoryObj } from '@storybook/react';
import { FootballTableForm } from './FootballTableForm';

const meta = {
	title: 'Components/Football Table Form',
	component: FootballTableForm,
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
} satisfies Meta<typeof FootballTableForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		teamResults: [
			{
				self: { name: 'Torino', score: 10 },
				foe: { name: 'Cagliari', score: 0 },
			},
			{
				self: { name: 'Torino', score: 4 },
				foe: { name: 'Inter', score: 3 },
			},
			{
				self: { name: 'Torino', score: 1 },
				foe: { name: 'Lazio', score: 3 },
			},
			{
				self: { name: 'Torino', score: 0 },
				foe: { name: 'Bologna', score: 0 },
			},
			{
				self: { name: 'Torino', score: 1 },
				foe: { name: 'Inter', score: 4 },
			},
		],
	},
};
