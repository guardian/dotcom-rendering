import React from 'react';
import { Section } from '@frontend/web/components/Section';
import { SignInGateCopy } from '@root/src/web/components/SignInGate/gateDesigns/types';
import { SignInGateSelector } from './SignInGateSelector';
import { SignInGateMain } from './gateDesigns/SignInGateMain';
import { SignInGateCopyOptVar } from './gateDesigns/copy-opt-test/SignInGateCopyOptVar';

export default {
	component: SignInGateSelector,
	title: 'Components/SignInGate',
	parameters: {
		chromatic: { diffThreshold: 0.2 },
	},
};

export const mainStandalone = () => {
	return (
		<Section>
			<SignInGateMain
				guUrl="https://theguardian.com"
				signInUrl="https://profile.theguardian.com/"
				dismissGate={() => {}}
				ophanComponentId="test"
			/>
		</Section>
	);
};
mainStandalone.story = { name: 'main_standalone' };

const CopyOptExampleText: SignInGateCopy = {
	header: 'Register to keep reading',
	subHeader: 'It’s free to do, and it only takes a minute',
	paragraphs: [
		'When you register and share your preferences, you’re allowing us to better understand you, ' +
			'and this will help you to get the most out of The Guardian.',
		'You’ll always be able to control your own privacy settings and every article will remain free.',
	],
};

export const copyOptStandalone = () => {
	return (
		<Section>
			<SignInGateCopyOptVar
				guUrl="https://theguardian.com"
				signInUrl="https://profile.theguardian.com/"
				dismissGate={() => {}}
				ophanComponentId="test"
				signInGateCopy={CopyOptExampleText}
			/>
		</Section>
	);
};
copyOptStandalone.story = { name: 'copy-var_standalone' };
