import React from 'react';
import { ArticleProps } from './Article';
import { AMPRenderer } from '../components/elements/elementRenderer';

export const Amp: React.SFC<{
    data: ArticleProps;
}> = ({ data }) => {
    return <AMPRenderer elements={data.CAPI.elements} />;
};
