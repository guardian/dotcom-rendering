/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// import { css } from '@emotion/react';
import { Button } from '@guardian/source-react-components';
import { useState } from 'react';

declare const SpeechRecognition: any;

// ***** TO DO ******
// 1. Use the json from scraped recipe rather than hardcoded steps
// 2. Add a button to close the dialog
// 3. Add the ingredients to the dialog
// 4. Improve CSS  - should be same size model, buttons should be better, branding etc
// 5. Add a button to start voice recognition instead of doing it on dialog open - more transparent

const steps = [
	'Quarter each cabbage into four fat wedges, keeping the core intact to keep it together on the grill.',
	'In a large bowl, drizzle the cabbages with enough olive oil to lightly coat, season generously, and gently toss to combine.',
	'Prepare a charcoal grill or barbecue for two-zone cooking and build a medium-high flame, or heat a gas grill to high.',
	'Carefully wipe the heated grates with a lightly oiled paper towel.',
	'Using a grill brush, scrape the grill grates clean, then carefully wipe with a lightly oiled towel again.',
	'Grill the cabbage wedges over a direct heat until charred on all sides – four to six minutes.',
	'Transfer to a cooler portion of the grill and cook until the interior has softened but still has a bit of crunch – five to six minutes more.',
	'Use a paring knife to test doneness.',
	'When cooked, transfer to a plate and leave to cool while you make the dressing.',
	'In a bowl, whisk together the vinegar, dijon, honey, a half-teaspoon of salt and plenty of pepper.',
	'Whisk in 150ml olive oil until the mixture has emulsified, then stir in the blue cheese.',
	'Drizzle the dressing over the cabbage wedges and top with the cherry tomatoes, bacon, radishes and chives.',
];

export const RecipeReader = () => {
	const [showReader, setShowReader] = useState(false);
	const [activeStep, setActiveStep] = useState(0);

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
		window.SpeechRecognition =
			window.SpeechRecognition || window.webkitSpeechRecognition;
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

			// Check if the keyword 'next' is detected
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
