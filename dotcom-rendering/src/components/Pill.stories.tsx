import type { Meta, StoryObj } from '@storybook/react';
import { IconCamera, IconMedia, Pill } from './Pill';

const meta: Meta<typeof Pill> = {
	title: 'Components/Pill',
	component: Pill,
} satisfies Meta<typeof Pill>;

export default meta;

type Story = StoryObj<typeof Pill>;

export const Media = {
	args: {
		content: (
			<>
				<IconMedia />
				3:35
			</>
		),
	},
} satisfies Story;

export const Gallery = {
	args: {
		content: (
			<>
				10
				<IconCamera />
			</>
		),
	},
} satisfies Story;
