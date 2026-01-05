import { css } from '@emotion/react';
import { from } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { userEvent, within } from 'storybook/test';
import {
	defaultFormats,
	splitTheme,
} from '../../.storybook/decorators/splitThemeDecorator';
import { LabsSectionHeader } from './LabsSectionHeader';

const meta = {
	component: LabsSectionHeader,
	title: 'Components/LabsSectionHeader',
	args: {
		title: 'Container Title',
		url: '/',
		editionId: 'AU',
		hasPageSkin: false,
	},
	render: (args) => (
		<div
			css={css`
				margin: 20px auto 100px;
				min-width: 320px;
				${from.leftCol} {
					min-width: auto;
					max-width: 260px;
					height: 400px;
				}
			`}
		>
			<LabsSectionHeader {...args} />
		</div>
	),
	decorators: [
		splitTheme([defaultFormats[0]], {
			orientation: 'vertical',
			hideFormatHeading: true,
		}),
	],
} satisfies Meta<typeof LabsSectionHeader>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithPageSkin: Story = {
	args: {
		hasPageSkin: true,
	},
};

export const WithDetailsOpen: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const expandDetailsButtons = canvas.getAllByText('About');
		await Promise.all(
			expandDetailsButtons.map((button) => userEvent.click(button)),
		);
	},
};
