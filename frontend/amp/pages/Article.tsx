import React from 'react';
import Footer from '@frontend/amp/components/Footer';
import Container from '@frontend/amp/components/Container';
import { AmpRenderer } from '@frontend/amp/components/lib/AMPRenderer';
import Header from '@frontend/amp/components/Header';
import { palette } from '@guardian/pasteup/palette';
import { css } from 'react-emotion';
import InnerContainer from '@frontend/amp/components/InnerContainer';
import { MainBlock } from './MainBlock';

const backgroundColour = css`
    background-color: ${palette.neutral[97]};
`;

const body = css`
    background-color: white;
`;

export const Article: React.SFC<{
    nav: NavType;
    CAPI: AMPType;
    config: ConfigType;
}> = ({ nav, CAPI, config }) => (
    <div className={backgroundColour}>
        <Container>
            <Header nav={nav} activePillar={CAPI.pillar} />
            <InnerContainer className={body}>
                <MainBlock
                    config={config}
                    pageId={CAPI.pageId}
                    pillar={CAPI.pillar}
                    sectionLabel={CAPI.sectionLabel}
                    sectionUrl={CAPI.sectionUrl}
                    headline={CAPI.headline}
                    standfirst={CAPI.standfirst}
                    author={CAPI.author}
                    sharingUrls={CAPI.sharingUrls}
                    webPublicationDateDisplay={CAPI.webPublicationDateDisplay}
                    ageWarning={CAPI.ageWarning}
                />
                <AmpRenderer pillar={CAPI.pillar} elements={CAPI.elements} />
            </InnerContainer>
            <Footer />
        </Container>
    </div>
);
