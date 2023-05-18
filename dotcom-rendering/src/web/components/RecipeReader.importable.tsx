/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { css } from '@emotion/react';
import {
	Button,
	SvgChevronLeftSingle,
	SvgChevronRightSingle,
	SvgCross,
} from '@guardian/source-react-components';
import { useEffect, useState } from 'react';
// import { recipeData } from './recipes_table_export';

const recipeData = {};

declare const SpeechRecognition: any;

// This doesn't work in anything other than chrome

// ***** TO DO ******
// 5. Add a button to start voice recognition instead of doing it on dialog open - more transparent
// 6. Use a feature specific flag (or no flag because this is a hack)

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
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="64"
								height="64"
								viewBox="0 0 64 64"
							>
								<path
									fill="white"
									d="M61.96 31.649C60.747 10.563 49.854 7.48 41.072 7.479h-.001c-2.219.001-4.301.197-6.06.351c-.015-.959.026-1.986.187-3.121c.003-.016-.004-.03-.006-.045c.002-.008.006-.016.006-.024c0-.353-.664-.64-1.486-.64c-.82 0-1.484.287-1.484.64a24.454 24.454 0 0 1-.917 3.371c-11.587.07-26.85 1.908-29.18 22.922C.441 46.184 15.336 60 32.093 60S62.841 46.975 61.96 31.649M35.635 10.787c.409-.036.833-.073 1.269-.108c-.524.211-1.033.43-1.512.65c-.035-.158-.059-.346-.091-.514l.334-.028m-5.559.238c-.131.273-.259.535-.382.776a9.36 9.36 0 0 0-.933-.742c.438-.015.876-.025 1.315-.034m22.571 37.301C47.442 53.839 39.95 57 32.093 57c-8.007 0-15.96-3.544-21.276-9.48c-4.307-4.811-6.333-10.584-5.704-16.257c1.181-10.648 5.892-15.734 11.938-18.143c5.858-1.088 11.37.91 11.37.91s-12.529-3.11-17.442 12.988c6.183-9.639 16.823-6.802 19.622-10.355c0 6.869 4.992 3.536 7.515 6.63c3.246 3.978 4.434 11.106 8.168 12.51c-3.678-7.896 2.344-7.588-6.117-18.185c4.457 2.769 6.768-.033 12.854 2.462c-5.207-8.511-13.537-6.05-13.537-6.05s3.39-3.089 6.984-3.003c6.072 1.418 11.657 6.189 12.498 20.795c.342 5.965-1.902 11.826-6.319 16.504"
								/>
							</svg>
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="64"
								height="64"
								viewBox="0 0 64 64"
							>
								<path
									fill="#ef4d3c"
									d="M62 31.6C62.8 47 48.9 60 32.1 60S.4 46.2 2.1 30.9C4.5 9.4 20.4 8 32.1 8C39.2 8 60.2 1.8 62 31.6z"
								/>
								<path
									fill="#8cc63e"
									d="M11 27c6.2-9.6 16.8-6.8 19.6-10.4c0 6.9 5 3.5 7.5 6.6c3.2 4 4.4 11.1 8.2 12.5c-3.7-7.9 2.3-7.6-6.1-18.2c4.5 2.8 6.8 0 12.9 2.5c-5.3-8.4-13.6-6-13.6-6s5.2-4.8 9.6-2.3c-4.6-6.8-17.9 1.8-17.9 1.8s-5.5-9.4-17.3.5c6.9-2.8 14.5 0 14.5 0S15.9 10.9 11 27"
								/>
								<g fill="#64892f">
									<path d="M11 27s7.3-13.5 19.9-12.3C19.8 9.6 11 20.4 11 27z" />
									<path d="M13.9 14s9.2-6.9 17.3 0c-2.4-8.4-14.7-4.5-17.3 0m19.3.9c12.2 5.6 8.1 12 13.1 21c-3.4-7.5 5-21-13.1-21" />
									<path d="M28.4 14s2.8-4.2 3.8-9.4c.1-.7 3.1-.6 3 .1c-1 6.7 1.7 10.4 1.7 10.4s-2.1.7-4.7.7c-2.6.1-3.8-1.8-3.8-1.8" />
								</g>
								<ellipse
									cx="33.7"
									cy="4.6"
									fill="#8cc63e"
									rx="1.5"
									ry=".6"
								/>
							</svg>
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
}
interface RecipeIngredientsProps {
	ingredients: Ingredient[];
}
export const Ingredients = ({ ingredients }: RecipeIngredientsProps) => {
	return (
		<div css={ingredientsStyles}>
			<h2 css={sectionHeadingStyle}>Ingredients</h2>
			<ul>
				{ingredients.map((ingredient, index) => (
					<li key={`${index}-ingredient`}>{ingredient.text}</li>
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

	const onKeyDown = (event: KeyboardEvent) => {
		if (showReader) {
			if (event.key === 'ArrowRight') {
				handleNext();
			} else if (event.key === 'ArrowLeft') {
				handleBack();
			} else if (event.key === 'Escape') {
				handleCloseDialog();
			}
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', onKeyDown);
		if (showReader) {
			startSpeechRecognition();
		}
		return () => {
			window.removeEventListener('keydown', onKeyDown);
		};
	});

	if (!recipe || !steps?.length) {
		return null;
	}

	const ingredients = recipe?.ingredients_lists[0].ingredients;
	const handleNext = () => {
		const update = activeStep + 1;
		if (!isLastStep()) {
			setActiveStep(update);
		}
	};

	const handleBack = () => {
		const isFirst = isFirstStep();
		console.log('*** isFirst', isFirst);
		console.log('*** activeStep', activeStep);
		if (activeStep !== 0) {
			console.log('*** setting active step to', activeStep - 1);
			setActiveStep(activeStep - 1);
		}
	};

	const handleButtonClick = () => {
		setShowReader(true);
		startSpeechRecognition();
	};

	const handleCloseDialog = () => {
		setShowReader(false);
	};

	const startSpeechRecognition = () => {
		window.SpeechRecognition =
			window.SpeechRecognition || window.webkitSpeechRecognition;
		// Creating new instance
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		const recognition = new SpeechRecognition();
		recognition.lang = 'en-GB';
		recognition.continuous = true;

		recognition.onresult = (event: any) => {
			const transcript =
				event.results[
					event.results.length - 1
				][0].transcript.toLowerCase();

			if (transcript.includes('next')) {
				console.log('***IN TRANSCRIPT activeStep', activeStep);
				// This active step is always 0, the initial active step. Something about setting onresult
				//
				handleNext();
			} else if (
				transcript.includes('back') ||
				transcript.includes('last') ||
				transcript.includes('previous')
			) {
				console.log('*** going back');
				handleBack();
			} else if (
				transcript.includes('close') ||
				transcript.includes('exit') ||
				transcript.includes('finish')
			) {
				handleCloseDialog();
			} else if (transcript.includes('show')) {
				setShowIngredients(true);
			} else if (transcript.includes('hide')) {
				setShowIngredients(false);
			}
		};

		recognition.onerror = (event: any) => {
			console.error('Speech recognition error:', event);
		};

		// Start speech recognition
		recognition.start();
	};

	const isFirstStep = () => activeStep === 0;
	const isLastStep = () => activeStep === steps.length - 1;

	console.log('*** activeStep', activeStep);

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
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
						>
							<path
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-width="1.5"
								d="M10.334 4.78C9.914 3.151 8.668 1.977 7.214 2c-1.773.027-3.182 1.817-3.148 4l-.032 3.34c-.007.757-.01 1.135-.144 1.47c-.134.337-.43.659-1.02 1.301c-.58.63-.87 1.098-.87 1.634c0 .818.673 1.476 2.019 2.792l3.569 3.49C8.933 21.341 9.606 22 10.443 22c.836 0 1.509-.658 2.855-1.974l6.78-6.63a6.314 6.314 0 0 0 0-9.072c-2.562-2.505-6.716-2.505-9.278 0l-.466.455Zm0 0l-.962.94M10.8 17.584l-4.283-4.188"
							/>
						</svg>
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
							toggleShowIngredients={() =>
								setShowIngredients(!showIngredients)
							}
							showingIngredients={showIngredients}
						/>

						<ModalBody>
							{showIngredients && ingredients && (
								<Ingredients ingredients={ingredients} />
							)}
							<div css={methodStyles(showIngredients)}>
								{showIngredients && (
									<h2 css={sectionHeadingStyle}>
										Step {activeStep + 1} of {steps.length}
									</h2>
								)}
								<p>{steps[activeStep]}</p>
							</div>
						</ModalBody>

						<ModalFooter>
							{!isFirstStep() && (
								<Button
									onClick={handleBack}
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
									onClick={handleNext}
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
	z-index: 10;
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
`;

const methodStyles = (showIngredients: boolean) => css`
	width: ${showIngredients ? '60%' : '100%'};
	line-height: 20px;
`;

const sectionHeadingStyle = css`
	color: #052962;
	padding-bottom: 8px;
`;
