import type { Meta } from '@storybook/react';
import { TopBar } from './TopBar.importable';

const meta = {
	component: TopBar,
	title: 'Components/Masthead/TopBar',
	render: (args) => <TopBar {...args} />,
	args: {
		editionId: 'UK',
		idUrl: 'idurl',
		mmaUrl: 'mmaUrl',
		discussionApiUrl: 'discussionApiUrl',
		idApiUrl: 'idApiUrl',
		contributionsServiceUrl: 'contributionsServiceUrl',
	},
} satisfies Meta<typeof TopBar>;
export default meta;

export const Default = {};
