import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { palette } from '../palette';
import { FootballMatchStat } from './FootballMatchStat';

const meta = {
	title: 'Components/Football Match Stat',
	component: FootballMatchStat,
	decorators: [
		(Story) => (
			<div
				css={css`
					padding: ${space[4]}px;
					background-color: ${palette(
						'--football-live-blog-background',
					)};
				`}
			>
				<Story />
			</div>
		),
		splitTheme([
			{
				design: ArticleDesign.Standard,
				display: ArticleDisplay.Standard,
				theme: Pillar.News,
			},
		]),
	],
	parameters: {
		viewport: {
			defaultViewport: 'mobileMedium',
		},
	},
} satisfies Meta<typeof FootballMatchStat>;

export default meta;
type Story = StoryObj<typeof meta>;

const teams = [
	{
		home: { name: 'Wolves', colour: '#faa01b' },
		away: { name: 'Man Utd', colour: '#b00101' },
	},
	{
		home: { name: 'Fulham', colour: '#ffffff' },
		away: { name: 'C Palace', colour: '#af1f17' },
	},
	{
		home: { name: 'Brighton', colour: '#2a449a' },
		away: { name: 'West Ham', colour: '#7c1e42' },
	},
	{
		home: { name: 'Leeds', colour: '#f5f5f5' },
		away: { name: 'Liverpool', colour: '#ce070c' },
	},
	{
		home: { name: 'AFC Bournemouth', colour: '#c80000' },
		away: { name: 'Chelsea', colour: '#005ca4' },
	},
	{
		home: { name: 'Everton', colour: '#00349a' },
		away: { name: 'Nottm Forest', colour: '#db1812' },
	},
	{
		home: { name: 'Man City', colour: '#5cbfeb' },
		away: { name: 'Sunderland', colour: '#d51022' },
	},
	{
		home: { name: 'Newcastle', colour: '#383838' },
		away: { name: 'Burnley', colour: '#570e30' },
	},
	{
		home: { name: 'Spurs', colour: '#ffffff' },
		away: { name: 'Brentford', colour: '#c4040f' },
	},
	{
		home: { name: 'Aston Villa', colour: '#720e44' },
		away: { name: 'Arsenal', colour: '#c40007' },
	},
	{
		home: { name: 'Birmingham', colour: '#01009a' },
		away: { name: 'Norwich', colour: '#ffe400' },
	},
	{
		home: { name: 'Derby', colour: '#ffffff' },
		away: { name: 'Watford', colour: '#fef502' },
	},
	{
		home: { name: 'Leicester', colour: '#4b2cd3' },
		away: { name: 'Stoke', colour: '#cc0617' },
	},
	{
		home: { name: 'Oxford Utd', colour: '#fec726' },
		away: { name: 'Middlesbrough', colour: '#e70101' },
	},
	{
		home: { name: 'Portsmouth', colour: '#0077ac' },
		away: { name: 'Millwall', colour: '#1a2791' },
	},
	{
		home: { name: 'QPR', colour: '#1f539f' },
		away: { name: 'Hull', colour: '#f2b100' },
	},
	{
		home: { name: 'Bristol City', colour: '#c70c23' },
		away: { name: 'Swansea', colour: '#ffffff' },
	},
	{
		home: { name: 'Charlton', colour: '#d4222b' },
		away: { name: 'Southampton', colour: '#d71921' },
	},
	{
		home: { name: 'Coventry', colour: '#b1d0ff' },
		away: { name: 'West Brom', colour: '#00246a' },
	},
	{
		home: { name: 'Celtic', colour: '#559861' },
		away: { name: 'Dundee', colour: '#000033' },
	},
	{
		home: { name: 'Falkirk', colour: '#002341' },
		away: { name: 'Motherwell', colour: '#f0c650' },
	},
	{
		home: { name: 'Dundee Utd', colour: '#ff6c00' },
		away: { name: 'Rangers', colour: '#195091' },
	},
];

export const Default = {
	args: {
		label: 'Goal attempts',
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
		label: 'Possession',
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
			`}
		>
			{teams.map((match, index) => (
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
	args: {
		...ShownAsPercentage.args,
	},
} satisfies Story;
