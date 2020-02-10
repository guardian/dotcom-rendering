import React from 'react';

import { Article } from '@root/fixtures/articles/Article';
import { AdvertisementFeature } from '@root/fixtures/articles/AdvertisementFeature';
import { Review } from '@root/fixtures/articles/Review';
import { Analysis } from '@root/fixtures/articles/Analysis';
import { Feature } from '@root/fixtures/articles/Feature';
import { GuardianView } from '@root/fixtures/articles/GuardianView';
import { Immersive } from '@root/fixtures/articles/Immersive';
import { Interview } from '@root/fixtures/articles/Interview';
import { Quiz } from '@root/fixtures/articles/Quiz';
import { Recipe } from '@root/fixtures/articles/Recipe';
import { Comment } from '@root/fixtures/articles/Comment';
import { MatchReport } from '@root/fixtures/articles/MatchReport';

import { NAV } from '@root/fixtures/NAV';

import { hydrateIslands } from '@frontend/web/islands/islands';
import { mockRESTCalls } from '@root/src/web/lib/mockRESTCalls';

import { DecideLayout } from './DecideLayout';

/* tslint:disable */
export default {
    title: 'Layouts/Standard',
};
/* tslint:enable */

// In order to render React elements of the Layout we need to use hydrateIslands
// hydrateIslands requires a query selector therefore we need to wrap the function in a setTimeout
// Storybook runs only what is exported in the const, so we need to add the code in each export const
// setTimeout(() => hydrateIslands(CAPI, NAV));

const convertToStandard = (CAPI: CAPIType) => {
    return {
        ...CAPI,
        pageType: {
            ...CAPI.pageType,
            hasShowcaseMainElement: false,
        },
        isImmersive: false,
    };
};

export const ArticleStory = () => {
    const CAPI = convertToStandard(Article);
    mockRESTCalls();
    setTimeout(() => hydrateIslands(CAPI, NAV));
    return <DecideLayout designType={CAPI.designType} CAPI={CAPI} NAV={NAV} />;
};
ArticleStory.story = { name: 'Article' };

export const ReviewStory = () => {
    const CAPI = convertToStandard(Review);
    mockRESTCalls();
    setTimeout(() => hydrateIslands(CAPI, NAV));
    return <DecideLayout designType={CAPI.designType} CAPI={CAPI} NAV={NAV} />;
};
ReviewStory.story = { name: 'Review' };

export const CommentStory = () => {
    const CAPI = convertToStandard(Comment);
    mockRESTCalls();
    setTimeout(() => hydrateIslands(CAPI, NAV));
    return <DecideLayout designType={CAPI.designType} CAPI={CAPI} NAV={NAV} />;
};
CommentStory.story = { name: 'Comment' };

export const AdvertisementFeatureStory = () => {
    const CAPI = convertToStandard(AdvertisementFeature);
    mockRESTCalls();
    setTimeout(() => hydrateIslands(CAPI, NAV));
    return <DecideLayout designType={CAPI.designType} CAPI={CAPI} NAV={NAV} />;
};
AdvertisementFeatureStory.story = { name: 'AdvertisementFeature' };

export const AnalysisStory = () => {
    const CAPI = convertToStandard(Analysis);
    mockRESTCalls();
    setTimeout(() => hydrateIslands(CAPI, NAV));
    return <DecideLayout designType={CAPI.designType} CAPI={CAPI} NAV={NAV} />;
};
AnalysisStory.story = { name: 'Analysis' };

export const FeatureStory = () => {
    const CAPI = convertToStandard(Feature);
    mockRESTCalls();
    setTimeout(() => hydrateIslands(CAPI, NAV));
    return <DecideLayout designType={CAPI.designType} CAPI={CAPI} NAV={NAV} />;
};
FeatureStory.story = { name: 'Feature' };

export const GuardianViewStory = () => {
    const CAPI = convertToStandard(GuardianView);
    mockRESTCalls();
    setTimeout(() => hydrateIslands(CAPI, NAV));
    return <DecideLayout designType={CAPI.designType} CAPI={CAPI} NAV={NAV} />;
};
GuardianViewStory.story = { name: 'GuardianView' };

export const ImmersiveStory = () => {
    const CAPI = convertToStandard(Immersive);
    mockRESTCalls();
    setTimeout(() => hydrateIslands(CAPI, NAV));
    return <DecideLayout designType={CAPI.designType} CAPI={CAPI} NAV={NAV} />;
};
ImmersiveStory.story = { name: 'Immersive' };

export const InterviewStory = () => {
    const CAPI = convertToStandard(Interview);
    mockRESTCalls();
    setTimeout(() => hydrateIslands(CAPI, NAV));
    return <DecideLayout designType={CAPI.designType} CAPI={CAPI} NAV={NAV} />;
};
InterviewStory.story = { name: 'Interview' };

export const QuizStory = () => {
    const CAPI = convertToStandard(Quiz);
    mockRESTCalls();
    setTimeout(() => hydrateIslands(CAPI, NAV));
    return <DecideLayout designType={CAPI.designType} CAPI={CAPI} NAV={NAV} />;
};
QuizStory.story = { name: 'Quiz' };

export const RecipeStory = () => {
    const CAPI = convertToStandard(Recipe);
    mockRESTCalls();
    setTimeout(() => hydrateIslands(CAPI, NAV));
    return <DecideLayout designType={CAPI.designType} CAPI={CAPI} NAV={NAV} />;
};
RecipeStory.story = { name: 'Recipe' };

export const MatchReportStory = () => {
    const CAPI = convertToStandard(MatchReport);
    mockRESTCalls();
    setTimeout(() => hydrateIslands(CAPI, NAV));
    return <DecideLayout designType={CAPI.designType} CAPI={CAPI} NAV={NAV} />;
};
MatchReportStory.story = { name: 'MatchReport' };
