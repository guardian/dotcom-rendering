import React from 'react';
import { Article } from '../pages/Article';

type Props = {
    designType: DesignType;
    data: { CAPI: CAPIType; NAV: NavType; config: ConfigType };
};

export const DecidePage = ({ designType, data }: Props) => {
    switch (designType) {
        case 'Article':
            return <Article data={data} />;
        case 'Immersive':
            return <Article data={data} />;
        case 'Media':
            return <Article data={data} />;
        case 'Review':
            return <Article data={data} />;
        case 'Analysis':
            return <Article data={data} />;
        case 'Comment':
            return <Article data={data} />;
        case 'Feature':
            return <Article data={data} />;
        case 'Live':
            return <Article data={data} />;
        case 'SpecialReport':
            return <Article data={data} />;
        case 'Recipe':
            return <Article data={data} />;
        case 'MatchReport':
            return <Article data={data} />;
        case 'Interview':
            return <Article data={data} />;
        case 'GuardianView':
            return <Article data={data} />;
        case 'GuardianLabs':
            return <Article data={data} />;
        case 'Quiz':
            return <Article data={data} />;
        case 'AdvertisementFeature':
            return <Article data={data} />;
        default:
            return <Article data={data} />;
    }
};
