import { ArticleSpecial, Pillar } from '@guardian/libs';
import {
	exampleKnowledgeQuestions,
	natureQuestions,
	natureResultGroups,
	resultGroups,
} from '../../fixtures/manual/knowledgeQuizAtom';
import { sharingUrls } from '../../fixtures/manual/sharingUrls';
import { KnowledgeQuizAtom } from './KnowledgeQuizAtom.importable';

export default {
	title: 'KnowledgeQuizAtom',
	component: KnowledgeQuizAtom,
};

export const DefaultRendering = () => (
	<KnowledgeQuizAtom
		id="2c6bf552-2827-4256-b3a0-f557d215c394"
		questions={exampleKnowledgeQuestions}
		resultGroups={resultGroups}
		sharingUrls={sharingUrls}
		theme={Pillar.News}
	/>
);

export const BatchedResults = () => (
	<KnowledgeQuizAtom
		id="2c6bf552-2827-4256-b3a0-f557d215c394"
		questions={natureQuestions}
		resultGroups={natureResultGroups}
		sharingUrls={sharingUrls}
		theme={Pillar.News}
	/>
);

export const LabsTheme = () => (
	<KnowledgeQuizAtom
		id="2c6bf552-2827-4256-b3a0-f557d215c394"
		questions={exampleKnowledgeQuestions}
		resultGroups={resultGroups}
		sharingUrls={sharingUrls}
		theme={ArticleSpecial.Labs}
	/>
);
