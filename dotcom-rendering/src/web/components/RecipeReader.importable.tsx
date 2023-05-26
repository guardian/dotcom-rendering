/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import 'regenerator-runtime/runtime';

import { css } from '@emotion/react';
import {
	Button,
	SvgChevronLeftSingle,
	SvgChevronRightSingle,
	SvgCross,
} from '@guardian/source-react-components';
import { useCallback, useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import SpeechRecognition, {
	useSpeechRecognition,
} from 'react-speech-recognition';
import {
	FilledTomatoIcon,
	OutLineTomatoIcon,
	OvenGloveIcon,
} from './ChefModeElements';
import { recipeData } from './recipes_table_export';

// This doesn't work in anything other than chrome - transcription working in Safari but not commands

// TODO
// 1. Add a button to start voice recognition instead of doing it on dialog open - more transparent
// 2. Use a feature specific flag (or no flag because this is a hack)
// 3. Add support for multiple recipes on a page
// 3. Extract speech recognition into a module, so we can swap out the implementation without changing the component

interface RecipeReaderProps {
	pageId: string;
}
interface ModalHeaderProps {
	title: string;
	onClose: () => void;
	toggleShowIngredients: () => void;
	showingIngredients: boolean;
}
interface ModalBodyProps {
	children: React.ReactNode;
}

const findValidRecipe = (pageId: string) => {
	const data = recipeData as any;
	return data?.Items.find((item: any) => item.path === pageId);
};

const ModalHeader = ({
	title,
	onClose,
	toggleShowIngredients,
	showingIngredients,
}: ModalHeaderProps) => {
	return (
		<div css={modalHeaderStyles}>
			<h2>{title}</h2>
			<div>
				<Button
					icon={
						showingIngredients ? (
							<OutLineTomatoIcon />
						) : (
							<FilledTomatoIcon />
						)
					}
					hideLabel={true}
					priority="subdued"
					size="small"
					onClick={toggleShowIngredients}
					css={{ color: '#fff' }}
				/>
				<Button
					icon={<SvgCross />}
					hideLabel={true}
					priority="subdued"
					size="small"
					onClick={() => onClose()}
					css={{ color: '#fff' }}
				/>
			</div>
		</div>
	);
};

const ModalBody = ({ children }: ModalBodyProps) => {
	return <div css={modalBodyStyles}>{children}</div>;
};

const ModalFooter = ({ children }: ModalBodyProps) => {
	return <div css={modalFooterStyles}>{children}</div>;
};

interface Ingredient {
	text: string;
	item: string;
}
interface RecipeIngredientsProps {
	ingredients: Ingredient[];
	step: string;
}

const getIngredientClass = (step: string, ingredient: string) => {
	const keywordRegex = new RegExp(`\\b${ingredient}\\b`, 'g');

	const contains = keywordRegex.test(step);
	if (contains) {
		return 'highlighted';
	} else return undefined;
};

export const Ingredients = ({ ingredients, step }: RecipeIngredientsProps) => {
	return (
		<div css={ingredientsStyles}>
			<h2 css={sectionHeadingStyle}>Ingredients</h2>
			<ul>
				{ingredients.map((ingredient, index) => (
					<>
						<li
							key={`${index}-ingredient`}
							id="ingredient"
							className={getIngredientClass(
								step,
								ingredient.item,
							)}
						>
							{ingredient.text}
						</li>
					</>
				))}
			</ul>
		</div>
	);
};

export const RecipeReader = ({ pageId }: RecipeReaderProps) => {
	const [showReader, setShowReader] = useState(false);
	const [activeStep, setActiveStep] = useState(0);
	const [showIngredients, setShowIngredients] = useState(false);
	const recipe = findValidRecipe(`/${pageId}`);
	const steps = recipe?.steps;
	const recipeTitle = recipe?.recipes_title;

	const commands = [
		{
			command: ['next step', 'forward'],
			callback: () => stepForward(),
			isFuzzyMatch: true,
		},
		{
			command: ['previous step', 'step back', 'back', 'go back'],
			callback: () => stepBackward(),
			isFuzzyMatch: true,
		},
		{
			command: ['show ingredients', 'show recipe', 'open recipe'],
			callback: () => setShowIngredients(true),
			isFuzzyMatch: true,
		},
		{
			command: ['hide ingredients', 'hide recipe', 'close recipe'],
			callback: () => setShowIngredients(false),
			isFuzzyMatch: true,
		},
		{
			command: [
				'close',
				'close recipe',
				'close reader',
				'exit',
				'finish',
			],
			callback: () => handleCloseDialog(),
			isFuzzyMatch: true,
		},
	];

	const { browserSupportsSpeechRecognition, transcript } =
		useSpeechRecognition({ commands });
	const stepForward = () => {
		if (!isLastStep()) {
			setActiveStep((prev) => prev + 1);
		}
	};

	const stepBackward = () => {
		setActiveStep((prev) => (prev > 0 ? prev - 1 : 0));
	};

	const keyPressHandler = useCallback(({ key }: KeyboardEvent) => {
		switch (key) {
			case 'ArrowUp':
			case 'ArrowRight':
				stepForward();
				break;
			case 'ArrowDown':
			case 'ArrowLeft':
				stepBackward();
				break;
			case 'Escape':
				setShowReader(false);
				break;
			default:
				break;
		}
	}, []); //todo - WTAF is going on here

	useEffect(() => {
		if (showReader) {
			void SpeechRecognition.startListening({ continuous: true });
			window.addEventListener('keydown', keyPressHandler);
		}
		return () => {
			void SpeechRecognition.stopListening();
			window.removeEventListener('keydown', keyPressHandler);
		};
	}, [keyPressHandler, showReader]);

	const ingredients = recipe?.ingredients_lists[0].ingredients; //todo - this is a hack - will fail for multiple recipe types
	const ingredientKeywords = ingredients.map(
		(ingredient: any) => ingredient.item,
	);

	useEffect(() => {
		if (showReader) {
			const originalMethodDiv = document.getElementById(
				'original-method-step',
			);
			const methodDiv = document.getElementById('method-step');

			if (showIngredients) {
				// Highlight the keywords
				let methodText = originalMethodDiv?.innerHTML ?? '';
				for (let i = 0; i < ingredientKeywords.length; i++) {
					const keywordRegex = new RegExp(
						`\\b${ingredientKeywords[i]}\\b`,
						'g',
					);
					methodText = methodText.replace(
						keywordRegex,
						`<span class="highlighted">$&</span>`,
					);
				}
				if (methodDiv) {
					methodDiv.innerHTML = methodText;
				}
			} else {
				// Remove the highlight
				if (methodDiv)
					methodDiv.innerHTML = originalMethodDiv?.innerHTML ?? '';
			}
		}
	}, [showReader, showIngredients, ingredientKeywords]);

	if (!recipe || !steps?.length) {
		return null;
	}

	const handleButtonClick = () => {
		setShowReader(true);
	};

	const handleCloseDialog = () => {
		setShowReader(false);
		void SpeechRecognition.stopListening();
	};

	const handleShowIngredients = () => {
		setShowIngredients(true);
	};
	const handleHideIngredients = () => {
		setShowIngredients(false);
	};

	const isFirstStep = () => activeStep === 0;
	const isLastStep = () => activeStep === steps.length - 1;

	if (!browserSupportsSpeechRecognition) {
		return <span>Browser doesn't support speech recognition.</span>;
	}
	console.log('transcript', transcript);
	return (
		<div css={containerStyles}>
			<Button
				priority="tertiary"
				onClick={handleButtonClick}
				size="small"
				css={{ marginLeft: 'auto', display: 'block' }}
			>
				<span css={{ marginTop: '5px', display: 'flex' }}>
					Chef mode
					<span css={{ marginLeft: '4px' }}>
						<OvenGloveIcon />
					</span>
				</span>
			</Button>

			{showReader && (
				<div>
					<div
						className="overlay"
						css={overlayStyles}
						onClick={handleCloseDialog}
					></div>

					<div className="dialog" css={dialogStyles}>
						<ModalHeader
							title={
								showIngredients
									? recipeTitle
									: `Step ${activeStep + 1} of ${
											steps.length
									  }`
							}
							onClose={handleCloseDialog}
							toggleShowIngredients={() => {
								showIngredients
									? handleHideIngredients()
									: handleShowIngredients();
							}}
							showingIngredients={showIngredients}
						/>

						<ModalBody>
							{showIngredients && ingredients && (
								<Ingredients
									ingredients={ingredients}
									step={steps[activeStep]}
								/>
							)}
							<div css={methodStyles(showIngredients)}>
								{showIngredients && (
									<h2 css={sectionHeadingStyle}>
										Step {activeStep + 1} of {steps.length}
									</h2>
								)}
								<div
									id="original-method-step"
									style={{ display: 'none' }}
								>
									{steps[activeStep]}
								</div>
								<div id="method-step"></div>
							</div>
						</ModalBody>

						<ModalFooter>
							{!isFirstStep() && (
								<Button
									onClick={stepBackward}
									priority="tertiary"
									css={{ marginRight: 'auto' }}
									icon={<SvgChevronLeftSingle />}
									iconSide="left"
									size="small"
								>
									Back
								</Button>
							)}
							{!isLastStep() && (
								<Button
									onClick={stepForward}
									priority="tertiary"
									css={{ marginLeft: 'auto' }}
									icon={<SvgChevronRightSingle />}
									iconSide="right"
									size="small"
								>
									Next
								</Button>
							)}
						</ModalFooter>
					</div>
				</div>
			)}
		</div>
	);
};

const containerStyles = css`
	font-family: 'GuardianTextSans';
`;

const overlayStyles = css`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.8);
	z-index: 1;
`;

const dialogStyles = css`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: white;
	z-index: 100;
	min-height: 60vh;
	min-width: 50vw;
	display: flex;
	flex-direction: column;
`;

const modalHeaderStyles = css`
	display: flex;
	background-color: #052962;
	color: #fff;
	padding: 8px;
	align-items: center;
	justify-content: space-between;
	flex-direction: row;
`;

const modalBodyStyles = css`
	display: flex;
	padding: 32px 16px;
`;

const modalFooterStyles = css`
	display: flex;
	justify-content: space-between;
	padding: 0 16px 16px 16px;
	margin-top: auto;
`;

const ingredientsStyles = css`
	width: 40%;
	margin-right: 16px;
	line-height: 27.5px;

	.highlighted {
		background-color: #ffe500;
		border: 1px solid white;
		box-sizing: border-box;
	}
`;

const methodStyles = (showIngredients: boolean) => css`
	width: ${showIngredients ? '60%' : '100%'};
	line-height: 20px;

	.highlighted {
		background-color: #ffe500;
	}
`;

const sectionHeadingStyle = css`
	color: #052962;
	padding-bottom: 8px;
`;
