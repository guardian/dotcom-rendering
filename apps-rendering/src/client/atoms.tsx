// Client-side hydration for atoms

// ----- Imports ----- //

import {
	KnowledgeQuizAtom,
	PersonalityQuizAtom,
} from '@guardian/atoms-rendering';
import type { ArticleTheme } from '@guardian/libs';
import { ArticlePillar, ArticleSpecial } from '@guardian/libs';
import { ElementKind } from 'bodyElementKind';
import { pipe, resultFromNullable } from 'lib';
import type { Parser } from 'parser';
import {
	andThen,
	fieldParser,
	map2,
	numberParser,
	parse,
	succeed,
} from 'parser';
import type { QuizAtom } from 'quizAtom';
import { parser as quizAtomParser } from 'quizAtom';
import ReactDOM from 'react-dom';
import { Result } from 'result';

// ----- Types ----- //

interface QuizProps {
	quiz: QuizAtom;
	theme: ArticleTheme;
}

// ----- Functions ----- //

const makeQuizProps = (quiz: QuizAtom, theme: ArticleTheme): QuizProps => ({
	quiz,
	theme,
});

const themeParser: Parser<ArticleTheme> = pipe(
	numberParser,
	andThen((num) => {
		switch (num) {
			case ArticlePillar.News:
			case ArticlePillar.Opinion:
			case ArticlePillar.Sport:
			case ArticlePillar.Culture:
			case ArticlePillar.Lifestyle:
			case ArticleSpecial.SpecialReport:
			case ArticleSpecial.Labs:
				return succeed(num);
			default:
				return fail(
					`I was not able to parse '${num}' as a valid theme`,
				);
		}
	}),
);

const quizPropsParser: Parser<QuizProps> = map2(makeQuizProps)(
	fieldParser('quiz', quizAtomParser),
	fieldParser('theme', themeParser),
);

const parseQuizProps = (
	rawProps: string | undefined,
): Result<string, QuizProps> =>
	pipe(
		rawProps,
		resultFromNullable(
			'The quiz atom did not have an accompanying element containing props',
		),
	)
		.flatMap((p) =>
			Result.fromUnsafe(
				(): unknown => JSON.parse(p.replace(/&quot;/g, '"')),
				'The props for the quiz atom are not valid JSON',
			),
		)
		.flatMap(parse(quizPropsParser));

const hydrateQuizzes = (): void =>
	Array.from(document.querySelectorAll('.js-quiz')).forEach((atomElement) => {
		const rawProps =
			atomElement.querySelector('.js-quiz-params')?.innerHTML;
		const parsedProps = parseQuizProps(rawProps);

		if (parsedProps.isOk()) {
			const quizProps = parsedProps.value;

			const atom =
				quizProps.quiz.kind === ElementKind.KnowledgeQuizAtom ? (
					<KnowledgeQuizAtom
						{...quizProps.quiz}
						theme={quizProps.theme}
						sharingUrls={{}}
					/>
				) : (
					<PersonalityQuizAtom
						{...quizProps.quiz}
						theme={quizProps.theme}
						sharingUrls={{}}
					/>
				);

			ReactDOM.hydrate(atom, atomElement);
		}

		if (parsedProps.isErr()) {
			console.error(parsedProps.error);
		}
	});

const hydrate = (): void => {
	hydrateQuizzes();
};

// ----- Exports ----- //

export { hydrate };
