import React from 'react';
import { StyledTone } from '@frontend/amp/lib/tag-utils';
import { ArticleModel } from '@frontend/amp/pages/Article';
import { TopMetaNews } from '@frontend/amp/components/topMeta/TopMetaNews';
import { TopMetaOpinion } from '@frontend/amp/components/topMeta/TopMetaOpinion';
import { TopMetaPaidContent } from '@frontend/amp/components/topMeta/TopMetaPaidContent';

export const TopMeta: React.SFC<{ data: ArticleModel; tone: StyledTone }> = ({
    data,
    tone,
}) => {
    // Note, liveblogs have a separate top meta - see TopMetaLiveblog
    const topMeta = {
        'default-tone': <TopMetaNews articleData={data} />,
        'tone/comment': <TopMetaOpinion articleData={data} />,
        'tone/advertisement-features': (
            <TopMetaPaidContent articleData={data} />
        ),
    };

    return topMeta[tone];
};
