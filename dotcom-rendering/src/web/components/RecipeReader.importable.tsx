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
	SvgDocument,
} from '@guardian/source-react-components';
import { useEffect, useState } from 'react';
import { recipeData } from './recipes_table_export';

declare const SpeechRecognition: any;

// ***** TO DO ******
// 3. Add the ingredients to the dialog
// 5. Add a button to start voice recognition instead of doing it on dialog open - more transparent

interface RecipeReaderProps {
	pageId: string;
}
interface ModalHeaderProps {
	title: string;
	onClose: () => void;
	toggleShowIngredients: () => void;
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
}: ModalHeaderProps) => {
	return (
		<div css={modalHeaderStyles}>
			<h2>{title}</h2>
			<div>
				<Button
					icon={
						<SvgDocument
							isAnnouncedByScreenReader={true}
							size="small"
						/>
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
		<div>
			<h2>Ingredients</h2>
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

	useEffect(() => {
		window.addEventListener('keydown', onKeyDown);
		return () => {
			window.removeEventListener('keydown', onKeyDown);
		};
	});

	if (!recipe || !steps?.length) {
		return null;
	}

	const ingredients = recipe?.ingredients_lists[0].ingredients;
	const handleNext = () => {
		if (!isLastStep()) {
			setActiveStep((prevStep) => prevStep + 1);
		}
	};

	const handleBack = () => {
		if (!isFirstStep()) {
			setActiveStep((prevStep) => prevStep - 1);
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
				handleNext();
			}
			if (
				transcript.includes('back') ||
				transcript.includes('last') ||
				transcript.includes('previous')
			) {
				handleBack();
			}
			if (
				transcript.includes('close') ||
				transcript.includes('exit') ||
				transcript.includes('finish')
			) {
				handleCloseDialog();
			}
			if (transcript.includes('show')) {
				setShowIngredients(true);
			}
			if (transcript.includes('hide')) {
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
							title={`Step ${activeStep + 1} of ${steps.length}`}
							onClose={handleCloseDialog}
							toggleShowIngredients={() =>
								setShowIngredients(!showIngredients)
							}
						/>

						<ModalBody>
							{showIngredients && ingredients && (
								<div style={{ maxWidth: '40%' }}>
									<Ingredients ingredients={ingredients} />
								</div>
							)}
							<p>{steps[activeStep]}</p>
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
	min-height: 40vh;
	width: 50vw;
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
