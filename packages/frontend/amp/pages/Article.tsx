import React from 'react';
import Footer from '@frontend/amp/components/Footer';
import Container from '@frontend/amp/components/Container';
import Body from '@frontend/amp/components/Body';
import Header from '@frontend/amp/components/Header';
import { palette } from '@guardian/pasteup/palette';
import { Onward } from '@frontend/amp/components/Onward';
import { css } from 'emotion';

const backgroundColour = css`
    background-color: ${palette.neutral[97]};
`;

export interface ArticleModel {
    headline: string;
    standfirst: string;
    mainMediaElements: CAPIElement[];
    elements: CAPIElement[];
    author: AuthorType;
    webPublicationDateDisplay: string;
    pageId: string;
    ageWarning?: string;
    sharingUrls: {
        [K in SharePlatform]?: {
            url: string;
            userMessage: string;
        }
    };
    pillar: Pillar;
    sectionLabel?: string;
    sectionUrl?: string;
    tags: TagType[];
    subMetaSectionLinks: SimpleLinkType[];
    subMetaKeywordLinks: SimpleLinkType[];
    webURL: string;
    shouldHideAds: boolean;
    guardianBaseURL: string;
    hasRelated: boolean;
    hasStoryPackage: boolean;
}

// TODO move somewhere better
const tagsOfType = (tags: TagType[], tagType: string): TagType[] => {
    return tags.filter(
        tag =>
            tag.type === tagType ||
            (tag.type === 'PaidContent' && tag.paidContentType === tagType),
    );
};

export const Article: React.SFC<{
    nav: NavType;
    articleData: ArticleModel;
    config: ConfigType;
}> = ({ nav, articleData, config }) => (
    <div className={backgroundColour}>
        <Container>
            <Header nav={nav} activePillar={articleData.pillar} />
            <Body
                pillar={articleData.pillar}
                data={articleData}
                config={config}
            />
            <Onward
                shouldHideAds={articleData.shouldHideAds}
                pageID={articleData.pageId}
                webURL={articleData.webURL}
                sectionID={articleData.sectionUrl}
                hasRelated={articleData.hasRelated}
                hasStoryPackage={articleData.hasStoryPackage}
                seriesTags={tagsOfType(articleData.tags, 'Series')}
                guardianBaseURL={'https://amp.theguardian.com'}
            />
            <Footer />
        </Container>
    </div>
);
