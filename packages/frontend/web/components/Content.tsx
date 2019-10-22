import React from 'react';
import { Flex } from '@frontend/web/components/Flex';
import { StickyAd } from '@frontend/web/components/StickyAd';
import { ArticleBody } from '@frontend/web/components/ArticleBody';
import { ArticleHeader } from '@frontend/web/components/ArticleHeader';
import { ArticleLeft } from '@frontend/web/components/ArticleLeft';
import { ArticleRight } from '@frontend/web/components/ArticleRight';
import { ArticleTitle } from '@frontend/web/components/ArticleTitle';
import { ArticleContainer } from '@frontend/web/components/ArticleContainer';
import { ArticleMeta } from '@frontend/web/components/ArticleMeta';

interface Props {
    CAPI: CAPIType;
    config: ConfigType;
}

export const Content = ({ CAPI, config }: Props) => {
    return (
        <Flex>
            <ArticleLeft>
                <ArticleTitle CAPI={CAPI} fallbackToSection={true} />
                <ArticleMeta CAPI={CAPI} config={config} />
            </ArticleLeft>
            <ArticleContainer>
                <ArticleHeader CAPI={CAPI} config={config} />
                <ArticleBody CAPI={CAPI} config={config} />
            </ArticleContainer>
            <ArticleRight>
                <StickyAd config={config} />
            </ArticleRight>
        </Flex>
    );
};
