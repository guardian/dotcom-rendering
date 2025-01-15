import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';
import { centreColumnDecorator } from '../../.storybook/decorators/gridDecorators';
import { allModes } from '../../.storybook/modes';
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
	decorators: centreColumnDecorator,
	parameters: {
		chromatic: {
			modes: {
				horizontal: allModes.splitHorizontal,
			},
		},
	},
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
} satisfies Story;

export const WithResults = {
	...Default,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const questions = canvas.getAllByRole('listitem');

		for (const question of questions) {
			const questionElement = within(question);
			const [firstAnswer] = questionElement.getAllByRole('radio');
			const revealButton = questionElement.getByRole('button');

			await userEvent.click(firstAnswer!);
			await userEvent.click(revealButton);
		}
	},
	parameters: {
		chromatic: {
			modes: {
				horizontal: { disable: true },
				'vertical mobileLandscape':
					allModes['vertical mobileLandscape'],
			},
		},
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
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Comment,
			theme: ArticleSpecial.Labs,
		},
	},
} satisfies Story;
