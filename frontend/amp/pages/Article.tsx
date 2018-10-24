import React from 'react';
import Footer from '../components/Footer';
import Container from '../components/Container';
import { AmpRenderer } from '../components/lib/AMPRenderer';

export const Article: React.SFC<{ data: ArticleProps }> = ({ data }) => (
    <Container>
        <AmpRenderer pillar={data.CAPI.pillar} elements={data.CAPI.elements} />
        <Footer />
    </Container>
);
