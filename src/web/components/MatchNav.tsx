import React from 'react';

type TeamType = {
    name: string;
    score: number;
    crest: string;
    scorers: string[];
};

type Props = {
    homeTeam: TeamType;
    awayTeam: TeamType;
    comments: string;
};

export const MatchNav = ({  }: Props) => <div>MatchNav</div>;
