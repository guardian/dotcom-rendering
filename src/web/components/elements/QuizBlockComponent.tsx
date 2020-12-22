import React from 'react';
import { css } from 'emotion';

import { space } from '@guardian/src-foundations';

import {
    PersonalityQuizAtom,
    KnowledgeQuizAtom,
} from '@guardian/atoms-rendering';

type Props = {
    id: string;
    questions: QuestionType[];
    resultBuckets?: ResultBucketsType[];
    quizType: 'personality' | 'knowledge';
};
export const QuizBlockComponent = ({
    id,
    questions,
    resultBuckets,
    quizType,
}: Props) => (
    <div
        className={css`
            padding-bottom: ${space[2]}px;
        `}
    >
        {quizType === 'personality' && resultBuckets ? (
            <PersonalityQuizAtom
                id={id}
                questions={questions}
                resultBuckets={resultBuckets}
            />
        ) : (
            <KnowledgeQuizAtom id={id} questions={questions} />
        )}
    </div>
);
