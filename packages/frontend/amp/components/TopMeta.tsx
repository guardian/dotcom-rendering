import React from 'react';
import { StyledTone } from '@frontend/amp/lib/tag-utils';
import { ArticleModel } from '@frontend/amp/pages/Article';
import { TopMetaNews } from '@frontend/amp/components/TopMetaNews';
import { TopMetaOpinion } from '@frontend/amp/components/TopMetaOpinion';
import { TopMetaPaidContent } from '@frontend/amp/components/TopMetaPaidContent';

export const TopMeta: React.SFC<{ data: ArticleModel; tone: StyledTone }> = ({
    data,
    tone,
}) => {
    const topMeta = {
        'default-tone': <TopMetaNews articleData={data} />,
        'tone/comment': <TopMetaOpinion articleData={data} />,
        'tone/advertisement-features': (
            <TopMetaPaidContent articleData={data} />
        ),
    };

    return topMeta[tone];
};
