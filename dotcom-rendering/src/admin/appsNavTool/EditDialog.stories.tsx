import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { EditDialog as EditDialogComponent } from './EditDialog';

const meta = {
	component: EditDialogComponent,
	title: 'Admin/Apps Nav Tool/Edit Dialog',
} satisfies Meta<typeof EditDialogComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const EditDialog = {
	args: {
		editing: {
			location: [0],
			mobileOverride: 'section-front',
			path: 'uk/film',
			title: 'UK Film',
		},
	},
} satisfies Story;
