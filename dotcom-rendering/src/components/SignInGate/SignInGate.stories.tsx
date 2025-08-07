import { type EditionId } from '../../lib/edition';
import type { TagType } from '../../types/tag';
import { Section } from '../Section';
import { SignInGateSelector } from '../SignInGateSelector.importable';
import { SignInGateAuxiaV2 } from './gateDesigns/SignInGateAuxiaV2';
import { SignInGateCustomizableText } from './gateDesigns/SignInGateCustomizableText';
import { SignInGateFakeSocial } from './gateDesigns/SignInGateFakeSocial';
import { SignInGateMain } from './gateDesigns/SignInGateMain';
import { SignInGateMainCheckoutComplete } from './gateDesigns/SignInGateMainCheckoutComplete';
import type {
	AuxiaAPIResponseDataUserTreatment,
	CheckoutCompleteCookieData,
} from './types';
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
	const tags: TagType[] = [
		{ id: 'politics/politics', type: 'Keyword', title: 'Politics' },
		{ id: 'world/europe-news', type: 'Keyword', title: 'Europe News' },
	];

	return (
		<Section fullWidth={true}>
			<SignInGateSelector
				contentType="Article"
				sectionId="dismissable"
				tags={tags}
				isPaidContent={false}
				isPreview={false}
				pageId="dismissable"
				host="https://www.theguardian.com"
				idUrl="https://profile.theguardian.com"
				contributionsServiceUrl="https://contributions.guardianapis.com"
				editionId={'UK' as EditionId}
			/>
		</Section>
	);
};

signInGateSelectorStoryDismissable.storyName =
	'sign_in_gate_selector_dismissable';

export const signInGateSelectorStoryNonDismissable = () => {
	const tags: TagType[] = [
		{ id: 'politics/politics', type: 'Keyword', title: 'Politics' },
		{ id: 'world/europe-news', type: 'Keyword', title: 'Europe News' },
	];

	return (
		<Section fullWidth={true}>
			<SignInGateSelector
				contentType="Article"
				sectionId="non-dismissable"
				tags={tags}
				isPaidContent={false}
				isPreview={false}
				pageId="non-dismissable"
				host="https://www.theguardian.com"
				idUrl="https://profile.theguardian.com"
				contributionsServiceUrl="https://contributions.guardianapis.com"
				editionId={'UK' as EditionId}
			/>
		</Section>
	);
};

signInGateSelectorStoryNonDismissable.storyName =
	'sign_in_gate_selector_non_dismissable';

export const signInGateSelectorStoryLegacy = () => {
	const tags: TagType[] = [
		{ id: 'politics/politics', type: 'Keyword', title: 'Politics' },
		{ id: 'world/europe-news', type: 'Keyword', title: 'Europe News' },
	];

	return (
		<Section fullWidth={true}>
			<SignInGateSelector
				contentType="Article"
				sectionId="legacy"
				tags={tags}
				isPaidContent={false}
				isPreview={false}
				pageId="legacy"
				host="https://www.theguardian.com"
				idUrl="https://profile.theguardian.com"
				contributionsServiceUrl="https://contributions.guardianapis.com"
				editionId={'UK' as EditionId}
			/>
		</Section>
	);
};

signInGateSelectorStoryLegacy.storyName = 'sign_in_gate_selector_legacy';

export const signInGateSelectorStoryNoTreatment = () => {
	const tags: TagType[] = [
		{ id: 'politics/politics', type: 'Keyword', title: 'Politics' },
		{ id: 'world/europe-news', type: 'Keyword', title: 'Europe News' },
	];

	return (
		<Section fullWidth={true}>
			<SignInGateSelector
				contentType="Article"
				sectionId="no-treatment"
				tags={tags}
				isPaidContent={false}
				isPreview={false}
				pageId="no-treatment"
				host="https://www.theguardian.com"
				idUrl="https://profile.theguardian.com"
				contributionsServiceUrl="https://contributions.guardianapis.com"
				editionId={'UK' as EditionId}
			/>
		</Section>
	);
};

signInGateSelectorStoryNoTreatment.storyName =
	'sign_in_gate_selector_no_treatment';

export const auxiaV2DismissibleModal = () => {
	const mockUserTreatment: AuxiaAPIResponseDataUserTreatment = {
		treatmentId: 'test-treatment-id',
		treatmentTrackingId: 'test-tracking-id',
		surface: 'test-surface',
		treatmentContent: JSON.stringify({
			title: 'A small step for great Journalism. Sign in.',
			subtitle: "It's free and only takes 30 seconds.",
			body: '',
			first_cta_name: 'Create account',
			first_cta_link: 'https://profile.theguardian.com/register',
			second_cta_name: 'Not now',
		}),
		rank: '1',
		contentLanguageCode: 'en',
		treatmentType: 'test-type',
	};

	return (
		<Section fullWidth={true}>
			<SignInGateAuxiaV2
				signInUrl="https://profile.theguardian.com/signin"
				dismissGate={() => console.log('Gate dismissed')}
				abTest={{
					name: 'AuxiaSignInGate',
					variant: 'test-variant',
					id: 'test-id',
				}}
				ophanComponentId="test-component-id"
				userTreatment={mockUserTreatment}
				logTreatmentInteractionCall={async (
					interactionType,
					actionName,
				) => {
					console.log(
						'Treatment interaction:',
						interactionType,
						actionName,
					);
				}}
				guUrl="https://www.theguardian.com/"
			/>
		</Section>
	);
};

auxiaV2DismissibleModal.storyName = 'sign_in_gate_auxia_v2_modal_dismissible';

export const auxiaV2NonDismissibleModal = () => {
	const mockUserTreatment: AuxiaAPIResponseDataUserTreatment = {
		treatmentId: 'test-treatment-id',
		treatmentTrackingId: 'test-tracking-id',
		surface: 'test-surface',
		treatmentContent: JSON.stringify({
			title: 'Sorry for the interruption. We believe in free, independent journalism for all. Sign in or register to keep reading.',
			subtitle:
				"Once you are signed in, we'll bring you back here shortly.",
			body: '',
			first_cta_name: 'Create account',
			first_cta_link: 'https://profile.theguardian.com/register',
			second_cta_name: '',
		}),
		rank: '1',
		contentLanguageCode: 'en',
		treatmentType: 'test-type',
	};

	return (
		<Section fullWidth={true}>
			<SignInGateAuxiaV2
				signInUrl="https://profile.theguardian.com/signin"
				dismissGate={() => console.log('Gate dismissed')}
				abTest={{
					name: 'AuxiaSignInGate',
					variant: 'test-variant',
					id: 'test-id',
				}}
				ophanComponentId="test-component-id"
				userTreatment={mockUserTreatment}
				logTreatmentInteractionCall={async (
					interactionType,
					actionName,
				) => {
					console.log(
						'Treatment interaction:',
						interactionType,
						actionName,
					);
				}}
				guUrl="https://www.theguardian.com/"
			/>
		</Section>
	);
};

auxiaV2NonDismissibleModal.storyName =
	'sign_in_gate_auxia_v2_modal_non_dismissible';
