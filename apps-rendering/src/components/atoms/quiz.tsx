// ----- Imports ----- //

import {
	KnowledgeQuizAtom,
	PersonalityQuizAtom,
} from '@guardian/atoms-rendering';
import type { Format } from '@guardian/types';
import { ElementKind } from 'bodyElementKind';
import type { QuizAtom } from 'quizAtom';
import type { FC } from 'react';

// ----- Component ----- //

interface Props {
	format: Format;
	element: QuizAtom;
}

const DecideQuiz: FC<Props> = ({ format, element }) =>
	element.kind === ElementKind.KnowledgeQuizAtom ? (
		<KnowledgeQuizAtom {...element} theme={format.theme} sharingUrls={{}} />
	) : (
		<PersonalityQuizAtom
			{...element}
			theme={format.theme}
			sharingUrls={{}}
		/>
	);

const Quiz: FC<Props> = ({ format, element }) => {
	const hydrationParams = (
		<script className="js-quiz-params" type="application/json">
			{JSON.stringify({ quiz: element, theme: format.theme })}
		</script>
	);

	return (
		<div className="js-quiz">
			{hydrationParams}
			<DecideQuiz format={format} element={element} />
		</div>
	);
};

// ----- Exports ----- //

export default Quiz;
