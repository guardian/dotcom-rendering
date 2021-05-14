import React from 'react';
import { Section } from '@frontend/web/components/Section';
import { SignInGateSelector } from './SignInGateSelector';
import { SignInGateMain } from './gateDesigns/SignInGateMain';
import { SignInGateFakeSocial } from './gateDesigns/SignInGateFakeSocial';

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

export const fakeSocialStandalone = () => {
	return (
		<Section>
			<SignInGateFakeSocial
				guUrl="https://theguardian.com"
				signInUrl="https://profile.theguardian.com/"
				dismissGate={() => {}}
				ophanComponentId="test"
			/>
		</Section>
	);
};
fakeSocialStandalone.story = { name: 'fake_social_standalone' };

export const fakeSocialStandaloneVertical = () => {
	return (
		<Section>
			<SignInGateFakeSocial
				guUrl="https://theguardian.com"
				signInUrl="https://profile.theguardian.com/"
				dismissGate={() => {}}
				ophanComponentId="test"
				abTest={{
					id: 'fake-social-test',
					name: 'fake-social-test',
					variant: 'fake-social-variant-vertical',
				}}
			/>
		</Section>
	);
};
fakeSocialStandaloneVertical.story = {
	name: 'fake_social_standalone_vertical',
};
