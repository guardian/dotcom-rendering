import { Section } from '../Section';
import { SignInGateSelector } from '../SignInGateSelector.importable';
import { SignInGateFakeSocial } from './gateDesigns/SignInGateFakeSocial';
import { SignInGateMain } from './gateDesigns/SignInGateMain';

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

export const mainStandaloneComment = () => {
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
mainStandaloneComment.story = { name: 'main_standalone_comment' };

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

export const mainStandaloneMandatoryComment = () => {
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
mainStandaloneMandatoryComment.story = {
	name: 'main_standalone_mandatory_comment',
};

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
