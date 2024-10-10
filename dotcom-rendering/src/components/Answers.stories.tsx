import { css } from '@emotion/react';
import { Radio, RadioGroup } from '@guardian/source/react-components';
import type { Meta, StoryObj } from '@storybook/react';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/format';
import {
	CorrectSelectedAnswer,
	IncorrectAnswer,
	NonSelectedCorrectAnswer,
	radioButtonWrapperStyles,
	UnselectedAnswer,
} from './Answers';

const meta = {
	title: 'Components/Answers',
	decorators: [
		splitTheme([
			{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Comment,
				theme: Pillar.News,
			},
		]),
	],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Answers = {
	render: () => (
		<div
			css={css`
				display: flex;
				flex-direction: column;
			`}
		>
			<CorrectSelectedAnswer
				id="someId3"
				answerText="Correct Selected Answer"
				explainerText="this is such a cool answer"
				theme={Pillar.News}
			/>
			<NonSelectedCorrectAnswer
				id="someId4"
				answerText="Correct Non Selected Answer"
				explainerText="this is such a cool answer"
				theme={Pillar.News}
			/>
			<IncorrectAnswer
				id="someId5"
				answerText="Incorrect Answer"
				theme={Pillar.News}
			/>
			<UnselectedAnswer
				id="someId1"
				answerText="Unselectable unanswered answer"
				theme={Pillar.News}
			/>
			<div css={radioButtonWrapperStyles(Pillar.News)}>
				<RadioGroup name="answers">
					<Radio
						defaultChecked={true}
						value="answer one"
						label="Selectable unanswered answer"
					/>
					<Radio
						value="answer two"
						label="Selectable unanswered answer"
					/>
				</RadioGroup>
			</div>
		</div>
	),
} satisfies Story;
