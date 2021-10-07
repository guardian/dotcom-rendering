// Client-side hydration for atoms

// ----- Imports ----- //

import {
	KnowledgeQuizAtom,
	PersonalityQuizAtom,
} from '@guardian/atoms-rendering';
import ReactDOM from 'react-dom';
import { fromUnsafe, Pillar, Result, resultAndThen, ResultKind, Special, Theme } from '@guardian/types';
import type { QuizAtom } from 'quizAtom';
import { parser as quizAtomParser } from 'quizAtom';
import { andThen, fieldParser, map2, numberParser, parse, Parser, succeed } from 'parser';
import { pipe, resultFromNullable } from 'lib';
import { ElementKind } from 'bodyElementKind';

// ----- Types ----- //

interface QuizProps {
	quiz: QuizAtom;
	theme: Theme;
}

// ----- Functions ----- //

const makeQuizProps = (
	quiz: QuizAtom,
	theme: Theme,
): QuizProps => ({
	quiz,
	theme,
});

const themeParser: Parser<Theme> =
	pipe(
		numberParser,
		andThen(num => {
			switch (num) {
				case Pillar.News:
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
				case Special.SpecialReport:
				case Special.Labs:
					return succeed(num);
				default:
					return fail(`I was not able to parse '${num}' as a valid theme`);
			}
		})
	)

const quizPropsParser: Parser<QuizProps> = map2(makeQuizProps)(
	fieldParser('quiz', quizAtomParser),
	fieldParser('theme', themeParser),
)

const parseQuizProps = (rawProps: string | undefined): Result<string, QuizProps> =>
	pipe(
		rawProps,
		resultFromNullable('The quiz atom did not have an accompanying element containing props'),
		resultAndThen(p => fromUnsafe<unknown, string>(
			() => JSON.parse(p.replace(/&quot;/g, '"')),
			'The props for the quiz atom are not valid JSON',
		)),
		resultAndThen(parse(quizPropsParser)),
	);

const hydrateQuizzes = (): void =>
	Array.from(document.querySelectorAll('.js-quiz')).forEach((atomElement) => {
		const rawProps = atomElement.querySelector('.js-quiz-params')?.innerHTML;
		const parsedProps = parseQuizProps(rawProps);
			
		if (parsedProps.kind === ResultKind.Ok) {
			const quizProps = parsedProps.value;

			const atom = quizProps.quiz.kind === ElementKind.KnowledgeQuizAtom
				? <KnowledgeQuizAtom {...quizProps.quiz} theme={quizProps.theme} sharingUrls={{}} />
				: <PersonalityQuizAtom {...quizProps.quiz} theme={quizProps.theme} sharingUrls={{}} />

			ReactDOM.hydrate(
				atom,
				atomElement,
			);
		} else if (parsedProps.kind === ResultKind.Err) {
			console.error(parsedProps.err);
		}
	});

const hydrate = () => {
	hydrateQuizzes();
}

// ----- Exports ----- //

export {
	hydrate,
}
