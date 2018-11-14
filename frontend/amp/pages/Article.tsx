import React from 'react';
import Footer from '@frontend/amp/components/Footer';
import Container from '@frontend/amp/components/Container';
import { AmpRenderer } from '@frontend/amp/components/lib/AMPRenderer';
import Header from '@frontend/amp/components/Header';
import { palette } from '@guardian/pasteup/palette';
import { css } from 'react-emotion';
import InnerContainer from '@frontend/amp/components/InnerContainer';

const backgroundColour = css`
    background-color: ${palette.neutral[97]};
`;

const body = css`
    background-color: white;
`;

export const Article: React.SFC<{
    pillar: Pillar;
    elements: CAPIElement[];
    nav: NavType;
}> = ({ pillar, elements, nav }) => (
    <div className={backgroundColour}>
        <Container>
            <Header nav={nav} activePillar={pillar} />
            <InnerContainer className={body}>
                <AmpRenderer pillar={pillar} elements={elements} />
            </InnerContainer>
            <Footer />
        </Container>
    </div>
);
