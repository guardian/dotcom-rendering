import type { Meta } from '@storybook/react';
import {
	contributionsHeaderResponse,
	contributionsSignInPromptHeaderResponse,
} from '../../fixtures/manual/contributionsHeader';
import { customMockFetch } from '../lib/mockRESTCalls';
import { TopBar } from './TopBar.importable';

const mockContributionsRequestFetch = (
	component: 'Header' | 'SignInPromptHeader',
) =>
	customMockFetch([
		{
			mockedMethod: 'GET',
			mockedUrl: /.*ophan.theguardian.com\/img\/.*/,
			mockedStatus: 200,
		},
		{
			mockedMethod: 'POST',
			mockedUrl: /.*contributions\.(code.dev-)?guardianapis\.com\/header/,
			mockedStatus: 200,
			mockedBody:
				component === 'SignInPromptHeader'
					? contributionsSignInPromptHeaderResponse
					: contributionsHeaderResponse,
		},
	]);

const meta = {
	component: TopBar,
	title: 'Components/Masthead/TopBar',
	render: (args) => {
		global.fetch = mockContributionsRequestFetch('Header');
		return <TopBar {...args} />;
	},
	args: {
		editionId: 'UK',
		idUrl: 'https://profile.theguardian.com',
		mmaUrl: 'https://manage.theguardian.com',
		discussionApiUrl: 'https://discussion.theguardian.com/discussion-api',
		idApiUrl: 'https://idapi.theguardian.com',
		contributionsServiceUrl: 'https://contributions.guardianapis.com',
	},
} satisfies Meta<typeof TopBar>;
export default meta;

export const Default = {};

export const WithSignInPrompt = () => {
	global.fetch = mockContributionsRequestFetch('SignInPromptHeader');

	return (
		<TopBar
			editionId="UK"
			idUrl="https://profile.theguardian.com"
			mmaUrl="https://manage.theguardian.com"
			discussionApiUrl="https://discussion.theguardian.com/discussion-api"
			idApiUrl="https://idapi.theguardian.com"
			contributionsServiceUrl="https://contributions.guardianapis.com"
		/>
	);
};

/** We show a "Newsletters" link instead of "Search jobs" for AU edition */
export const OnAUEdition = {
	args: {
		editionId: 'AU',
	},
};
