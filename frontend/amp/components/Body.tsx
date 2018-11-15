import React from 'react';
import InnerContainer from '@frontend/amp/components/InnerContainer';
import { Elements } from '@frontend/amp/components/lib/Elements';
import { css } from 'react-emotion';
import { ArticleModel } from '@frontend/amp/pages/Article';
import { MainBlock } from '@frontend/amp/components/MainBlock';

const body = css`
    background-color: white;
`;

const Body: React.SFC<{
    pillar: Pillar;
    data: ArticleModel;
    config: ConfigType;
}> = ({ pillar, data, config }) => (
    <InnerContainer className={body}>
        <MainBlock config={config} articleData={data} />
        <Elements pillar={pillar} elements={data.elements} />
    </InnerContainer>
);

export default Body;
