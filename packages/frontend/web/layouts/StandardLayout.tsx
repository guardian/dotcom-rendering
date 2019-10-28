import React from 'react';
import { Flex } from '@frontend/web/components/Flex';
import { StickyAd } from '@frontend/web/components/StickyAd';
import { ArticleBody } from '@frontend/web/components/ArticleBody';
import { ArticleLeft } from '@frontend/web/components/ArticleLeft';
import { ArticleRight } from '@frontend/web/components/ArticleRight';
import { ArticleTitle } from '@frontend/web/components/ArticleTitle';
import { ArticleContainer } from '@frontend/web/components/ArticleContainer';
import { ArticleMeta } from '@frontend/web/components/ArticleMeta';
import { Hide } from '@frontend/web/components/Hide';

import { StandardHeader } from './StandardHeader';

interface Props {
    CAPI: CAPIType;
    config: ConfigType;
}

export const StandardLayout = ({ CAPI, config }: Props) => (
    <Flex>
        <ArticleLeft>
            <ArticleTitle CAPI={CAPI} />
            <ArticleMeta CAPI={CAPI} config={config} />
        </ArticleLeft>
        <ArticleContainer>
            <StandardHeader CAPI={CAPI} />
            <Hide when="above" breakpoint="leftCol">
                <ArticleMeta CAPI={CAPI} config={config} />
            </Hide>
            <ArticleBody CAPI={CAPI} config={config} />
        </ArticleContainer>
        <ArticleRight>
            <StickyAd config={config} />
        </ArticleRight>
    </Flex>
);
