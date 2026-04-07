import { userEvent, within } from 'storybook/test';
import { centreColumnDecorator } from '../../.storybook/decorators/gridDecorators';
import { allModes } from '../../.storybook/modes';
import preview from '../../.storybook/preview';
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
import { PersonalityQuizAtom } from './PersonalityQuizAtom.island';

const meta = preview.meta({
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
});

export const Default = meta.story({
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
});

export const WithResults = meta.story({
	...Default.input,
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
});

export const LabsTheme = meta.story({
	args: {
		...Default.input.args,
		id: '2c6bf552-2827-4256-b3a0-f557d215c394',
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Comment,
			theme: ArticleSpecial.Labs,
		},
	},
});
