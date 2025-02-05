import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import {
	article17,
	palette as sourcePalette,
	space,
	textSans17,
	textSansBold17,
} from '@guardian/source/foundations';
import { Button, Radio, RadioGroup } from '@guardian/source/react-components';
import type { KeyboardEvent, MouseEvent } from 'react';
import { memo, useEffect, useState } from 'react';
import { ArticleSpecial } from '../lib/articleFormat';
import type { ArticleFormat, ArticleTheme } from '../lib/articleFormat';
import { palette } from '../palette';
import type {
	AnswerType,
	PersonalityQuizAtomType,
	QuestionType,
	ResultsBucketType,
} from '../types/content';
import { radioButtonWrapperStyles } from './Answers';
import { ShareButton } from './ShareButton.importable';

const answersWrapperStyle = (theme: ArticleTheme) => css`
	margin-bottom: 12px;
	border: 0px;
	padding: 0px;
	${theme === ArticleSpecial.Labs ? textSans17 : article17};

	label {
		width: inherit;
	}
`;

export const findMostReferredToBucketId = ({
	selectedGlobalAnswers,
	questions,
}: {
	selectedGlobalAnswers: Record<string, string>;
	questions: QuestionType[];
}) => {
	const bucketCounter: Record<string, number> = {};

	const answersFromQuestion: AnswerType[] = Object.keys(selectedGlobalAnswers)
		.map((questionId: string): AnswerType | undefined => {
			const selectedQuestion = questions.find(
				(question) => question.id === questionId,
			);
			const answerId = selectedGlobalAnswers[questionId];
			const selectedAnswer = selectedQuestion?.answers.find(
				(answer) => answer.id === answerId,
			);
			return selectedAnswer;
		})
		.filter(
			(selectedAnswer): boolean => !isUndefined(selectedAnswer),
		) as AnswerType[];

	for (const answerFromQuestion of answersFromQuestion) {
		for (const answerBucket of answerFromQuestion.answerBuckets) {
			if (typeof bucketCounter[answerBucket] === 'number') {
				bucketCounter[answerBucket] += 1;
			} else {
				bucketCounter[answerBucket] = 1;
			}
		}
	}

	let bucketIdWithHighestCount: string | undefined;
	for (const bucketId of Object.keys(bucketCounter)) {
		if (!bucketIdWithHighestCount) {
			bucketIdWithHighestCount = bucketId;
			continue;
		}
		const thisBucket = bucketCounter[bucketId];
		const currentHighestBucket = bucketCounter[bucketIdWithHighestCount];

		if (!isUndefined(thisBucket) && !isUndefined(currentHighestBucket)) {
			bucketIdWithHighestCount =
				thisBucket > currentHighestBucket
					? bucketId
					: bucketIdWithHighestCount;
		}
	}

	return bucketIdWithHighestCount as string;
};

export const PersonalityQuizAtom = ({
	id,
	questions,
	resultBuckets,
	pageId,
	webTitle,
	format,
}: PersonalityQuizAtomType) => {
	const [selectedGlobalAnswers, setSelectedGlobalAnswers] = useState<
		Record<string, string>
	>({});

	const [hasSubmittedAnswers, setHasSubmittedAnswers] =
		useState<boolean>(false);
	const [hasMissingAnswers, setHasMissingAnswers] = useState<boolean>(false);

	const [topSelectedResult, setTopSelectedResult] =
		useState<ResultsBucketType | null>();

	const onSubmit = (e: MouseEvent | KeyboardEvent) => {
		e.preventDefault();
		// check all answers have been selected
		const missingAnswers = questions.some((question) =>
			question.id in selectedGlobalAnswers ? false : true,
		);

		if (missingAnswers) {
			setHasMissingAnswers(true);
		} else {
			setHasSubmittedAnswers(true);
		}
	};

	useEffect(() => {
		if (hasSubmittedAnswers && Object.keys(selectedGlobalAnswers).length) {
			const bucketIdWithHighestCount = findMostReferredToBucketId({
				selectedGlobalAnswers,
				questions,
			});
			setTopSelectedResult(
				resultBuckets.find(
					(resultBucket) =>
						resultBucket.id === bucketIdWithHighestCount,
				),
			);
		} else {
			setTopSelectedResult(null);
		}
	}, [
		hasSubmittedAnswers,
		selectedGlobalAnswers,
		setTopSelectedResult,
		resultBuckets,
		questions,
	]);
	const theme = format.theme;

	return (
		<form data-atom-id={id} data-atom-type="personalityquiz">
			{hasSubmittedAnswers && topSelectedResult && (
				<div data-testid="quiz-results-block-top">
					<Result
						resultBuckets={topSelectedResult}
						pageId={pageId}
						webTitle={webTitle}
						format={format}
					/>
				</div>
			)}
			<ol data-ignore="global-ol-styling">
				{questions.map((question, idx) => (
					<PersonalityQuizAnswers
						key={question.id}
						id={question.id}
						questionNumber={idx + 1}
						text={question.text}
						imageUrl={question.imageUrl}
						imageAlt={question.imageAlt}
						answers={question.answers}
						updateSelectedAnswer={(selectedAnswerId: string) => {
							setHasMissingAnswers(false);
							setSelectedGlobalAnswers({
								...selectedGlobalAnswers,
								[question.id]: selectedAnswerId,
							});
						}}
						globallySelectedAnswer={
							question.id in selectedGlobalAnswers
								? selectedGlobalAnswers[question.id]
								: undefined
						}
						hasSubmittedAnswers={hasSubmittedAnswers}
						theme={theme}
					/>
				))}
			</ol>
			{hasMissingAnswers && <MissingAnswers />}
			{hasSubmittedAnswers && topSelectedResult && (
				<div data-testid="quiz-results-block-bottom">
					<Result
						resultBuckets={topSelectedResult}
						pageId={pageId}
						webTitle={webTitle}
						format={format}
					/>
				</div>
			)}
			<div
				css={css`
					display: flex;
					flex-direction: row;
					button {
						margin-right: 10px;
					}
				`}
			>
				<Button
					type="submit"
					onClick={onSubmit}
					theme={{
						backgroundPrimary: palette(
							'--quiz-atom-button-background',
						),
						textPrimary: palette('--quiz-atom-button-text'),
						backgroundPrimaryHover: palette(
							'--quiz-atom-button-background-hover',
						),
					}}
					onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
						const spaceKey = 32;
						const enterKey = 13;
						if (e.keyCode === spaceKey || e.keyCode === enterKey) {
							onSubmit(e);
						}
					}}
					data-testid="submit-quiz"
				>
					Submit
				</Button>
				<Button
					priority="secondary"
					onClick={() => {
						setSelectedGlobalAnswers({});
						setHasSubmittedAnswers(false);
						setTopSelectedResult(null);
					}}
					onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
						const spaceKey = 32;
						const enterKey = 13;
						if (e.keyCode === spaceKey || e.keyCode === enterKey) {
							setSelectedGlobalAnswers({});
							setHasSubmittedAnswers(false);
							setTopSelectedResult(null);
						}
					}}
					data-testid="reset-quiz"
				>
					Reset
				</Button>
			</div>
		</form>
	);
};

type PersonalityQuizAnswersProps = {
	id: string;
	questionNumber: number;
	text: string;
	imageUrl?: string;
	imageAlt?: string;
	answers: AnswerType[];
	updateSelectedAnswer: (selectedAnswerId: string) => void;
	globallySelectedAnswer?: string;
	hasSubmittedAnswers: boolean;
	theme: ArticleTheme;
};

const PersonalityQuizAnswers = ({
	id: questionId,
	questionNumber,
	text,
	imageUrl,
	imageAlt,
	answers,
	updateSelectedAnswer,
	globallySelectedAnswer,
	hasSubmittedAnswers,
	theme,
}: PersonalityQuizAnswersProps) => {
	// use local state to avoid re-renders of AnswersGroup from updates due to: updateSelectedAnswer & selectedAnswer
	const [selectedAnswer, setSelectedAnswers] = useState<string | undefined>();

	useEffect(() => {
		if (selectedAnswer && selectedAnswer !== globallySelectedAnswer) {
			updateSelectedAnswer(selectedAnswer);
		}
	}, [updateSelectedAnswer, selectedAnswer, globallySelectedAnswer]);

	// in order to reset selection
	useEffect(() => {
		if (!globallySelectedAnswer) setSelectedAnswers(undefined);
	}, [globallySelectedAnswer, setSelectedAnswers]);

	return (
		<li css={answersWrapperStyle(theme)}>
			<fieldset>
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
						{`${questionNumber}.`}
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
				<AnswersGroup
					hasSubmittedAnswers={hasSubmittedAnswers}
					questionId={questionId}
					answers={answers}
					selectedAnswer={selectedAnswer}
					setSelectedAnswers={setSelectedAnswers}
					theme={theme}
				/>
			</fieldset>
		</li>
	);
};

type AnswersGroupProp = {
	hasSubmittedAnswers: boolean;
	questionId: string;
	answers: AnswerType[];
	selectedAnswer: string | undefined;
	setSelectedAnswers: (selectedAnswerId: string) => void;
	theme: ArticleTheme;
};

const AnswersGroup = memo(
	({
		hasSubmittedAnswers,
		questionId,
		answers,
		selectedAnswer,
		setSelectedAnswers,
		theme,
	}: AnswersGroupProp) => (
		<div
			css={[
				radioButtonWrapperStyles(theme),
				css`
					label {
						:hover {
							background-color: ${hasSubmittedAnswers
								? palette('--quiz-atom-answers-background')
								: palette('--quiz-atom-answers-hover')};
						}
						/* TODO: apply same styles on focus (requires source update) */
					}
				`,
			]}
		>
			<RadioGroup name={questionId}>
				{answers.map((answer) => (
					<Radio
						key={answer.id}
						value={answer.text}
						label={answer.text}
						data-testid={answer.id}
						data-answer-type={
							selectedAnswer === answer.id
								? 'selected-enabled-answer'
								: 'unselected-enabled-answer'
						}
						disabled={hasSubmittedAnswers}
						onChange={() => setSelectedAnswers(answer.id)}
						checked={selectedAnswer === answer.id}
					/>
				))}
			</RadioGroup>
		</div>
	),
);
AnswersGroup.displayName = 'AnswersGroup';

const missingAnswersStyles = css`
	${textSansBold17}
	padding-bottom: ${space[3]}px;
	color: ${sourcePalette.error[500]};
`;

export const MissingAnswers = () => (
	<div css={missingAnswersStyles}>
		You have not answered all the questions.
	</div>
);

const resultWrapperStyles = css`
	background-color: ${palette('--quiz-atom-results-background')};
	color: ${palette('--quiz-atom-results-text')};
	margin-top: ${space[3]}px;
	margin-bottom: ${space[3]}px;
	padding: ${space[2]}px;
	border: 1px solid ${palette('--quiz-atom-results-border')};
`;

const resultHeaderStyles = css`
	${textSansBold17}
	padding-bottom: ${space[2]}px;
`;

const resultDescriptionStyles = css`
	${textSans17}
`;

export const Result = ({
	resultBuckets,
	pageId,
	webTitle,
	format,
}: {
	resultBuckets: ResultsBucketType;
	pageId: string;
	webTitle: string;
	format: ArticleFormat;
}) => (
	<div css={resultWrapperStyles}>
		<div css={resultHeaderStyles}>{resultBuckets.title}</div>
		<div css={resultDescriptionStyles}>{resultBuckets.description}</div>
		<hr />
		<div css={resultHeaderStyles}>Challenge your friends</div>
		<ShareButton
			pageId={pageId}
			webTitle={webTitle}
			format={format}
			context="ArticleMeta"
		/>
	</div>
);
