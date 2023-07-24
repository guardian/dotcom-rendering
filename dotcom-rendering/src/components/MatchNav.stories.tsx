import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { ArticleContainer } from './ArticleContainer';
import { Flex } from './Flex';
import { LeftColumn } from './LeftColumn';
import { MatchNav } from './MatchNav';
import { RightColumn } from './RightColumn';
import { Section } from './Section';

const homeTeam: TeamType = {
	name: 'Liverpool',
	codename: 'LIV',
	id: '9',
	score: 2,
	crest: 'https://sport.guim.co.uk/football/crests/120/9.png',
	scorers: ['Georginio Wijnaldum 43', 'Roberto Firmino 94'],
	players: [],
	possession: 1,
	shotsOn: 2,
	shotsOff: 66,
	corners: 8,
	fouls: 4,
	colours: '#e354c3',
};

const awayTeam: TeamType = {
	name: 'Atlético',
	codename: 'ATL',
	id: '26305',
	score: 3,
	crest: 'https://sport.guim.co.uk/football/crests/120/26305.png',
	scorers: [
		'Marcos Llorente 97',
		'Marcos Llorente 105 +0:02',
		'Alvaro Morata 120 +0:16',
	],
	players: [],
	possession: 1,
	shotsOn: 28,
	shotsOff: 6,
	corners: 8,
	fouls: 4,
	colours: '#fc3',
};

export default {
	component: MatchNav,
	title: 'Components/MatchNav',
};

export const Default = () => {
	return (
		<MatchNav
			homeTeam={homeTeam}
			awayTeam={awayTeam}
			comments="Here is a comments string"
		/>
	);
};
Default.storyName = 'default';

export const ZeroZero = () => {
	return (
		<MatchNav
			homeTeam={{ ...homeTeam, score: 0, scorers: [] }}
			awayTeam={{ ...awayTeam, score: 0, scorers: [] }}
			comments="Neither team scored any goals"
		/>
	);
};
ZeroZero.storyName = 'zero - zero';

export const NoComments = () => {
	return <MatchNav homeTeam={homeTeam} awayTeam={awayTeam} />;
};
NoComments.storyName = 'with no comments';

export const InContext = () => {
	return (
		<Section fullWidth={true} padSides={false}>
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
					<MatchNav
						homeTeam={homeTeam}
						awayTeam={awayTeam}
						comments="Here is a comments string"
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
