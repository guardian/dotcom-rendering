import type { Meta, StoryObj } from '@storybook/react';
import { allModes } from '../../.storybook/modes';
import { matchReport } from '../../fixtures/generated/match-report';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { ArticleContainer } from './ArticleContainer';
import { Flex } from './Flex';
import { FootballMatch } from './FootballMatch';
import { LeftColumn } from './LeftColumn';
import { RightColumn } from './RightColumn';
import { Section } from './Section';

const meta = {
	title: 'Components/Football Match',
	component: FootballMatch,
	parameters: {
		chromatic: {
			modes: {
				'vertical mobileMedium': allModes['vertical mobileMedium'],
			},
		},
	},
	decorators: [
		(Story) => (
			<Section fullWidth={true}>
				<Flex>
					<LeftColumn borderType="full">
						<></>
					</LeftColumn>
					<ArticleContainer
						format={{
							display: ArticleDisplay.Standard,
							design: ArticleDesign.Standard,
							theme: Pillar.News,
						}}
					>
						<Story />
					</ArticleContainer>
					<RightColumn>
						<></>
					</RightColumn>
				</Flex>
			</Section>
		),
	],
} satisfies Meta<typeof FootballMatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		homeTeam: matchReport.homeTeam,
		awayTeam: matchReport.awayTeam,
		competition: matchReport.competition.fullName,
		comments: matchReport.comments,
	},
} satisfies Story;
