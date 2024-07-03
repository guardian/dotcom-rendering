import type { Meta } from '@storybook/react';
import { nav } from '../../Nav/Nav.mock';
import { Titlepiece } from './Titlepiece';

const meta = {
	title: 'Components/Masthead/Titlepiece',
	component: Titlepiece,
	render: (args) => <Titlepiece {...args} />,
	args: {
		nav,
		editionId: 'UK',
	},
} satisfies Meta<typeof Titlepiece>;

export default meta;

export const Default = {};
