import type { Meta, StoryObj } from '@storybook/react';
import { TagPageHeader } from './TagPageHeader';

const meta = {
	component: TagPageHeader,
	title: 'Components/TagPageHeader',
} satisfies Meta<typeof TagPageHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		title: 'Example title',
		description: `<p>And a much longer description with lots of text, other thoughts and musings`,
	},
} satisfies Story;

export const WithLink = {
	args: {
		title: 'Example title',
		description: `<p>And a much longer description with lots of text, other thoughts and musings <a href="#">and a link</a></p>`,
	},
} satisfies Story;

export const WithLinkAndImage = {
	args: {
		title: 'Example title',
		description: `<p>And a much longer description with lots of text, other thoughts and musings <a href="#">and a link</a></p>`,
		image: 'https://uploads.guim.co.uk/2023/02/17/Josh_Halliday.jpg',
	},
} satisfies Story;

export const WithFootballCrest = {
	args: {
		title: 'Aston Villa',
		description: `<p>And a much longer description with lots of text, other thoughts and musings <a href="#">and a link</a></p>`,
		image: 'https://sport.guim.co.uk/football/crests/120/2.png',
	},
} satisfies Story;
