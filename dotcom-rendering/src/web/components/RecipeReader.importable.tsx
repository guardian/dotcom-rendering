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
}
interface ModalBodyProps {
	children: React.ReactNode;
}

const findValidRecipe = (pageId: string) => {
	const data = recipeData as any;
	return data?.Items.find((item: any) => item.path === pageId);
};

const ModalHeader = ({ title, onClose }: ModalHeaderProps) => {
	return (
		<div css={modalHeaderStyles}>
			<h2>{title}</h2>

			<Button
				icon={<SvgCross />}
				hideLabel={true}
				priority="subdued"
				size="small"
				onClick={() => onClose()}
				css={{ color: '#fff' }}
			/>
		</div>
	);
};

const ModalBody = ({ children }: ModalBodyProps) => {
	return <div css={modalBodyStyles}>{children}</div>;
};

const ModalFooter = ({ children }: ModalBodyProps) => {
	return <div css={modalFooterStyles}>{children}</div>;
};
export const RecipeReader = ({ pageId }: RecipeReaderProps) => {
	const [showReader, setShowReader] = useState(false);
	const [activeStep, setActiveStep] = useState(0);
	const recipe = findValidRecipe(`/${pageId}`);
	const steps = recipe?.steps;

	const handleNext = () => {
		setActiveStep((prevStep) => prevStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevStep) => prevStep - 1);
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
		};

		recognition.onerror = (event: any) => {
			console.error('Speech recognition error:', event);
		};

		// Start speech recognition
		recognition.start();
	};

	const onKeyDown = (event: KeyboardEvent) => {
		if (showReader) {
			if (event.key === 'ArrowRight') {
				setActiveStep(activeStep + 1);
			} else if (event.key === 'ArrowLeft') {
				setActiveStep(activeStep - 1);
			} else if (event.key === 'Escape') {
				handleCloseDialog();
			}
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', onKeyDown);
		return () => {
			window.removeEventListener('keydown', onKeyDown);
		};
	});

	return (
		<div css={containerStyles}>
			<Button onClick={handleButtonClick}>Open recipe reader</Button>

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
						/>

						<ModalBody>
							<p>{steps[activeStep]}</p>
						</ModalBody>

						<ModalFooter>
							{activeStep !== 0 && (
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
							{activeStep !== steps.length - 1 && (
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
	background-color: rgba(0, 0, 0, 0.6);
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
