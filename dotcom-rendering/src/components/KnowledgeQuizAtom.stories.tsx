import type { Meta, StoryObj } from '@storybook/react';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import {
	exampleKnowledgeQuestions,
	natureQuestions,
	natureResultGroups,
	resultGroups,
} from '../../fixtures/manual/knowledgeQuizAtom';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '../lib/articleFormat';
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
		pageId: '/',
		webTitle: 'Quiz title',
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Comment,
			theme: Pillar.News,
		},
	},
	decorators: [
		splitTheme([
			{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Comment,
				theme: Pillar.News,
			},
		]),
	],
} satisfies Story;

export const BatchedResults = {
	args: {
		...Default.args,
		questions: natureQuestions,
		resultGroups: natureResultGroups,
	},
	decorators: [
		splitTheme([
			{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Comment,
				theme: Pillar.News,
			},
		]),
	],
} satisfies Story;

export const LabsTheme = {
	args: {
		...Default.args,
	},
	decorators: [
		splitTheme([
			{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Comment,
				theme: ArticleSpecial.Labs,
			},
		]),
	],
} satisfies Story;
