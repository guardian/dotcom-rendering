// ----- Imports ----- //

import type { FC } from 'react';
import FootballScores, { MatchStatusKind } from 'components/footballScores';
import { text, number, withKnobs } from '@storybook/addon-knobs';

// ----- Stories ----- //

const Default: FC = () =>
    <FootballScores
        league={text("League", "Premier League")}
        stadium={text("Stadium", "Etihad Stadium")}
        homeTeam={{
            name: text("Home Team Name", "Man City"),
            score: number("Home Team Score", 4),
            scorers: [
                "Stones 26'",
                "Gundogan 56'",
                "Stones 68'",
                "Sterling 88'",
            ]
        }}
        awayTeam={{
            name: text("Away Team Name", "Crystal Palace"),
            score: number("Away Team Score", 0),
            scorers: []
        }}
        status={{ kind: MatchStatusKind.FT }}
    />

// ----- Exports ----- //

export default {
	component: FootballScores,
	title: 'FootballScores',
	decorators: [withKnobs],
};

export { Default };
