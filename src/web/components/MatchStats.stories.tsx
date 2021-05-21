import { matchReport } from '@root/fixtures/generated/match-report';

import { Section } from './Section';
import { Flex } from './Flex';
import { LeftColumn } from './LeftColumn';
import { ArticleContainer } from './ArticleContainer';

import { MatchStats } from './MatchStats';
import { RightColumn } from './RightColumn';

export default {
	component: MatchStats,
	title: 'Components/MatchStats',
};

export const Default = () => {
	return (
		<MatchStats home={matchReport.homeTeam} away={matchReport.awayTeam} />
	);
};
Default.story = { name: 'default' };

export const InContext = () => {
	return (
		<Section>
			<Flex>
				<LeftColumn>
					<></>
				</LeftColumn>
				<ArticleContainer>
					<MatchStats
						home={matchReport.homeTeam}
						away={matchReport.awayTeam}
					/>
				</ArticleContainer>
				<RightColumn>
					<></>
				</RightColumn>
			</Flex>
		</Section>
	);
};
InContext.story = { name: 'when placed in article context' };
