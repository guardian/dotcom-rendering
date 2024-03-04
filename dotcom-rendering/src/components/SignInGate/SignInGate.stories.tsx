import { Section } from '../Section';
import { SignInGateSelector } from '../SignInGateSelector.importable';
import { SignInGateCustomizableText } from './gateDesigns/SignInGateCustomizableText';
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

export const alternativeTextGuardianLive = () => {
	return (
		<Section fullWidth={true}>
			<SignInGateCustomizableText
				title="Register now and receive an exclusive Guardian Live discount"
				subtitle="It’s still free to read – this is not a paywall"
				body="Guardian Live brings you closer to the big stories, award-winning journalists, and leading thinkers through livestreamed and interactive events, no matter where you are in the world."
				guUrl="https://theguardian.com"
				signInUrl="https://profile.theguardian.com/signin"
				registerUrl="https://profile.theguardian.com/register"
				dismissGate={() => {}}
				ophanComponentId="test"
			/>
		</Section>
	);
};
alternativeTextGuardianLive.storyName = 'alternative_text_guardian_live';

export const alternativeTextSaturdayEdition = () => {
	return (
		<Section fullWidth={true}>
			<SignInGateCustomizableText
				title="Register now and receive an exclusive, weekly roundup from our editor-in-chief"
				subtitle="It’s still free to read – this is not a paywall"
				body="Register now and receive Saturday Edition – a new, weekly email highlighting the week’s best Guardian Journalism from our editor-in-chief, Katharine Viner."
				guUrl="https://theguardian.com"
				signInUrl="https://profile.theguardian.com/signin"
				registerUrl="https://profile.theguardian.com/register"
				dismissGate={() => {}}
				ophanComponentId="test"
			/>
		</Section>
	);
};
alternativeTextSaturdayEdition.storyName = 'alternative_text_saturday_edition';

export const alternativeTextPersonalise = () => {
	return (
		<Section fullWidth={true}>
			<SignInGateCustomizableText
				title="Register now and personalise your experience"
				subtitle="It’s still free to read – this is not a paywall"
				body="Register today to follow your favourite topics, writers and journalist series in My Guardian – a single destination that helps you get to the journalism you care about faster."
				guUrl="https://theguardian.com"
				signInUrl="https://profile.theguardian.com/signin"
				registerUrl="https://profile.theguardian.com/register"
				dismissGate={() => {}}
				ophanComponentId="test"
			/>
		</Section>
	);
};
alternativeTextPersonalise.storyName = 'alternative_text_personalise';

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
