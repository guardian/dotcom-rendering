import type { Meta, StoryObj } from '@storybook/react';
import { nav } from './Nav/Nav.mock';
import { Titlepiece } from './Titlepiece.importable';

const meta = {
	title: 'Components/Masthead/Titlepiece',
	component: Titlepiece,
	render: (args) => <Titlepiece {...args} />,
	args: {
		nav,
		editionId: 'UK',
	},
} satisfies Meta<typeof Titlepiece>;

type Story = StoryObj<typeof Titlepiece>;

export default meta;

export const Default = {};

/** If the edition and the hompage don't match, the titlepiece should say "Edition" */
export const EditionMismatch: Story = {
	args: {
		editionId: 'US',
		pageId: 'uk',
	},
};
