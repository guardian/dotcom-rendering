import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
} from '../lib/articleFormat';
import { LabsSectionHeader } from './LabsSectionHeader';

const meta = {
	component: LabsSectionHeader,
	title: 'Components/LabsSectionHeader',
	args: {
		title: 'Container Title',
		url: '/',
	},
	render: (args) => <LabsSectionHeader {...args} />,
	decorators: [
		splitTheme(
			[
				{
					theme: ArticleSpecial.Labs,
					design: ArticleDesign.Feature,
					display: ArticleDisplay.Standard,
				},
			],
			{ orientation: 'vertical' },
		),
	],
} satisfies Meta<typeof LabsSectionHeader>;
export default meta;

type Story = StoryObj<typeof meta>;

export const WithDetailsOpen: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const expandDetailsButtons = canvas.getAllByText('About');
		await Promise.all(
			expandDetailsButtons.map((button) => userEvent.click(button)),
		);
	},
};
