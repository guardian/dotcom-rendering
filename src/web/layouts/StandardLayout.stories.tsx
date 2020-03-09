import React from 'react';

import { dcr } from '@root/fixtures/dcr';
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

import { hydrateApp } from '@root/src/web/browser/App';
import { mockRESTCalls } from '@root/src/web/lib/mockRESTCalls';

import { DecideLayout } from './DecideLayout';

/* tslint:disable */
export default {
    title: 'Layouts/Standard',
    parameters: {
        chromatic: { viewports: [1300], delay: 800 },
    },
};
/* tslint:enable */

// In order to render React elements of the Layout we need to use hydrateApp
// hydrateApp requires a query selector therefore we need to wrap the function in a setTimeout
// Storybook runs only what is exported in the const, so we need to add the code in each export const
// setTimeout(() => hydrateApp({CAPI, NAV}));

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
    setTimeout(() => hydrateApp({ CAPI, NAV, dcr }));
    return <DecideLayout CAPI={CAPI} NAV={NAV} dcr={dcr} />;
};
ArticleStory.story = { name: 'Article' };

export const ReviewStory = () => {
    const CAPI = convertToStandard(Review);
    mockRESTCalls();
    setTimeout(() => hydrateApp({ CAPI, NAV, dcr }));
    return <DecideLayout CAPI={CAPI} NAV={NAV} dcr={dcr} />;
};
ReviewStory.story = { name: 'Review' };

export const CommentStory = () => {
    const CAPI = convertToStandard(Comment);
    mockRESTCalls();
    setTimeout(() => hydrateApp({ CAPI, NAV, dcr }));
    return <DecideLayout CAPI={CAPI} NAV={NAV} dcr={dcr} />;
};
CommentStory.story = { name: 'Comment' };

export const AdvertisementFeatureStory = () => {
    const CAPI = convertToStandard(AdvertisementFeature);
    mockRESTCalls();
    setTimeout(() => hydrateApp({ CAPI, NAV, dcr }));
    return <DecideLayout CAPI={CAPI} NAV={NAV} dcr={dcr} />;
};
AdvertisementFeatureStory.story = { name: 'AdvertisementFeature' };

export const AnalysisStory = () => {
    const CAPI = convertToStandard(Analysis);
    mockRESTCalls();
    setTimeout(() => hydrateApp({ CAPI, NAV, dcr }));
    return <DecideLayout CAPI={CAPI} NAV={NAV} dcr={dcr} />;
};
AnalysisStory.story = { name: 'Analysis' };

export const FeatureStory = () => {
    const CAPI = convertToStandard(Feature);
    mockRESTCalls();
    setTimeout(() => hydrateApp({ CAPI, NAV, dcr }));
    return <DecideLayout CAPI={CAPI} NAV={NAV} dcr={dcr} />;
};
FeatureStory.story = { name: 'Feature' };

export const GuardianViewStory = () => {
    const CAPI = convertToStandard(GuardianView);
    mockRESTCalls();
    setTimeout(() => hydrateApp({ CAPI, NAV, dcr }));
    return <DecideLayout CAPI={CAPI} NAV={NAV} dcr={dcr} />;
};
GuardianViewStory.story = { name: 'GuardianView' };

export const ImmersiveStory = () => {
    const CAPI = convertToStandard(Immersive);
    mockRESTCalls();
    setTimeout(() => hydrateApp({ CAPI, NAV, dcr }));
    return <DecideLayout CAPI={CAPI} NAV={NAV} dcr={dcr} />;
};
ImmersiveStory.story = { name: 'Immersive' };

export const InterviewStory = () => {
    const CAPI = convertToStandard(Interview);
    mockRESTCalls();
    setTimeout(() => hydrateApp({ CAPI, NAV, dcr }));
    return <DecideLayout CAPI={CAPI} NAV={NAV} dcr={dcr} />;
};
InterviewStory.story = { name: 'Interview' };

export const QuizStory = () => {
    const CAPI = convertToStandard(Quiz);
    mockRESTCalls();
    setTimeout(() => hydrateApp({ CAPI, NAV, dcr }));
    return <DecideLayout CAPI={CAPI} NAV={NAV} dcr={dcr} />;
};
QuizStory.story = { name: 'Quiz' };

export const RecipeStory = () => {
    const CAPI = convertToStandard(Recipe);
    mockRESTCalls();
    setTimeout(() => hydrateApp({ CAPI, NAV, dcr }));
    return <DecideLayout CAPI={CAPI} NAV={NAV} dcr={dcr} />;
};
RecipeStory.story = { name: 'Recipe' };

export const MatchReportStory = () => {
    const CAPI = convertToStandard(MatchReport);
    mockRESTCalls();
    setTimeout(() => hydrateApp({ CAPI, NAV, dcr }));
    return <DecideLayout CAPI={CAPI} NAV={NAV} dcr={dcr} />;
};
MatchReportStory.story = { name: 'MatchReport' };
