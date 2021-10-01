// ----- Imports ----- //

import type { FC } from 'react';
import { Format } from '@guardian/types';
import { ElementKind } from 'bodyElement';
import type {
    KnowledgeQuizAtom as KnowledgeQuizAtomElement,
    PersonalityQuizAtom as PersonalityQuizAtomElement,
} from 'bodyElement';
import {
    KnowledgeQuizAtom,
	PersonalityQuizAtom,
} from '@guardian/atoms-rendering';

// ----- Component ----- //

interface Props {
    format: Format,
	element: KnowledgeQuizAtomElement | PersonalityQuizAtomElement,
}

const DecideQuiz: FC<Props> = ({ format, element }) =>
    element.kind === ElementKind.KnowledgeQuizAtom
        ? <KnowledgeQuizAtom {...element} theme={format.theme} sharingUrls={{}} />
        : <PersonalityQuizAtom {...element} theme={format.theme} sharingUrls={{}} />

const Quiz: FC<Props> = ({ format, element }) => {
	const hydrationParams = (
		<script className="js-quiz-params" type="application/json">
		    {JSON.stringify(element)}
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
