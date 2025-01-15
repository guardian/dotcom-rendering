import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';
import { centreColumnDecorator } from '../../.storybook/decorators/gridDecorators';
import { allModes } from '../../.storybook/modes';
import {
	examplePersonalityQuestions,
	exampleResultBuckets,
} from '../../fixtures/manual/personalityQuizAtom';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '../lib/articleFormat';
import { PersonalityQuizAtom } from './PersonalityQuizAtom.importable';

const meta = {
	title: 'Components/PersonalityQuizAtom',
	component: PersonalityQuizAtom,
	decorators: centreColumnDecorator,
	parameters: {
		chromatic: {
			modes: {
				horizontal: allModes.splitHorizontal,
			},
		},
	},
} satisfies Meta<typeof PersonalityQuizAtom>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		id: 'quiz-id',
		questions: examplePersonalityQuestions,
		resultBuckets: exampleResultBuckets,
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

			await userEvent.click(firstAnswer!);
		}

		// We could be viewing light and dark mode side-by-side, in which case
		// there are two submit buttons, as the component is rendered twice.
		const submitButtons = canvas.getAllByRole('button', {
			name: /submit/i,
		});

		for (const button of submitButtons) {
			await userEvent.click(button);
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

export const LabsTheme = {
	args: {
		...Default.args,
		id: '2c6bf552-2827-4256-b3a0-f557d215c394',
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Comment,
			theme: ArticleSpecial.Labs,
		},
	},
} satisfies Story;
