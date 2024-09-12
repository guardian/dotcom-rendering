import type { Meta } from '@storybook/react';
import { nav } from '../Nav/Nav.mock';
import { Masthead } from './Masthead';

const meta = {
	component: Masthead,
	title: 'Components/Masthead',
	render: (args) => <Masthead {...args} />,
	args: {
		nav,
		editionId: 'UK',
		idUrl: 'https://profile.theguardian.com',
		mmaUrl: 'https://manage.theguardian.com',
		discussionApiUrl: 'https://discussion.theguardian.com/discussion-api',
		idApiUrl: 'https://idapi.theguardian.com',
		contributionsServiceUrl: 'https://contributions.guardianapis.com',
		showSubNav: false,
		showSlimNav: false,
		hasPageSkin: false,
		hasPageSkinContentSelfConstrain: false,
	},
} satisfies Meta<typeof Masthead>;
export default meta;

export const WithoutSubnav = {};

export const WithSubnav = {
	args: { showSubNav: true },
};

export const WithSlimNav = {
	args: { showSlimNav: true, displayRoundel: true },
};

export const WithPageSkin = {
	args: { hasPageSkin: true },
};

export const WithPageSkinAndContentSelfContstrain = {
	args: { hasPageSkinContentSelfConstrain: true },
};
