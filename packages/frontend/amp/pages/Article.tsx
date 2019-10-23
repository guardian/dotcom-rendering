import React from 'react';
import { Footer } from '@frontend/amp/components/Footer';
import { Container } from '@frontend/amp/components/Container';
import { Body as BodyArticle } from '@frontend/amp/components/BodyArticle';
import { Body as BodyLiveblog } from '@frontend/amp/components/BodyLiveblog';
import { Header } from '@frontend/amp/components/Header';
import { Onward } from '@frontend/amp/components/Onward';
import { AdConsent } from '@frontend/amp/components/AdConsent';
import { css } from 'emotion';
import { Sidebar } from '@frontend/amp/components/Sidebar';
import { Analytics, AnalyticsModel } from '@frontend/amp/components/Analytics';
import { filterForTagsOfType } from '@frontend/amp/lib/tag-utils';
import { AdUserSync } from '@root/packages/frontend/amp/components/AdUserSync';
import { getPillar } from '@frontend/lib/pillars';
import { palette } from '@guardian/src-foundations';
import { ArticleModel } from '@frontend/amp/types/ArticleModel';

const backgroundColour = css`
    background-color: ${palette.neutral[97]};
`;

const Body: React.SFC<{
    data: ArticleModel;
    pillar: Pillar;
    config: ConfigType;
}> = ({ data, config, pillar }) => {
    // TODO check if there is a better way to determine if liveblog
    const isLiveBlog =
        data.tags.find(tag => tag.id === 'tone/minutebyminute') !== undefined;

    if (isLiveBlog) {
        return <BodyLiveblog pillar={pillar} data={data} config={config} />;
    }

    return <BodyArticle pillar={pillar} data={data} config={config} />;
};

export const Article: React.FC<{
    nav: NavType;
    articleData: ArticleModel;
    config: ConfigType;
    analytics: AnalyticsModel;
}> = ({ nav, articleData, config, analytics }) => (
    <>
        <Analytics key="analytics" analytics={analytics} />
        <AdUserSync />
        <AdConsent />

        {/* /TODO change to gray bgcolor */}
        <div key="main" className={backgroundColour}>
            <Container>
                <Header
                    nav={nav}
                    activePillar={articleData.pillar}
                    config={config}
                    guardianBaseURL={articleData.guardianBaseURL}
                />
                <Body
                    data={articleData}
                    pillar={getPillar(
                        articleData.pillar,
                        articleData.designType,
                    )}
                    config={config}
                />
                <Onward
                    shouldHideAds={articleData.shouldHideAds}
                    pageID={articleData.pageId}
                    webURL={articleData.webURL}
                    sectionID={articleData.sectionName}
                    hasRelated={articleData.hasRelated}
                    hasStoryPackage={articleData.hasStoryPackage}
                    seriesTags={filterForTagsOfType(articleData.tags, 'Series')}
                    guardianBaseURL={articleData.guardianBaseURL}
                />
                <Footer nav={nav} />
            </Container>
        </div>

        {/* The sidebar has to live here unfortunately to be valid AMP
            but note the click handler lives in the Header. */}
        <Sidebar key="sidebar" nav={nav} />
    </>
);
