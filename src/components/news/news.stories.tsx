import React from 'react';
import ArticleHeadline from './articleHeadline';
import { pillarColours, Pillar } from 'pillar';

export default { title: 'News' };

export const standard = (): JSX.Element => <ArticleHeadline
  headline="Headline"
  feature={false}
  analysis={false}
  pillarStyles={pillarColours[Pillar.news]}
/>

export const feature = (): JSX.Element => <ArticleHeadline
  headline="Feature"
  feature={true}
  analysis={false}
  pillarStyles={pillarColours[Pillar.news]}
/>

export const sportsFeature = (): JSX.Element => <ArticleHeadline
  headline="Feature"
  feature={true}
  analysis={false}
  pillarStyles={pillarColours[Pillar.sport]}
/>

export const analysis = (): JSX.Element => <ArticleHeadline
  headline="Analysis"
  feature={false}
  analysis={true}
  pillarStyles={pillarColours[Pillar.news]}
/>

export const starRating = (): JSX.Element => <ArticleHeadline
  headline="Headline"
  feature={false}
  analysis={false}
  pillarStyles={pillarColours[Pillar.news]}
  rating="5"
/>