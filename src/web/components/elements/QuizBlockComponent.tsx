import React from 'react';

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
	<>
		{quizType === 'personality' && resultBuckets ? (
			<PersonalityQuizAtom
				id={id}
				questions={questions}
				resultBuckets={resultBuckets}
			/>
		) : (
			<KnowledgeQuizAtom id={id} questions={questions} />
		)}
	</>
);
