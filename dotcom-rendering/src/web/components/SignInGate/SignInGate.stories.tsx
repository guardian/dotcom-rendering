import { Section } from '../Section';
import { SignInGateSelector } from '../SignInGateSelector.importable';
import { SignInGateFakeSocial } from './gateDesigns/SignInGateFakeSocial';
import { SignInGateMain } from './gateDesigns/SignInGateMain';
import { SignInGateMainCheckoutComplete } from './gateDesigns/SignInGateMainCheckoutComplete';
import type { CheckoutCompleteCookieData } from './types';

export default {
	component: SignInGateSelector,
	title: 'Components/SignInGate',
	parameters: {
		chromatic: { diffThreshold: 0.2 },
	},
};

export const mainStandalone = () => {
	return (
		<Section fullWidth={true}>
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

export const mainStandaloneMandatory = () => {
	return (
		<Section fullWidth={true}>
			<SignInGateMain
				guUrl="https://theguardian.com"
				signInUrl="https://profile.theguardian.com/"
				dismissGate={() => {}}
				ophanComponentId="test"
				isMandatory={true}
			/>
		</Section>
	);
};
mainStandaloneMandatory.story = { name: 'main_standalone_mandatory' };

export const fakeSocialStandalone = () => {
	return (
		<Section fullWidth={true}>
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
		<Section fullWidth={true}>
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

export function signInGateMainCheckoutCompletePersonalisedCopy(
	args: CheckoutCompleteCookieData,
) {
	return (
		<Section fullWidth={true}>
			<SignInGateMainCheckoutComplete
				guUrl="https://theguardian.com"
				signInUrl="https://profile.theguardian.com/signin?" // this is personalised
				dismissGate={() => {}}
				ophanComponentId="test"
				checkoutCompleteCookieData={args}
			/>
		</Section>
	);
}
signInGateMainCheckoutCompletePersonalisedCopy.story = {
	name: 'main_checkout_complete_personalised',
};

signInGateMainCheckoutCompletePersonalisedCopy.args = {
	newAndDigital: {
		userType: 'new',
		product: 'DigitalPack',
	} as CheckoutCompleteCookieData,
	newAndPrint: {
		userType: 'new',
		product: 'Paper',
	} as CheckoutCompleteCookieData,
	newAndContributor: {
		userType: 'new',
		product: 'Contribution',
	} as CheckoutCompleteCookieData,
	existingAndDigital: {
		userType: 'current',
		product: 'DigitalPack',
	} as CheckoutCompleteCookieData,
	existingAndPrint: {
		userType: 'current',
		product: 'Paper',
	} as CheckoutCompleteCookieData,
	existingAndContributor: {
		userType: 'current',
		product: 'Contribution',
	} as CheckoutCompleteCookieData,
};
