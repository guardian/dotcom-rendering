import React from 'react';

type TeamType = {
    name: string;
    score: number;
    crest: string;
    scorers: string[];
};

type Props = {
    isResult: boolean;
    isLive: boolean;
    venue: string;
    homeTeam: TeamType;
    awayTeam: TeamType;
    comments: string;
};

export const MatchNav = ({  }: Props) => <div>MatchNav</div>;
