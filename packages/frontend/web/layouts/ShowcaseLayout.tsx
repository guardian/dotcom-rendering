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

import { ShowcaseHeader } from './ShowcaseHeader';

interface Props {
    CAPI: CAPIType;
    config: ConfigType;
}

export const ShowcaseLayout = ({ CAPI, config }: Props) => (
    <Flex>
        <ArticleLeft>
            <ArticleTitle CAPI={CAPI} />
            <ArticleMeta CAPI={CAPI} config={config} />
        </ArticleLeft>
        <ArticleContainer>
            {/* When BELOW leftCol we display the header in this position, at the top of the page */}
            <Hide when="below" breakpoint="leftCol">
                <ShowcaseHeader CAPI={CAPI} />
            </Hide>
            <Flex>
                <div>
                    {/* When ABOVE leftCol we display the header in this position, above the article body, underneath the full width image */}
                    <Hide when="above" breakpoint="leftCol">
                        <ShowcaseHeader CAPI={CAPI} />
                        <ArticleMeta CAPI={CAPI} config={config} />
                    </Hide>
                    <ArticleBody
                        CAPI={CAPI}
                        config={config}
                        isShowcase={true}
                    />
                </div>
                <ArticleRight>
                    <StickyAd config={config} />
                </ArticleRight>
            </Flex>
        </ArticleContainer>
    </Flex>
);
