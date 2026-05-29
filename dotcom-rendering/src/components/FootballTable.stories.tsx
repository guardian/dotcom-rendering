import { allModes } from '../../.storybook/modes';
import preview from '../../.storybook/preview';
import { table } from '../../fixtures/manual/footballTable';
import { FootballTable as FootballTableComponent } from './FootballTable';

const meta = preview.meta({
	title: 'Components/Football Table',
	component: FootballTableComponent,
	decorators: [
		// To make it easier to see the top border above the table
		(Story) => (
			<>
				<div css={{ padding: 4 }}></div>
				<Story />
			</>
		),
	],
	parameters: {
		chromatic: {
			modes: {
				'vertical mobile': allModes['vertical mobile'],
				'vertical desktop': allModes['vertical desktop'],
				'vertical wide': allModes['splitVertical'],
			},
		},
	},
});

export const FootballTable = meta.story({
	args: {
		competitionName: 'Premier League',
		competitionUrl: '/football/premierleague',
		guardianBaseUrl: 'https://www.theguardian.com',
		dividers: [1],
		hasLinkToFullTable: true,
		table,
	},
});
