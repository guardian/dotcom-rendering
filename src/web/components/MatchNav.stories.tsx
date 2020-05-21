import React from 'react';

import { MatchNav } from './MatchNav';

const homeTeam = {
    name: 'Liverpool',
    id: '9',
    score: 2,
    crest: 'https://sport.guim.co.uk/football/crests/120/9.png',
    scorers: ['Georginio Wijnaldum 43', 'Roberto Firmino 94'],
};

const awayTeam = {
    name: 'Atlético',
    id: '26305',
    score: 3,
    crest: 'https://sport.guim.co.uk/football/crests/120/26305.png',
    scorers: [
        'Marcos Llorente 97',
        'Marcos Llorente 105 +0:02',
        'Alvaro Morata 120 +0:16',
    ],
};

export default {
    component: MatchNav,
    title: 'Components/MatchNav',
};

export const Default = () => {
    return (
        <MatchNav
            isResult={true}
            isLive={true}
            venue="Wembley"
            homeTeam={homeTeam}
            awayTeam={awayTeam}
            comments="Here is a comments string"
        />
    );
};
Default.story = { name: 'default' };
