import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from './Avatar';

const meta = {
	component: Avatar,
	title: 'Components/Avatar',
	decorators: [
		(Story, context) => (
			<div
				style={{
					height: context.parameters.size,
					width: context.parameters.size,
				}}
			>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const RoundAvatar = {
	args: {
		src: 'https://uploads.guim.co.uk/2017/10/06/George-Monbiot,-L.png',
		alt: 'The alt of the image',
		shape: 'round',
	},
	parameters: {
		size: '136px',
	},
	name: 'Round Avatar Cutout With Coloured Background',
} satisfies Story;
