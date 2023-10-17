import { css } from '@emotion/react';
import { Pillar } from '@guardian/libs';
import { Radio, RadioGroup } from '@guardian/source-react-components';
import {
	CorrectSelectedAnswer,
	IncorrectAnswer,
	NonSelectedCorrectAnswer,
	radioButtonWrapperStyles,
	UnselectedAnswer,
} from './Answers';

export default {
	title: 'Answers',
};

export const Answers = () => (
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
);
