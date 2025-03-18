import type { Meta, StoryObj } from '@storybook/react';
import { formTorino } from '../../fixtures/manual/footballData';
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
	args: { teamResults: formTorino },
};
