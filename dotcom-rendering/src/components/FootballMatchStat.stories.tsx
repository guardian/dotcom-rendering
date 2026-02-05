import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { footballTeams } from '../../fixtures/manual/footballTeams';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { palette } from '../palette';
import { FootballMatchStat } from './FootballMatchStat';

const meta = {
	title: 'Components/Football Match Stat',
	component: FootballMatchStat,
	parameters: {
		viewport: {
			defaultViewport: 'mobileMedium',
		},
		colourSchemeBackground: {
			light: palette('--football-live-blog-background'),
			dark: palette('--football-live-blog-background'),
		},
	},
	render: (args) => (
		<div css={{ padding: space[2] }}>
			<FootballMatchStat {...args} />
		</div>
	),
} satisfies Meta<typeof FootballMatchStat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		heading: 'Goal attempts',
		homeTeam: {
			name: 'Manchester United',
			colour: '#da020e',
		},
		awayTeam: {
			name: 'Arsenal',
			colour: '#023474',
		},
		homeValue: 7,
		awayValue: 4,
	},
} satisfies Story;

export const ShownAsPercentage = {
	args: {
		heading: 'Possession',
		homeTeam: {
			name: 'West Ham',
			colour: '#722642',
		},
		awayTeam: {
			name: 'Newcastle',
			colour: '#383838',
		},
		homeValue: 39,
		awayValue: 61,
		isPercentage: true,
	},
} satisfies Story;

export const CompactLayout = {
	args: {
		...Default.args,
		layout: 'compact',
	},
} satisfies Story;

export const TeamColours = {
	render: (args) => (
		<div
			css={css`
				display: flex;
				flex-direction: column;
				gap: ${space[2]}px;
				padding: ${space[2]}px;
			`}
		>
			{footballTeams.map((match, index) => (
				<FootballMatchStat
					{...args}
					homeTeam={{
						name: match.home.name,
						colour: match.home.colour,
					}}
					awayTeam={{
						name: match.away.name,
						colour: match.away.colour,
					}}
					key={index}
				/>
			))}
		</div>
	),
	decorators: [
		splitTheme(
			[
				{
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
					theme: Pillar.Sport,
				},
			],
			{ hideFormatHeading: true },
		),
	],
	args: {
		...ShownAsPercentage.args,
	},
} satisfies Story;
