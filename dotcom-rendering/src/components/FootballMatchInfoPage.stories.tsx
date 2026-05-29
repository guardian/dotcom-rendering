import { SWRConfig } from 'swr';
import { allModes } from '../../.storybook/modes';
import preview from '../../.storybook/preview';
import { footballMatchResultV2 } from '../../fixtures/manual/footballData';
import { table } from '../../fixtures/manual/footballTable';
import { matchStats } from '../../fixtures/manual/matchStats';
import { FootballMatchInfoPage as FootballMatchInfoPageComponent } from './FootballMatchInfoPage';

const meta = preview.meta({
	title: 'Components/Football Match Info Page',
	component: FootballMatchInfoPageComponent,
	decorators: [
		(Story) => (
			<SWRConfig
				value={{
					isPaused: () => true, // Prevent SWR from making requests
				}}
			>
				<Story />
			</SWRConfig>
		),
	],
	parameters: {
		chromatic: {
			modes: {
				'vertical mobileMedium': allModes['vertical mobileMedium'],
			},
		},
	},
});

export const FootballMatchInfoPage = meta.story({
	args: {
		matchStats,
		matchInfo: footballMatchResultV2,
		table,
		competitionName: "Women's Euro 2025",
		edition: 'UK',
		matchHeaderUrl: new URL(
			'https://api.nextgen.guardianapps.co.uk/football/api/match-header/2026/02/08/26247/48490.json',
		),
		renderingTarget: 'Web',
	},
});
