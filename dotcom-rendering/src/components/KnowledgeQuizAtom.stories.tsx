import { ArticleSpecial, Pillar } from '@guardian/libs';
import type { Meta, StoryObj } from '@storybook/react';
import {
	exampleKnowledgeQuestions,
	natureQuestions,
	natureResultGroups,
	resultGroups,
} from '../../fixtures/manual/knowledgeQuizAtom';
import { sharingUrls } from '../../fixtures/manual/sharingUrls';
import { KnowledgeQuizAtom } from './KnowledgeQuizAtom.importable';

const meta = {
	title: 'Components/KnowledgeQuizAtom',
	component: KnowledgeQuizAtom,
} satisfies Meta<typeof KnowledgeQuizAtom>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		id: '2c6bf552-2827-4256-b3a0-f557d215c394',
		questions: exampleKnowledgeQuestions,
		resultGroups,
		sharingUrls,
		theme: Pillar.News,
	},
} satisfies Story;

export const BatchedResults = {
	args: {
		...Default.args,
		questions: natureQuestions,
		resultGroups: natureResultGroups,
	},
} satisfies Story;

export const LabsTheme = {
	args: {
		...Default.args,
		theme: ArticleSpecial.Labs,
	},
} satisfies Story;
