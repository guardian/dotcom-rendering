import { PersonalityQuizAtom } from '@guardian/atoms-rendering';
import type { SharingUrlsType } from '@guardian/atoms-rendering/dist/types/types';

// These types are duplicates of those defined in the atom file.
type AnswerType = {
	id: string;
	text: string;
	revealText?: string;
	isCorrect: boolean;
	answerBuckets: string[];
};

type QuestionType = {
	id: string;
	text: string;
	answers: AnswerType[];
	imageUrl?: string;
	imageAlt?: string;
};

type ResultsBucket = {
	id: string;
	title: string;
	description: string;
};

type QuizAtomType = {
	id: string;
	questions: QuestionType[];
	resultBuckets: ResultsBucket[];
	sharingUrls: SharingUrlsType;
	theme: ArticleTheme;
};

export const PersonalityQuizAtomWrapper = (props: QuizAtomType) => {
	return <PersonalityQuizAtom {...props} />;
};
