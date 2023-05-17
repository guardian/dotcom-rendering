/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// import { css } from '@emotion/react';
import { Button, SvgCross } from '@guardian/source-react-components';
import { useState } from 'react';
import { recipeData } from './recipes_table_export';

declare const SpeechRecognition: any;

// ***** TO DO ******
// 1. Use the json from scraped recipe rather than hardcoded steps
// 2. Add a button to close the dialog
// 3. Add the ingredients to the dialog
// 4. Improve CSS  - should be same size model, buttons should be better, branding etc
// 5. Add a button to start voice recognition instead of doing it on dialog open - more transparent
// 6. Use a feature specific flag (or no flag because this is a hack)
// 7. Add a model overlay

interface RecipeReaderProps {
	pageId: string;
}

const findValidRecipe = (pageId: string) => {
	const data = recipeData as any;
	return data?.Items.find((item: any) => item.path === pageId);
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

	return (
		<div>
			<Button onClick={handleButtonClick}>Open recipe reader</Button>

			{showReader && (
				<div>
					{/* <div className="overlay" onClick={handleCloseDialog}></div> */}
					<div className="dialog">
						<div style={{ padding: '16px' }}>
							<div
								style={{
									display: 'flex',
									justifyContent: 'right',
								}}
							>
								<Button
									icon={<SvgCross />}
									hideLabel={true}
									iconSide="left"
									priority="tertiary"
									size="small"
									onClick={handleCloseDialog}
								/>
							</div>
							<h2>
								Step {activeStep + 1} of {steps.length}
							</h2>
							<p>{steps[activeStep]}</p>

							<div style={{ marginTop: '16px' }}>
								{activeStep !== 0 && (
									<Button
										onClick={handleBack}
										priority="secondary"
									>
										Back
									</Button>
								)}
								{activeStep !== steps.length - 1 && (
									<Button
										// disabled={activeStep === steps.length - 1}
										onClick={handleNext}
										style={{ marginLeft: '8px' }}
										priority="secondary"
									>
										Next
									</Button>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
