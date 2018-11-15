import React from 'react';
import Footer from '@frontend/amp/components/Footer';
import Container from '@frontend/amp/components/Container';
import { AmpRenderer } from '@frontend/amp/components/lib/AMPRenderer';
import Header from '@frontend/amp/components/Header';
import { palette } from '@guardian/pasteup/palette';
import { css } from 'react-emotion';
import InnerContainer from '@frontend/amp/components/InnerContainer';
import { MainBlock } from '@frontend/amp/components/MainBlock';

const backgroundColour = css`
    background-color: ${palette.neutral[97]};
`;

const body = css`
    background-color: white;
`;

export interface ArticleModel {
    headline: string;
    standfirst: string;
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
}

export const Article: React.SFC<{
    nav: NavType;
    articleData: ArticleModel;
    config: ConfigType;
}> = ({ nav, articleData, config }) => (
    <div className={backgroundColour}>
        <Container>
            <Header nav={nav} activePillar={articleData.pillar} />
            <InnerContainer className={body}>
                <MainBlock config={config} articleData={articleData} />
                <AmpRenderer
                    pillar={articleData.pillar}
                    elements={articleData.elements}
                />
            </InnerContainer>
            <Footer />
        </Container>
    </div>
);
