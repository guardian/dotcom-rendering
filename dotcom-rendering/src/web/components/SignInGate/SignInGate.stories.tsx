import { ElementContainer } from '@frontend/web/components/ElementContainer';
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
		<ElementContainer>
			<SignInGateMain
				guUrl="https://theguardian.com"
				signInUrl="https://profile.theguardian.com/"
				dismissGate={() => {}}
				ophanComponentId="test"
			/>
		</ElementContainer>
	);
};
mainStandalone.story = { name: 'main_standalone' };

export const mainStandaloneComment = () => {
	return (
		<ElementContainer>
			<SignInGateMain
				guUrl="https://theguardian.com"
				signInUrl="https://profile.theguardian.com/"
				dismissGate={() => {}}
				ophanComponentId="test"
				isComment={true}
			/>
		</ElementContainer>
	);
};
mainStandaloneComment.story = { name: 'main_standalone_comment' };

export const mainStandaloneMandatory = () => {
	return (
		<ElementContainer>
			<SignInGateMain
				guUrl="https://theguardian.com"
				signInUrl="https://profile.theguardian.com/"
				dismissGate={() => {}}
				ophanComponentId="test"
				isMandatory={true}
			/>
		</ElementContainer>
	);
};
mainStandaloneMandatory.story = { name: 'main_standalone_mandatory' };

export const mainStandaloneMandatoryComment = () => {
	return (
		<ElementContainer>
			<SignInGateMain
				guUrl="https://theguardian.com"
				signInUrl="https://profile.theguardian.com/"
				dismissGate={() => {}}
				ophanComponentId="test"
				isMandatory={true}
				isComment={true}
			/>
		</ElementContainer>
	);
};
mainStandaloneMandatoryComment.story = {
	name: 'main_standalone_mandatory_comment',
};

export const fakeSocialStandalone = () => {
	return (
		<ElementContainer>
			<SignInGateFakeSocial
				guUrl="https://theguardian.com"
				signInUrl="https://profile.theguardian.com/"
				dismissGate={() => {}}
				ophanComponentId="test"
			/>
		</ElementContainer>
	);
};
fakeSocialStandalone.story = { name: 'fake_social_standalone' };

export const fakeSocialStandaloneVertical = () => {
	return (
		<ElementContainer>
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
		</ElementContainer>
	);
};
fakeSocialStandaloneVertical.story = {
	name: 'fake_social_standalone_vertical',
};
