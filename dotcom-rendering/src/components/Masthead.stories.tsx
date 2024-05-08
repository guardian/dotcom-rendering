import type { Meta } from '@storybook/react';
import { Masthead } from './Masthead';
import { nav } from './Nav/Nav.mock';

const meta = {
	component: Masthead,
	title: 'Components/Masthead',
	render: (args) => <Masthead {...args} />,
	args: {
		nav,
		editionId: 'UK',
		idUrl: 'idurl',
		mmaUrl: 'mmaUrl',
		discussionApiUrl: 'discussionApiUrl',
		subscribeUrl: 'subscribeUrl',
		idApiUrl: 'idApiUrl',
		showSubNav: false,
		isImmersive: false,
		displayRoundel: false,
		hasPageSkin: false,
		hasPageSkinContentSelfConstrain: false,
	},
} satisfies Meta<typeof Masthead>;
export default meta;

export const WithoutSubnav = {};

export const WithSubnav = {
	args: { showSubNav: true },
};

export const ForImmersiveArticles = {
	args: { isImmersive: true, displayRoundel: true },
};

export const WithPageSkin = {
	args: { hasPageSkin: true },
};

export const WithPageSkinAndContentSelfContstrain = {
	args: { hasPageSkinContentSelfConstrain: true },
};
