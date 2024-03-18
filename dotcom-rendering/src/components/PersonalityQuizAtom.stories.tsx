import { ArticleSpecial, Pillar } from '@guardian/libs';
import type { Meta, StoryObj } from '@storybook/react';
import {
	examplePersonalityQuestions,
	exampleResultBuckets,
} from '../../fixtures/manual/personalityQuizAtom';
import { sharingUrls } from '../../fixtures/manual/sharingUrls';
import { PersonalityQuizAtom } from './PersonalityQuizAtom.importable';

const meta = {
	title: 'Components/PersonalityQuizAtom',
	component: PersonalityQuizAtom,
} satisfies Meta<typeof PersonalityQuizAtom>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		id: 'quiz-id',
		questions: examplePersonalityQuestions,
		resultBuckets: exampleResultBuckets,
		sharingUrls,
		theme: Pillar.News,
	},
} satisfies Story;

export const LabsTheme = {
	args: {
		...Default.args,
		id: '2c6bf552-2827-4256-b3a0-f557d215c394',
		theme: ArticleSpecial.Labs,
	},
} satisfies Story;
