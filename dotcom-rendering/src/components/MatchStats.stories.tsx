import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { matchReport } from '../../fixtures/generated/match-report';
import { ArticleContainer } from './ArticleContainer';
import { Flex } from './Flex';
import { LeftColumn } from './LeftColumn';
import { MatchStats } from './MatchStats';
import { RightColumn } from './RightColumn';
import { Section } from './Section';

export default {
	component: MatchStats,
	title: 'Components/MatchStats',
};

export const Default = () => {
	return (
		<MatchStats
			home={matchReport.homeTeam}
			away={matchReport.awayTeam}
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: Pillar.News,
			}}
		/>
	);
};
Default.storyName = 'default';

export const InContext = () => {
	return (
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
					<MatchStats
						home={matchReport.homeTeam}
						away={matchReport.awayTeam}
						format={{
							display: ArticleDisplay.Standard,
							design: ArticleDesign.Standard,
							theme: Pillar.News,
						}}
					/>
				</ArticleContainer>
				<RightColumn>
					<></>
				</RightColumn>
			</Flex>
		</Section>
	);
};
InContext.storyName = 'when placed in article context';

const DefaultInLiveblog = () => {
	return (
		<MatchStats
			home={matchReport.homeTeam}
			away={matchReport.awayTeam}
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.DeadBlog,
				theme: Pillar.Sport,
			}}
		/>
	);
};
DefaultInLiveblog.storyName = 'when placed in a liveblog';
