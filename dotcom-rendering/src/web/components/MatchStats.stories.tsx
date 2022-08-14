import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { matchReport } from '../../../fixtures/generated/match-report';
import { ArticleContainer } from './ArticleContainer';
import { ContainerLayout } from './ContainerLayout';
import { Flex } from './Flex';
import { LeftColumn } from './LeftColumn';
import { MatchStats } from './MatchStats';
import { RightColumn } from './RightColumn';

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
				theme: ArticlePillar.News,
			}}
		/>
	);
};
Default.story = { name: 'default' };

export const InContext = () => {
	return (
		<ContainerLayout fullWidth={true}>
			<Flex>
				<LeftColumn borderType="full">
					<></>
				</LeftColumn>
				<ArticleContainer
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.News,
					}}
				>
					<MatchStats
						home={matchReport.homeTeam}
						away={matchReport.awayTeam}
						format={{
							display: ArticleDisplay.Standard,
							design: ArticleDesign.Standard,
							theme: ArticlePillar.News,
						}}
					/>
				</ArticleContainer>
				<RightColumn>
					<></>
				</RightColumn>
			</Flex>
		</ContainerLayout>
	);
};
InContext.story = { name: 'when placed in article context' };

const DefaultInLiveblog = () => {
	return (
		<MatchStats
			home={matchReport.homeTeam}
			away={matchReport.awayTeam}
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.DeadBlog,
				theme: ArticlePillar.Sport,
			}}
		/>
	);
};
DefaultInLiveblog.story = { name: 'when placed in a liveblog' };
