import React from 'react';
import Footer from '../components/Footer';
import Container from '../components/Container';
import { AmpRenderer } from '@frontend/amp/components/lib/AMPRenderer';

export const Article: React.SFC<{
    pillar: Pillar;
    elements: CAPIElement[];
}> = ({ pillar, elements }) => (
    <Container>
        <AmpRenderer pillar={pillar} elements={elements} />
        <Footer />
    </Container>
);
