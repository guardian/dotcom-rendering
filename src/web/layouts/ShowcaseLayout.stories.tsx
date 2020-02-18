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

import { hydrateApp } from '@root/src/web/browser/App';
import { mockRESTCalls } from '@root/src/web/lib/mockRESTCalls';

import { DecideLayout } from './DecideLayout';

/* tslint:disable */
export default {
    title: 'Layouts/Showcase',
    parameters: {
        chromatic: { viewports: [1300] },
    },
};
/* tslint:enable */

// In order to render React elements of the Layout we need to use hydrateApp
// hydrateApp requires a query selector therefore we need to wrap the function in a setTimeout
// Storybook runs only what is exported in the const, so we need to add the code in each export const
// setTimeout(() => hydrateApp({CAPI, NAV}));

const convertToShowcase = (CAPI: CAPIType) => {
    return {
        ...CAPI,
        pageType: {
            ...CAPI.pageType,
            hasShowcaseMainElement: true,
        },
        isImmersive: false,
    };
};

export const ArticleStory = () => {
    const CAPI = convertToShowcase(Article);
    mockRESTCalls();
    setTimeout(() => hydrateApp({ CAPI, NAV }));
    return <DecideLayout designType={CAPI.designType} CAPI={CAPI} NAV={NAV} />;
};
ArticleStory.story = { name: 'Article' };

export const ReviewStory = () => {
    const CAPI = convertToShowcase(Review);
    mockRESTCalls();
    setTimeout(() => hydrateApp({ CAPI, NAV }));
    return <DecideLayout designType={CAPI.designType} CAPI={CAPI} NAV={NAV} />;
};
ReviewStory.story = { name: 'Review' };

export const CommentStory = () => {
    const CAPI = convertToShowcase(Comment);
    mockRESTCalls();
    setTimeout(() => hydrateApp({ CAPI, NAV }));
    return <DecideLayout designType={CAPI.designType} CAPI={CAPI} NAV={NAV} />;
};
CommentStory.story = { name: 'Comment' };

export const AdvertisementFeatureStory = () => {
    const CAPI = convertToShowcase(AdvertisementFeature);
    mockRESTCalls();
    setTimeout(() => hydrateApp({ CAPI, NAV }));
    return <DecideLayout designType={CAPI.designType} CAPI={CAPI} NAV={NAV} />;
};
AdvertisementFeatureStory.story = { name: 'AdvertisementFeature' };

export const AnalysisStory = () => {
    const CAPI = convertToShowcase(Analysis);
    mockRESTCalls();
    setTimeout(() => hydrateApp({ CAPI, NAV }));
    return <DecideLayout designType={CAPI.designType} CAPI={CAPI} NAV={NAV} />;
};
AnalysisStory.story = { name: 'Analysis' };

export const FeatureStory = () => {
    const CAPI = convertToShowcase(Feature);
    mockRESTCalls();
    setTimeout(() => hydrateApp({ CAPI, NAV }));
    return <DecideLayout designType={CAPI.designType} CAPI={CAPI} NAV={NAV} />;
};
FeatureStory.story = { name: 'Feature' };

export const GuardianViewStory = () => {
    const CAPI = convertToShowcase(GuardianView);
    mockRESTCalls();
    setTimeout(() => hydrateApp({ CAPI, NAV }));
    return <DecideLayout designType={CAPI.designType} CAPI={CAPI} NAV={NAV} />;
};
GuardianViewStory.story = { name: 'GuardianView' };

export const ImmersiveStory = () => {
    const CAPI = convertToShowcase(Immersive);
    mockRESTCalls();
    setTimeout(() => hydrateApp({ CAPI, NAV }));
    return <DecideLayout designType={CAPI.designType} CAPI={CAPI} NAV={NAV} />;
};
ImmersiveStory.story = { name: 'Immersive' };

export const InterviewStory = () => {
    const CAPI = convertToShowcase(Interview);
    mockRESTCalls();
    setTimeout(() => hydrateApp({ CAPI, NAV }));
    return <DecideLayout designType={CAPI.designType} CAPI={CAPI} NAV={NAV} />;
};
InterviewStory.story = { name: 'Interview' };

export const QuizStory = () => {
    const CAPI = convertToShowcase(Quiz);
    mockRESTCalls();
    setTimeout(() => hydrateApp({ CAPI, NAV }));
    return <DecideLayout designType={CAPI.designType} CAPI={CAPI} NAV={NAV} />;
};
QuizStory.story = { name: 'Quiz' };

export const RecipeStory = () => {
    const CAPI = convertToShowcase(Recipe);
    mockRESTCalls();
    setTimeout(() => hydrateApp({ CAPI, NAV }));
    return <DecideLayout designType={CAPI.designType} CAPI={CAPI} NAV={NAV} />;
};
RecipeStory.story = { name: 'Recipe' };

export const MatchReportStory = () => {
    const CAPI = convertToShowcase(MatchReport);
    mockRESTCalls();
    setTimeout(() => hydrateApp({ CAPI, NAV }));
    return <DecideLayout designType={CAPI.designType} CAPI={CAPI} NAV={NAV} />;
};
MatchReportStory.story = { name: 'MatchReport' };
