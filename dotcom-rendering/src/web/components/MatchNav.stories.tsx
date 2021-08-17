import { ElementContainer } from './ElementContainer';
import { Flex } from './Flex';
import { LeftColumn } from './LeftColumn';
import { RightColumn } from './RightColumn';
import { ArticleContainer } from './ArticleContainer';

import { MatchNav } from './MatchNav';

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
			minByMinUrl="https://www.theguardian.com/football/live/2020/aug/10/manchester-united-v-fc-copenhagen-europa-league-quarter-final-live"
		/>
	);
};
Default.story = { name: 'default' };

export const ZeroZero = () => {
	return (
		<MatchNav
			homeTeam={{ ...homeTeam, score: 0, scorers: [] }}
			awayTeam={{ ...awayTeam, score: 0, scorers: [] }}
			comments="Neither team scored any goals"
			minByMinUrl="https://www.theguardian.com/football/live/2020/aug/10/manchester-united-v-fc-copenhagen-europa-league-quarter-final-live"
		/>
	);
};
ZeroZero.story = { name: 'zero - zero' };

export const NoComments = () => {
	return (
		<MatchNav
			homeTeam={homeTeam}
			awayTeam={awayTeam}
			minByMinUrl="https://www.theguardian.com/football/live/2020/aug/10/manchester-united-v-fc-copenhagen-europa-league-quarter-final-live"
		/>
	);
};
NoComments.story = { name: 'with no comments' };

export const InContext = () => {
	return (
		<ElementContainer padded={false}>
			<Flex>
				<LeftColumn>
					<></>
				</LeftColumn>
				<ArticleContainer>
					<MatchNav
						homeTeam={homeTeam}
						awayTeam={awayTeam}
						comments="Here is a comments string"
						minByMinUrl="https://www.theguardian.com/football/live/2020/aug/10/manchester-united-v-fc-copenhagen-europa-league-quarter-final-live"
					/>
				</ArticleContainer>
				<RightColumn>
					<></>
				</RightColumn>
			</Flex>
		</ElementContainer>
	);
};
InContext.story = { name: 'when placed in article context' };
