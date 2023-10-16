import { css } from '@emotion/react';
import type { ArticleTheme } from '@guardian/libs';
import { ArticleSpecial } from '@guardian/libs';
import {
	body,
	brand,
	neutral,
	space,
	textSans,
} from '@guardian/source-foundations';
import { Button, Radio, RadioGroup } from '@guardian/source-react-components';
import { Fragment, useEffect, useState } from 'react';
import {
	CorrectSelectedAnswer,
	IncorrectAnswer,
	NonSelectedCorrectAnswer,
	radioButtonWrapperStyles,
	UnselectedAnswer,
} from './Answers';
import { SharingIcons } from './SharingIcons';
import type { SharingUrlsType } from './SharingIcons';

type AnswerType = {
	id: string;
	text: string;
	revealText?: string;
	isCorrect: boolean;
	answerBuckets: string[];
};

type QuestionType = {
	id: string;
	text: string;
	answers: AnswerType[];
	imageUrl?: string;
	imageAlt?: string;
};

type ResultGroupsType = {
	title: string;
	shareText: string;
	minScore: number;
	id: string;
};

export type QuizAtomType = {
	id: string;
	questions: QuestionType[];
	resultGroups: ResultGroupsType[];
	sharingUrls: SharingUrlsType;
	theme: ArticleTheme;
};

type QuizSelectionType = Record<string, AnswerType>;

const fieldsetStyle = css`
	margin-bottom: 12px;
	border: 0px;
	padding: 0px;

	label {
		width: inherit;
	}
`;

export const KnowledgeQuizAtom = ({
	id,
	questions,
	resultGroups,
	sharingUrls,
	theme,
}: QuizAtomType) => {
	const [quizSelection, setQuizSelection] = useState<QuizSelectionType>({});

	const haveAllQuestionsBeenAnswered =
		Object.keys(quizSelection).length === questions.length;

	return (
		<form data-atom-id={id} data-atom-type="knowledgequiz">
			{haveAllQuestionsBeenAnswered && (
				<div data-testid="quiz-results-block-top">
					<Result
						quizSelection={quizSelection}
						resultGroups={resultGroups}
						sharingUrls={sharingUrls}
					/>
				</div>
			)}
			<ol data-ignore="global-ol-styling">
				{questions.map((question, idx) => (
					<Question
						key={question.id}
						id={question.id}
						number={idx + 1}
						text={question.text}
						imageUrl={question.imageUrl}
						imageAlt={question.imageAlt}
						answers={question.answers}
						quizSelection={quizSelection}
						setQuizSelection={setQuizSelection}
						theme={theme}
					/>
				))}
			</ol>
			{haveAllQuestionsBeenAnswered && (
				<div data-testid="quiz-results-block-top">
					<Result
						quizSelection={quizSelection}
						resultGroups={resultGroups}
						sharingUrls={sharingUrls}
					/>
				</div>
			)}
		</form>
	);
};

export const Question = ({
	id,
	text,
	imageUrl,
	imageAlt,
	answers,
	number,
	quizSelection,
	setQuizSelection,
	theme,
}: QuestionType & {
	number: number;
	quizSelection: QuizSelectionType;
	setQuizSelection: React.Dispatch<React.SetStateAction<QuizSelectionType>>;
	theme: ArticleTheme;
}) => {
	const [selectedAnswerId, setSelectedAnswerId] = useState<
		string | undefined
	>();
	const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

	useEffect(() => {
		if (selectedAnswerId && hasSubmitted) {
			const selectedAnswer = answers.find(
				(answer) => answer.id === selectedAnswerId,
			);
			if (selectedAnswer) {
				setQuizSelection((selection) => ({
					...selection,
					[id]: selectedAnswer,
				}));
			}
		}
	}, [selectedAnswerId, setQuizSelection, hasSubmitted, answers, id]);

	return (
		<li
			css={css`
				${theme === ArticleSpecial.Labs
					? textSans.medium()
					: body.medium()};
			`}
		>
			<fieldset css={fieldsetStyle}>
				<legend
					css={css`
						margin-bottom: 12px;
					`}
				>
					<span
						css={css`
							padding-right: 12px;
						`}
					>
						{`${number}.`}
					</span>
					{text}
				</legend>
				{!!imageUrl && (
					<img
						css={css`
							width: 100%;
						`}
						src={imageUrl}
						alt={imageAlt ?? ''}
					/>
				)}
				<Answers
					id={id}
					answers={answers}
					hasSubmitted={hasSubmitted}
					selectedAnswerId={selectedAnswerId}
					setSelectedAnswerId={setSelectedAnswerId}
					theme={theme}
				/>
				<div
					css={css`
						display: flex;
						flex-direction: row;
						margin-bottom: 8px;
						button {
							margin-right: 10px;
						}
					`}
				>
					<Button
						size="small"
						data-testid={`submit-question-${id}`}
						onClick={() => {
							setHasSubmitted(true);
						}}
						onKeyDown={(
							e: React.KeyboardEvent<HTMLButtonElement>,
						) => {
							const spaceKey = 32;
							const enterKey = 13;
							if (
								e.keyCode === spaceKey ??
								e.keyCode === enterKey
							) {
								setHasSubmitted(true);
							}
						}}
					>
						Reveal
					</Button>
				</div>
			</fieldset>
		</li>
	);
};

const Answers = ({
	answers,
	id: questionId,
	hasSubmitted,
	selectedAnswerId,
	setSelectedAnswerId,
	theme,
}: {
	answers: AnswerType[];
	id: string;
	hasSubmitted: boolean;
	selectedAnswerId?: string;
	setSelectedAnswerId: (selectedAnswerId: string) => void;
	theme: ArticleTheme;
}) => {
	if (hasSubmitted) {
		return (
			<Fragment>
				{answers.map((answer) => {
					const isSelected = selectedAnswerId === answer.id;

					if (isSelected) {
						if (answer.isCorrect) {
							return (
								<CorrectSelectedAnswer
									key={answer.id}
									id={answer.id}
									answerText={answer.text}
									explainerText={answer.revealText ?? ''}
									theme={theme}
								/>
							);
						}

						if (!answer.isCorrect) {
							return (
								<IncorrectAnswer
									key={answer.id}
									id={answer.id}
									answerText={answer.text}
									theme={theme}
								/>
							);
						}
					}

					if (answer.isCorrect) {
						return (
							<NonSelectedCorrectAnswer
								key={answer.id}
								id={answer.id}
								answerText={answer.text}
								explainerText={answer.revealText ?? ''}
								theme={theme}
							/>
						);
					}

					return (
						<UnselectedAnswer
							key={answer.id}
							id={answer.id}
							answerText={answer.text}
							theme={theme}
						/>
					);
				})}
			</Fragment>
		);
	}

	return (
		<div css={radioButtonWrapperStyles(theme)}>
			<RadioGroup name={questionId}>
				{answers.map((answer) => (
					<Radio
						key={answer.id}
						value={answer.text}
						data-testid={answer.id}
						data-answer-type={
							selectedAnswerId === answer.id
								? 'selected-enabled-answer'
								: 'unselected-enabled-answer'
						}
						name={questionId}
						label={answer.text}
						onChange={() => setSelectedAnswerId(answer.id)}
						checked={selectedAnswerId === answer.id}
					/>
				))}
			</RadioGroup>
		</div>
	);
};

const resultWrapperStyles = css`
	background-color: ${neutral[93]};
	margin-top: ${space[3]}px;
	margin-bottom: ${space[3]}px;
	padding: ${space[2]}px;
`;

const resultDescriptionStyles = css`
	${textSans.medium()}
	display: flex;
	flex-direction: column;
`;

const resultsNumberStyles = css`
	${textSans.xxxlarge({ fontWeight: 'bold' })}
	color: ${brand[400]};
`;

const resultHeaderStyles = css`
	${textSans.medium({ fontWeight: 'bold' })}
	color: ${neutral[20]};
	padding-bottom: ${space[1]}px;
`;

export const Result = ({
	quizSelection,
	resultGroups,
	sharingUrls,
}: {
	quizSelection: Record<string, AnswerType>;
	resultGroups: ResultGroupsType[];
	sharingUrls: SharingUrlsType;
}) => {
	const totalNumberOfQuestions = Object.keys(quizSelection).length;
	const numberOfCorrectAnswers = Object.keys(quizSelection).filter(
		(questionId) => quizSelection[questionId]?.isCorrect,
	).length;
	const totalResultGroups = resultGroups.length;
	let bestResultGroup: ResultGroupsType | undefined;
	const resultBrackets = [];
	let bracketIndex = 0;

	// Sort the results by lowest score first
	resultGroups.sort(function (a, b) {
		return a.minScore - b.minScore;
	});

	// If there is a result group for each question return the matching score
	if (totalNumberOfQuestions === totalResultGroups) {
		for (const resultGroup of resultGroups) {
			if (numberOfCorrectAnswers === resultGroup.minScore) {
				bestResultGroup = resultGroup;
			}
		}
	} else {
		// If there are less result groups than questions then answers are being put into brackets e.g. 1-5 correct, 6-10 correct
		// Find the score ranges
		// Decide which bracket the score is in
		for (let i = 0; i < resultGroups.length; i++) {
			const resultGroup = resultGroups[i];

			if (resultGroup) {
				resultBrackets[i] = resultGroup.minScore;
			}
		}

		// The regular sort function doesn't sort numbers, it works alphabetically
		resultBrackets.sort(function (a, b) {
			return a - b;
		});

		for (let i = 0; i < resultBrackets.length; i++) {
			const resultBracket = resultBrackets[i];

			if (resultBracket !== undefined) {
				if (numberOfCorrectAnswers >= resultBracket) {
					bracketIndex = i;
				}
			}
		}
	}
	bestResultGroup = resultGroups[bracketIndex];

	return (
		<div css={resultWrapperStyles}>
			<div css={resultDescriptionStyles}>
				<span>You got...</span>
				<span
					css={resultsNumberStyles}
				>{`${numberOfCorrectAnswers}/${totalNumberOfQuestions}`}</span>
				{bestResultGroup && <span>{bestResultGroup.title}</span>}
			</div>

			<hr />
			<div css={resultHeaderStyles}>Challenge your friends</div>
			<SharingIcons
				sharingUrls={sharingUrls}
				displayIcons={[
					'facebook',
					'twitter',
					'email',
					'whatsApp',
					'messenger',
					'linkedIn',
					'pinterest',
				]}
			/>
		</div>
	);
};
