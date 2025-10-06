import {
	mockAuxiaResponseDismissible,
	mockAuxiaResponseLegacy,
	mockAuxiaResponseNonDismissible,
} from '../../../fixtures/manual/sign-in-gate';
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
				body="Register now and receive a discount for Guardian Live. Guardian Live brings you closer to the big stories, award-winning journalists, and leading thinkers through livestreamed and interactive events, no matter where you are in the world."
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

export const signInGateSelectorStoryDismissable = () => {
	return (
		<Section fullWidth={true}>
			<SignInGateSelector
				isPaidContent={false}
				isPreview={false}
				pageId="dismissable"
				host="https://www.theguardian.com"
				idUrl="https://profile.theguardian.com"
				contributionsServiceUrl="https://contributions.guardianapis.com"
				auxiaGateDisplayData={{
					browserId: 'test-browser-id',
					auxiaData: {
						responseId: 'test-response-id',
						userTreatment:
							mockAuxiaResponseDismissible.data.userTreatment,
					},
				}}
			/>
		</Section>
	);
};

signInGateSelectorStoryDismissable.storyName =
	'sign_in_gate_selector_dismissable';

export const signInGateSelectorStoryNonDismissable = () => {
	return (
		<Section fullWidth={true}>
			<SignInGateSelector
				isPaidContent={false}
				isPreview={false}
				pageId="non-dismissable"
				host="https://www.theguardian.com"
				idUrl="https://profile.theguardian.com"
				contributionsServiceUrl="https://contributions.guardianapis.com"
				auxiaGateDisplayData={{
					browserId: 'test-browser-id',
					auxiaData: {
						responseId: 'test-response-id',
						userTreatment:
							mockAuxiaResponseNonDismissible.data.userTreatment,
					},
				}}
			/>
		</Section>
	);
};

signInGateSelectorStoryNonDismissable.storyName =
	'sign_in_gate_selector_non_dismissable';

export const signInGateSelectorStoryLegacy = () => {
	return (
		<Section fullWidth={true}>
			<SignInGateSelector
				isPaidContent={false}
				isPreview={false}
				pageId="legacy"
				host="https://www.theguardian.com"
				idUrl="https://profile.theguardian.com"
				contributionsServiceUrl="https://contributions.guardianapis.com"
				auxiaGateDisplayData={{
					browserId: 'test-browser-id',
					auxiaData: {
						responseId: 'test-response-id',
						userTreatment:
							mockAuxiaResponseLegacy.data.userTreatment,
					},
				}}
			/>
		</Section>
	);
};

signInGateSelectorStoryLegacy.storyName = 'sign_in_gate_selector_legacy';

export const signInGateSelectorStoryNoTreatment = () => {
	return (
		<Section fullWidth={true}>
			<SignInGateSelector
				isPaidContent={false}
				isPreview={false}
				pageId="no-treatment"
				host="https://www.theguardian.com"
				idUrl="https://profile.theguardian.com"
				contributionsServiceUrl="https://contributions.guardianapis.com"
				auxiaGateDisplayData={{
					browserId: 'test-browser-id',
					auxiaData: {
						responseId: 'test-response-id',
						userTreatment: undefined,
					},
				}}
			/>
		</Section>
	);
};

signInGateSelectorStoryNoTreatment.storyName =
	'sign_in_gate_selector_no_treatment';

export const auxiaV2DismissibleModal = () => {
	return (
		<Section fullWidth={true}>
			<SignInGateSelector
				isPaidContent={false}
				isPreview={false}
				pageId="dismissable-v2"
				host="https://www.theguardian.com"
				idUrl="https://profile.theguardian.com"
				contributionsServiceUrl="https://contributions.guardianapis.com"
				auxiaGateDisplayData={{
					browserId: 'test-browser-id',
					auxiaData: {
						responseId: 'test-response-id',
						userTreatment: {
							...mockAuxiaResponseDismissible.data.userTreatment,
							treatmentType: 'DISMISSABLE_SIGN_IN_GATE_POPUP',
						},
					},
				}}
			/>
		</Section>
	);
};

auxiaV2DismissibleModal.storyName = 'sign_in_gate_auxia_v2_modal_dismissible';

export const auxiaV2NonDismissibleModal = () => {
	return (
		<Section fullWidth={true}>
			<SignInGateSelector
				isPaidContent={false}
				isPreview={false}
				pageId="non-dismissable-v2"
				host="https://www.theguardian.com"
				idUrl="https://profile.theguardian.com"
				contributionsServiceUrl="https://contributions.guardianapis.com"
				auxiaGateDisplayData={{
					browserId: 'test-browser-id',
					auxiaData: {
						responseId: 'test-response-id',
						userTreatment: {
							...mockAuxiaResponseNonDismissible.data
								.userTreatment,
							treatmentType: 'NONDISMISSIBLE_SIGN_IN_GATE_POPUP',
						},
					},
				}}
			/>
		</Section>
	);
};

auxiaV2NonDismissibleModal.storyName =
	'sign_in_gate_auxia_v2_modal_non_dismissible';
