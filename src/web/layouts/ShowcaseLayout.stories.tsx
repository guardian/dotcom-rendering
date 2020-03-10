import React from 'react';

import { makeGuardianBrowserCAPI } from '@root/src/model/window-guardian';
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
        chromatic: { viewports: [1300], delay: 800 },
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
    const ServerCAPI = convertToShowcase(Article);
    const BrowserCAPI = makeGuardianBrowserCAPI(ServerCAPI);
    mockRESTCalls();
    setTimeout(() => hydrateApp({ CAPI: BrowserCAPI, NAV }));
    return <DecideLayout CAPI={ServerCAPI} NAV={NAV} />;
};
ArticleStory.story = { name: 'Article' };

export const ReviewStory = () => {
    const ServerCAPI = convertToShowcase(Review);
    const BrowserCAPI = makeGuardianBrowserCAPI(ServerCAPI);
    mockRESTCalls();
    setTimeout(() => hydrateApp({ CAPI: BrowserCAPI, NAV }));
    return <DecideLayout CAPI={ServerCAPI} NAV={NAV} />;
};
ReviewStory.story = { name: 'Review' };

export const CommentStory = () => {
    const ServerCAPI = convertToShowcase(Comment);
    const BrowserCAPI = makeGuardianBrowserCAPI(ServerCAPI);
    mockRESTCalls();
    setTimeout(() => hydrateApp({ CAPI: BrowserCAPI, NAV }));
    return <DecideLayout CAPI={ServerCAPI} NAV={NAV} />;
};
CommentStory.story = { name: 'Comment' };

export const AdvertisementFeatureStory = () => {
    const ServerCAPI = convertToShowcase(AdvertisementFeature);
    const BrowserCAPI = makeGuardianBrowserCAPI(ServerCAPI);
    mockRESTCalls();
    setTimeout(() => hydrateApp({ CAPI: BrowserCAPI, NAV }));
    return <DecideLayout CAPI={ServerCAPI} NAV={NAV} />;
};
AdvertisementFeatureStory.story = { name: 'AdvertisementFeature' };

export const AnalysisStory = () => {
    const ServerCAPI = convertToShowcase(Analysis);
    const BrowserCAPI = makeGuardianBrowserCAPI(ServerCAPI);
    mockRESTCalls();
    setTimeout(() => hydrateApp({ CAPI: BrowserCAPI, NAV }));
    return <DecideLayout CAPI={ServerCAPI} NAV={NAV} />;
};
AnalysisStory.story = { name: 'Analysis' };

export const FeatureStory = () => {
    const ServerCAPI = convertToShowcase(Feature);
    const BrowserCAPI = makeGuardianBrowserCAPI(ServerCAPI);
    mockRESTCalls();
    setTimeout(() => hydrateApp({ CAPI: BrowserCAPI, NAV }));
    return <DecideLayout CAPI={ServerCAPI} NAV={NAV} />;
};
FeatureStory.story = { name: 'Feature' };

export const GuardianViewStory = () => {
    const ServerCAPI = convertToShowcase(GuardianView);
    const BrowserCAPI = makeGuardianBrowserCAPI(ServerCAPI);
    mockRESTCalls();
    setTimeout(() => hydrateApp({ CAPI: BrowserCAPI, NAV }));
    return <DecideLayout CAPI={ServerCAPI} NAV={NAV} />;
};
GuardianViewStory.story = { name: 'GuardianView' };

export const ImmersiveStory = () => {
    const ServerCAPI = convertToShowcase(Immersive);
    const BrowserCAPI = makeGuardianBrowserCAPI(ServerCAPI);
    mockRESTCalls();
    setTimeout(() => hydrateApp({ CAPI: BrowserCAPI, NAV }));
    return <DecideLayout CAPI={ServerCAPI} NAV={NAV} />;
};
ImmersiveStory.story = { name: 'Immersive' };

export const InterviewStory = () => {
    const ServerCAPI = convertToShowcase(Interview);
    const BrowserCAPI = makeGuardianBrowserCAPI(ServerCAPI);
    mockRESTCalls();
    setTimeout(() => hydrateApp({ CAPI: BrowserCAPI, NAV }));
    return <DecideLayout CAPI={ServerCAPI} NAV={NAV} />;
};
InterviewStory.story = { name: 'Interview' };

export const QuizStory = () => {
    const ServerCAPI = convertToShowcase(Quiz);
    const BrowserCAPI = makeGuardianBrowserCAPI(ServerCAPI);
    mockRESTCalls();
    setTimeout(() => hydrateApp({ CAPI: BrowserCAPI, NAV }));
    return <DecideLayout CAPI={ServerCAPI} NAV={NAV} />;
};
QuizStory.story = { name: 'Quiz' };

export const RecipeStory = () => {
    const ServerCAPI = convertToShowcase(Recipe);
    const BrowserCAPI = makeGuardianBrowserCAPI(ServerCAPI);
    mockRESTCalls();
    setTimeout(() => hydrateApp({ CAPI: BrowserCAPI, NAV }));
    return <DecideLayout CAPI={ServerCAPI} NAV={NAV} />;
};
RecipeStory.story = { name: 'Recipe' };

export const MatchReportStory = () => {
    const ServerCAPI = convertToShowcase(MatchReport);
    const BrowserCAPI = makeGuardianBrowserCAPI(ServerCAPI);
    mockRESTCalls();
    setTimeout(() => hydrateApp({ CAPI: BrowserCAPI, NAV }));
    return <DecideLayout CAPI={ServerCAPI} NAV={NAV} />;
};
MatchReportStory.story = { name: 'MatchReport' };
