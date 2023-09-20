import { Section } from '../Section';
import { SignInGateSelector } from '../SignInGateSelector.importable';
import { SignInGateCopyTestRepeatSept2023 } from './gateDesigns/SignInGateCopyTestRepeatSept2023';
import { SignInGateFakeSocial } from './gateDesigns/SignInGateFakeSocial';
import { SignInGateMain } from './gateDesigns/SignInGateMain';
import { SignInGateMainCheckoutComplete } from './gateDesigns/SignInGateMainCheckoutComplete';
import type { CheckoutCompleteCookieData } from './types';
import { ALL_PRODUCTS, ALL_USER_TYPES } from './types';

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
				signInUrl="https://profile.theguardian.com/signin"
				registerUrl="https://profile.theguardian.com/register"
				dismissGate={() => {}}
				ophanComponentId="test"
			/>
		</Section>
	);
};
mainStandalone.storyName = 'main_standalone';

export const mainStandaloneMandatory = () => {
	return (
		<Section fullWidth={true}>
			<SignInGateMain
				guUrl="https://theguardian.com"
				signInUrl="https://profile.theguardian.com/signin"
				registerUrl="https://profile.theguardian.com/register"
				dismissGate={() => {}}
				ophanComponentId="test"
				isMandatory={true}
			/>
		</Section>
	);
};
mainStandaloneMandatory.storyName = 'main_standalone_mandatory';

export const fakeSocialStandalone = () => {
	return (
		<Section fullWidth={true}>
			<SignInGateFakeSocial
				guUrl="https://theguardian.com"
				signInUrl="https://profile.theguardian.com/signin"
				registerUrl="https://profile.theguardian.com/register"
				dismissGate={() => {}}
				ophanComponentId="test"
			/>
		</Section>
	);
};
fakeSocialStandalone.storyName = 'fake_social_standalone';

export const fakeSocialStandaloneVertical = () => {
	return (
		<Section fullWidth={true}>
			<SignInGateFakeSocial
				guUrl="https://theguardian.com"
				signInUrl="https://profile.theguardian.com/signin"
				registerUrl="https://profile.theguardian.com/register"
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
fakeSocialStandaloneVertical.storyName = 'fake_social_standalone_vertical';

export const signInGateCopyTest = () => {
	return (
		<Section fullWidth={true}>
			<SignInGateCopyTestRepeatSept2023
				guUrl="https://theguardian.com"
				signInUrl="https://profile.theguardian.com/signin"
				registerUrl="https://profile.theguardian.com/register"
				dismissGate={() => {}}
				ophanComponentId="test"
				abTest={{
					id: 'sign-in-gate-copy-test-jan-2023',
					name: 'sign-in-gate-copy-test-jan-2023',
					variant: 'quick-and-easy',
				}}
			/>
		</Section>
	);
};
signInGateCopyTest.storyName = 'sign_in_gate_copy_test';

export const signInGateMainCheckoutCompletePersonalisedCopy = (
	args: CheckoutCompleteCookieData,
) => {
	return (
		<Section fullWidth={true}>
			<SignInGateMainCheckoutComplete
				guUrl="https://theguardian.com"
				signInUrl="https://profile.theguardian.com/signin"
				registerUrl="https://profile.theguardian.com/register"
				dismissGate={() => {}}
				ophanComponentId="test"
				checkoutCompleteCookieData={args}
				personaliseSignInGateAfterCheckoutSwitch={true}
			/>
		</Section>
	);
};
signInGateMainCheckoutCompletePersonalisedCopy.storyName =
	'main_checkout_complete_personalised';

const defaultCheckoutCompleteCookieData: CheckoutCompleteCookieData = {
	userType: 'new',
	product: 'SupporterPlus',
};

signInGateMainCheckoutCompletePersonalisedCopy.args =
	defaultCheckoutCompleteCookieData;

signInGateMainCheckoutCompletePersonalisedCopy.argTypes = {
	userType: {
		options: ALL_USER_TYPES,
		control: { type: 'radio' },
	},
	product: {
		options: ALL_PRODUCTS,
		control: { type: 'radio' },
	},
};
