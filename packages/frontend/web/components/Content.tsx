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

function hasShowcase(elements: CAPIElement[]) {
    function isShowcase(element: CAPIElement) {
        switch (element._type) {
            case 'model.dotcomrendering.pageElements.ImageBlockElement':
                return element.role === 'showcase';
            default:
                return false;
        }
    }

    // Return true is any element in the array is an ImageBlockElement
    // with the 'showcase' role
    return elements.find(isShowcase);
}
interface Props {
    CAPI: CAPIType;
    config: ConfigType;
}

export const Content = ({ CAPI, config }: Props) => {
    if (hasShowcase(CAPI.mainMediaElements)) {
        // TODO: This layout should be updated to support showcase images
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
    }

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
