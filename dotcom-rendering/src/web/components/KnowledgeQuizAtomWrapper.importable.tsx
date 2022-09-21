import { KnowledgeQuizAtom } from '@guardian/atoms-rendering';
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

type ResultGroupsType = {
	title: string;
	shareText: string;
	minScore: number;
	id: string;
};

type QuizAtomType = {
	id: string;
	questions: QuestionType[];
	resultGroups: ResultGroupsType[];
	sharingUrls: SharingUrlsType;
	theme: ArticleTheme;
};

export const KnowledgeQuizAtomWrapper = (props: QuizAtomType) => {
	return <KnowledgeQuizAtom {...props} />;
};
