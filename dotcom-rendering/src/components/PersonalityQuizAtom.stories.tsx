import { ArticleSpecial, Pillar } from '@guardian/libs';
import {
	examplePersonalityQuestions,
	exampleResultBuckets,
} from '../../fixtures/manual/personalityQuizAtom';
import { sharingUrls } from '../../fixtures/manual/sharingUrls';
import { PersonalityQuizAtom } from './PersonalityQuizAtom.importable';

export default {
	title: 'PersonalityQuizAtom',
	component: PersonalityQuizAtom,
};

export const DefaultRendering = () => (
	<PersonalityQuizAtom
		id="quiz-id"
		questions={examplePersonalityQuestions}
		resultBuckets={exampleResultBuckets}
		sharingUrls={sharingUrls}
		theme={Pillar.News}
	/>
);

export const LabsTheme = () => (
	<PersonalityQuizAtom
		id="2c6bf552-2827-4256-b3a0-f557d215c394"
		questions={examplePersonalityQuestions}
		resultBuckets={exampleResultBuckets}
		sharingUrls={sharingUrls}
		theme={ArticleSpecial.Labs}
	/>
);
