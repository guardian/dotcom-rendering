import React from 'react';

import {
    personalityQuestions,
    personalityResultBuckets,
} from '@root/fixtures/personalityQuiz';
import { knowledgeQuestions } from '@root/fixtures/knowledgeQuiz';
import { QuizBlockComponent } from '@root/src/web/components/elements/QuizBlockComponent';

export default {
    component: QuizBlockComponent,
    title: 'Components/QuizBlockComponent',
};

export const KnowledgeQuiz = () => (
    <QuizBlockComponent
        id="someId1"
        questions={knowledgeQuestions}
        quizType="knowledge"
    />
);

KnowledgeQuiz.story = { name: 'Knowledge Quiz' };

export const PersonalityQuiz = () => (
    <QuizBlockComponent
        id="someId2"
        questions={personalityQuestions}
        resultBuckets={personalityResultBuckets}
        quizType="personality"
    />
);

PersonalityQuiz.story = { name: 'Personality Quiz' };
