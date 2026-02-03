import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { allModes } from '../../.storybook/modes';
import { footballMatchResultV2 } from '../../fixtures/manual/footballData';
import { table } from '../../fixtures/manual/footballTable';
import { matchStats } from '../../fixtures/manual/matchStats';
import { customMockFetch } from '../lib/mockRESTCalls';
import { FootballMatchInfoPage as FootballMatchInfoPageComponent } from './FootballMatchInfoPage.importable';

const meta = {
	title: 'Components/Football Match Info Page',
	component: FootballMatchInfoPageComponent,
	render: (args) => {
		global.fetch = mockMatchUrlFetch;
		return <FootballMatchInfoPageComponent {...args} />;
	},
	parameters: {
		chromatic: {
			modes: {
				'vertical mobileMedium': allModes['vertical mobileMedium'],
			},
		},
	},
} satisfies Meta<typeof FootballMatchInfoPageComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FootballMatchInfoPage = {
	args: {
		matchStats,
		matchInfo: footballMatchResultV2,
		table,
		competitionName: "Women's Euro 2025",
		matchUrl:
			'https://www.theguardian.com/football/api/match-nav/2022/01/01/7699/35854.json?dcr=true',
		edition: 'UK',
	},
} satisfies Story;

const mockMatchUrlFetch = customMockFetch([
	{
		mockedMethod: 'GET',
		mockedUrl:
			/https:\/\/www\.theguardian\.com\/football\/api\/match-nav\/.+/,
		mockedStatus: 200,
		mockedBody: {
			minByMinUrl:
				'https://www.theguardian.com/football/live/2026/feb/02/sunderland-v-burnley-premier-league-live-updates',
			reportUrl:
				'https://www.theguardian.com/football/2026/feb/02/sunderland-burnley-premier-league-match-report',
			matchInfoUrl:
				'https://www.theguardian.com/football/match/2026/feb/02/sunderland-v-burnley',
		},
	},
]);
