import { PersonalityQuizAtom } from '@guardian/atoms-rendering';
import type { QuizAtomType } from '../types/content';

export const PersonalityQuizAtomWrapper = (props: QuizAtomType) => {
	return <PersonalityQuizAtom {...props} />;
};
