import React, { useEffect } from 'react';

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

import { HydrateApp } from '@root/src/web/components/HydrateApp';
import { mockRESTCalls } from '@root/src/web/lib/mockRESTCalls';

import { DecideLayout } from './DecideLayout';

mockRESTCalls();

/* tslint:disable */
export default {
    title: 'Layouts/Standard',
    parameters: {
        chromatic: { viewports: [1300], delay: 800 },
    },
};
/* tslint:enable */

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

// HydratedLayout is used here to simulated the hydration that happens after we init react on
// the client. We need a separate component so that we can make use of useEffect to ensure
// the hydrate step only runs once the dom has been rendered.
const HydratedLayout = ({ CAPI }: { CAPI: CAPIType }) => {
    useEffect(() => {
        HydrateApp({ CAPI, NAV });
    }, [CAPI]);
    return <DecideLayout CAPI={CAPI} NAV={NAV} />;
};

export const ArticleStory = () => {
    const CAPI = convertToStandard(Article);
    return <HydratedLayout CAPI={CAPI} />;
};
ArticleStory.story = { name: 'Article' };

export const ReviewStory = () => {
    const CAPI = convertToStandard(Review);
    return <HydratedLayout CAPI={CAPI} />;
};
ReviewStory.story = { name: 'Review' };

export const CommentStory = () => {
    const CAPI = convertToStandard(Comment);
    return <HydratedLayout CAPI={CAPI} />;
};
CommentStory.story = { name: 'Comment' };

export const AdvertisementFeatureStory = () => {
    const CAPI = convertToStandard(AdvertisementFeature);
    return <HydratedLayout CAPI={CAPI} />;
};
AdvertisementFeatureStory.story = { name: 'AdvertisementFeature' };

export const AnalysisStory = () => {
    const CAPI = convertToStandard(Analysis);
    return <HydratedLayout CAPI={CAPI} />;
};
AnalysisStory.story = { name: 'Analysis' };

export const FeatureStory = () => {
    const CAPI = convertToStandard(Feature);
    return <HydratedLayout CAPI={CAPI} />;
};
FeatureStory.story = { name: 'Feature' };

export const GuardianViewStory = () => {
    const CAPI = convertToStandard(GuardianView);
    return <HydratedLayout CAPI={CAPI} />;
};
GuardianViewStory.story = { name: 'GuardianView' };

export const ImmersiveStory = () => {
    const CAPI = convertToStandard(Immersive);
    return <HydratedLayout CAPI={CAPI} />;
};
ImmersiveStory.story = { name: 'Immersive' };

export const InterviewStory = () => {
    const CAPI = convertToStandard(Interview);
    return <HydratedLayout CAPI={CAPI} />;
};
InterviewStory.story = { name: 'Interview' };

export const QuizStory = () => {
    const CAPI = convertToStandard(Quiz);
    return <HydratedLayout CAPI={CAPI} />;
};
QuizStory.story = { name: 'Quiz' };

export const RecipeStory = () => {
    const CAPI = convertToStandard(Recipe);
    return <HydratedLayout CAPI={CAPI} />;
};
RecipeStory.story = { name: 'Recipe' };

export const MatchReportStory = () => {
    const CAPI = convertToStandard(MatchReport);
    return <HydratedLayout CAPI={CAPI} />;
};
MatchReportStory.story = { name: 'MatchReport' };
