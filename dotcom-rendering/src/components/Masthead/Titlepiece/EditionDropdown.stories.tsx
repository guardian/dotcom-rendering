import type { Meta } from '@storybook/react/*';
import { EditionDropdown } from './EditionDropdown';

const meta = {
	component: EditionDropdown,
	title: 'Components/Masthead/Titlepiece/EditionDropdown',
	parameters: {
		backgrounds: { default: 'dark' },
		layout: 'centered',
		chromatic: {
			disable: true,
		},
	},
	render: (args) => <EditionDropdown {...args} />,
	args: {
		editionId: 'UK',
		dataLinkName: 'test',
	},
} satisfies Meta<typeof EditionDropdown>;

export default meta;

export const Default = {};
