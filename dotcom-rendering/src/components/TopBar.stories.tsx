import type { Meta } from '@storybook/react';
import { HeaderTopBar } from './TopBar.importable';

const meta = {
	component: HeaderTopBar,
	title: 'Components/TopBar',
	render: (args) => <HeaderTopBar {...args} />,
	args: {
		editionId: 'UK',
		dataLinkName: 'test',
		idUrl: 'idurl',
		mmaUrl: 'mmaUrl',
		discussionApiUrl: 'discussionApiUrl',
		idApiUrl: 'idApiUrl',
		headerTopBarSearchCapiSwitch: false,
	},
} satisfies Meta<typeof HeaderTopBar>;
export default meta;

export const Default = {
	name: 'MastheadTopBar',
};
