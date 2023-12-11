// ----- Imports ----- //

import { withDefault } from '../vendor/@guardian/types/index';
import { ElementKind } from 'bodyElementKind';
import { pipe } from 'lib';
import type { Parser } from 'parser';
import {
	andThen,
	arrayParser,
	booleanParser,
	fieldParser,
	map,
	map3,
	map4,
	map5,
	maybe,
	numberParser,
	oneOf,
	stringParser,
	succeed,
} from 'parser';

// ----- Types ----- //

interface KnowledgeQuizAtom {
	kind: ElementKind.KnowledgeQuizAtom;
	id: string;
	questions: Question[];
	resultGroups: ResultGroup[];
}

interface PersonalityQuizAtom {
	kind: ElementKind.PersonalityQuizAtom;
	id: string;
	questions: Question[];
	resultBuckets: ResultBucket[];
}

type QuizAtom = KnowledgeQuizAtom | PersonalityQuizAtom;

type ResultBucket = {
	id: string;
	title: string;
	description: string;
};

type Question = {
	id: string;
	text: string;
	answers: Answer[];
	imageUrl?: string;
	imageAlt?: string;
};

type ResultGroup = {
	title: string;
	shareText: string;
	minScore: number;
	id: string;
};

type Answer = {
	id: string;
	text: string;
	revealText?: string;
	isCorrect: boolean;
	answerBuckets: string[];
};

// ----- Parsers ----- //

const makeKnowledgeQuiz = (
	id: string,
	questions: Question[],
	resultGroups: ResultGroup[],
): KnowledgeQuizAtom => ({
	kind: ElementKind.KnowledgeQuizAtom,
	id,
	questions,
	resultGroups,
});

const makeQuestion = (
	id: string,
	text: string,
	answers: Answer[],
	imageUrl: string | undefined,
): Question => ({
	id,
	text,
	answers,
	imageUrl,
});

const makeAnswer = (
	id: string,
	text: string,
	revealText: string | undefined,
	isCorrect: boolean,
	answerBuckets: string[],
): Answer => ({
	id,
	text,
	revealText,
	isCorrect,
	answerBuckets,
});

const makeResultGroup = (
	title: string,
	shareText: string,
	minScore: number,
	id: string,
): ResultGroup => ({
	title,
	shareText,
	minScore,
	id,
});

const makeResultBucket = (
	id: string,
	title: string,
	description: string,
): ResultBucket => ({
	id,
	title,
	description,
});

const makePersonalityQuiz = (
	id: string,
	questions: Question[],
	resultBuckets: ResultBucket[],
): PersonalityQuizAtom => ({
	kind: ElementKind.PersonalityQuizAtom,
	id,
	questions,
	resultBuckets,
});

const aOrUndefinedParser = <A>(aParser: Parser<A>): Parser<A | undefined> =>
	pipe(maybe(aParser), map(withDefault<A | undefined>(undefined)));

function equals<A>(a: A) {
	return (b: A): Parser<A> =>
		a === b
			? succeed(a)
			: fail(`${String(a)} is not equal to ${String(b)}`);
}

const answerParser: Parser<Answer> = map5(makeAnswer)(
	fieldParser('id', stringParser),
	fieldParser('text', stringParser),
	aOrUndefinedParser(fieldParser('revealText', stringParser)),
	fieldParser('isCorrect', booleanParser),
	fieldParser('answerBuckets', arrayParser(stringParser)),
);

const questionParser: Parser<Question> = map5(makeQuestion)(
	fieldParser('id', stringParser),
	fieldParser('text', stringParser),
	fieldParser('answers', arrayParser(answerParser)),
	aOrUndefinedParser(fieldParser('imageUrl', stringParser)),
	aOrUndefinedParser(fieldParser('imageAlt', stringParser)),
);

const resultGroupParser: Parser<ResultGroup> = map4(makeResultGroup)(
	fieldParser('title', stringParser),
	fieldParser('shareText', stringParser),
	fieldParser('minScore', numberParser),
	fieldParser('id', stringParser),
);

const resultBucketParser: Parser<ResultBucket> = map3(makeResultBucket)(
	fieldParser('id', stringParser),
	fieldParser('title', stringParser),
	fieldParser('description', stringParser),
);

const knowledgeQuizParser: Parser<KnowledgeQuizAtom> = pipe(
	fieldParser('kind', numberParser),
	andThen(equals(ElementKind.KnowledgeQuizAtom)),
	(_) =>
		map3(makeKnowledgeQuiz)(
			fieldParser('id', stringParser),
			fieldParser('questions', arrayParser(questionParser)),
			fieldParser('resultGroups', arrayParser(resultGroupParser)),
		),
);

const personalityQuizParser: Parser<PersonalityQuizAtom> = pipe(
	fieldParser('kind', numberParser),
	andThen(equals(ElementKind.PersonalityQuizAtom)),
	(_) =>
		map3(makePersonalityQuiz)(
			fieldParser('id', stringParser),
			fieldParser('questions', arrayParser(questionParser)),
			fieldParser('resultBuckets', arrayParser(resultBucketParser)),
		),
);

const parser: Parser<QuizAtom> = oneOf<QuizAtom>([
	knowledgeQuizParser,
	personalityQuizParser,
]);

// ----- Exports ----- //

export type { KnowledgeQuizAtom, PersonalityQuizAtom, QuizAtom };

export { parser };
