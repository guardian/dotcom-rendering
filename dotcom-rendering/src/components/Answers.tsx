import { css } from '@emotion/react';
import type { ArticleTheme } from '@guardian/libs';
import { ArticleSpecial } from '@guardian/libs';
import {
	article17,
	palette,
	space,
	textSans14,
	textSans17,
} from '@guardian/source/foundations';
import { SvgCheckmark, SvgCross } from '@guardian/source/react-components';
import { palette as schemedPalette } from '../palette';

// We export Radio wrapper styles to override Source Radio buttons to align
// with our custom answers for the quiz
export const radioButtonWrapperStyles = (theme: ArticleTheme) => css`
	label {
		padding-top: ${space[3]}px;
		padding-bottom: ${space[3]}px;
		padding-left: ${space[2]}px;
		padding-right: ${space[2]}px;

		margin-bottom: ${space[2]}px;

		background-color: ${schemedPalette('--quiz-atom-answers-background')};

		:hover {
			background-color: ${schemedPalette('--quiz-atom-answers-hover')};
		}
		/* TODO: apply same styles on focus (requires source update) */

		div {
			color: inherit;
			${fontStyles(theme)};
		}
	}
`;

const fontStyles = (theme: ArticleTheme) =>
	theme === ArticleSpecial.Labs ? textSans17 : article17;

const answerWithSVGStyles = css`
	margin-bottom: ${space[2]}px;

	padding-top: ${space[2]}px;
	padding-bottom: ${space[3]}px;
	padding-right: ${space[4]}px;
	padding-left: ${space[3]}px;
`;

const WhiteCheckmark = () => (
	<div
		css={css`
			margin-right: ${space[1]}px;

			height: ${space[6]}px;
			svg {
				fill: ${palette.neutral[100]};
				height: ${space[6]}px;
				width: ${space[6]}px;
			}
		`}
	>
		<SvgCheckmark />
	</div>
);

const BlackCheckmark = () => (
	<div
		css={css`
			margin-right: ${space[1]}px;

			height: ${space[6]}px;
			svg {
				fill: ${schemedPalette('--quiz-atom-check-mark')};
				height: ${space[6]}px;
				width: ${space[6]}px;
			}
		`}
	>
		<SvgCheckmark />
	</div>
);

const WhiteCross = () => (
	<div
		css={css`
			margin-right: ${space[1]}px;

			height: ${space[6]}px;
			svg {
				fill: ${palette.neutral[100]};
				height: ${space[6]}px;
				width: ${space[6]}px;
			}
		`}
	>
		<SvgCross />
	</div>
);

const WhiteText = ({
	text,
	supplementText,
	id,
	answerType,
	theme,
}: {
	id: string;
	text: string;
	supplementText?: string;
	answerType: string;
	theme: ArticleTheme;
}) => (
	<label
		css={css`
			color: ${palette.neutral[100]};
			display: flex;
			flex-direction: column;

			${fontStyles(theme)};
		`}
		data-testid={id}
		data-answer-type={answerType}
	>
		<span
			css={css`
				${fontStyles(theme)};
			`}
		>
			{text}
		</span>
		{!!supplementText && (
			<span
				css={css`
					${textSans14}
				`}
			>
				{supplementText}
			</span>
		)}
	</label>
);

const BlackText = ({
	text,
	supplementText,
	id,
	answerType,
	theme,
}: {
	id: string;
	text: string;
	supplementText?: string;
	answerType: string;
	theme: ArticleTheme;
}) => (
	<label
		css={css`
			color: inherit;
			display: flex;
			flex-direction: column;

			${fontStyles(theme)};
		`}
		data-testid={id}
		data-answer-type={answerType}
	>
		<span
			css={css`
				${fontStyles(theme)};
			`}
		>
			{text}
		</span>
		{!!supplementText && (
			<span
				css={css`
					${textSans14}
				`}
			>
				{supplementText}
			</span>
		)}
	</label>
);

const correctSelectedAnswerStyles = css`
	display: flex;
	flex-direction: row;

	background-color: ${palette.success[400]};
`;

export const CorrectSelectedAnswer = ({
	answerText,
	explainerText,
	id,
	theme,
}: {
	answerText: string;
	explainerText: string;
	id: string;
	theme: ArticleTheme;
}) => (
	<div css={[answerWithSVGStyles, correctSelectedAnswerStyles]}>
		<WhiteCheckmark />
		<WhiteText
			id={id}
			text={answerText}
			supplementText={explainerText}
			answerType="correct-selected-answer"
			theme={theme}
		/>
	</div>
);

const incorrectSelectedAnswerStyles = css`
	display: flex;
	flex-direction: row;

	background-color: ${schemedPalette(
		'--quiz-atom-incorrect-answer-background',
	)};
`;

export const IncorrectAnswer = ({
	answerText,
	id,
	theme,
}: {
	answerText: string;
	id: string;
	theme: ArticleTheme;
}) => (
	<div css={[answerWithSVGStyles, incorrectSelectedAnswerStyles]}>
		<WhiteCross />
		<WhiteText
			id={id}
			text={answerText}
			answerType="incorrect-answer"
			theme={theme}
		/>
	</div>
);

const correctNonSelectedAnswerStyles = css`
	display: flex;
	flex-direction: row;
	border: 2px solid ${palette.success[400]};
	padding-left: 10px;

	background-color: ${schemedPalette('--quiz-atom-answers-background')};
`;

export const NonSelectedCorrectAnswer = ({
	answerText,
	explainerText,
	id,
	theme,
}: {
	answerText: string;
	explainerText: string;
	id: string;
	theme: ArticleTheme;
}) => (
	<div css={[answerWithSVGStyles, correctNonSelectedAnswerStyles]}>
		<BlackCheckmark />
		<BlackText
			id={id}
			text={answerText}
			supplementText={explainerText}
			answerType="non-selected-correct-answer"
			theme={theme}
		/>
	</div>
);

const unselectedAnswerStyles = css`
	background-color: ${schemedPalette('--quiz-atom-answers-background')};
	margin-bottom: ${space[2]}px;

	padding-top: ${space[2]}px;
	padding-bottom: ${space[3]}px;
	padding-right: ${space[2]}px;
	padding-left: ${space[9]}px;
`;

export const UnselectedAnswer = ({
	id,
	answerText,
	theme,
}: {
	answerText: string;
	id: string;
	theme: ArticleTheme;
}) => (
	<div css={unselectedAnswerStyles}>
		<BlackText
			id={id}
			text={answerText}
			answerType="unselected-disabled-answer"
			theme={theme}
		/>
	</div>
);
