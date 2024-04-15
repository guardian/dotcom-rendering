import type { Meta } from '@storybook/react';
import { HeaderTopBar } from './HeaderTopBar.importable';

const meta = {
	component: HeaderTopBar,
	title: 'Components/HeaderTopBar',
	render: (args) => <HeaderTopBar {...args} />,
	args: {
		editionId: 'UK',
		dataLinkName: 'test',
		discussionApiUrl: 'discussionApiUrl',
		idUrl: 'idurl',
		idApiUrl: 'idApiUrl',
		mmaUrl: 'mmaUrl',
		headerTopBarSearchCapiSwitch: false,
		showUpdatedDesign: false,
	},
} satisfies Meta<typeof HeaderTopBar>;

export default meta;

export const defaultStory = {
	name: 'Header top bar signed out',
};

export const redesignedTopBar = {
	name: 'Header top bar signed out with redesign',
	args: { showUpdatedDesign: true },
};
