import type { Meta } from '@storybook/react';
import fetchMock from 'fetch-mock';
import {
	contributionsHeaderResponse,
	contributionsSignInPromptHeaderResponse,
} from '../../fixtures/manual/contributionsHeader';
import { TopBar } from './TopBar.importable';

const contributionsMockResponse = (
	component: 'Header' | 'SignInPromptHeader',
) =>
	fetchMock
		.restore()
		.get(
			/.*ophan.theguardian.com\/img\/.*/,
			{ status: 200 },
			{ overwriteRoutes: false },
		)
		.post(
			/.*contributions\.(code.dev-)?guardianapis\.com\/header/,
			{
				status: 200,
				body:
					component === 'SignInPromptHeader'
						? contributionsSignInPromptHeaderResponse
						: contributionsHeaderResponse,
			},
			{ overwriteRoutes: false },
		)
		.spy('end:.hot-update.json');

const meta = {
	component: TopBar,
	title: 'Components/Masthead/TopBar',
	render: (args) => {
		contributionsMockResponse('Header');
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
	contributionsMockResponse('SignInPromptHeader');

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
