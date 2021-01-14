import React from 'react';
import { Section } from '@frontend/web/components/Section';
import { SignInGateSelector } from './SignInGateSelector';
import { SignInGateMain } from './gateDesigns/SignInGateMain';
import { SignInGateDesignOptVar1 } from './gateDesigns/design-opt-test/SignInGateDesignOptVar1';
import { SignInGateDesignOptVar2 } from './gateDesigns/design-opt-test/SignInGateDesignOptVar2';
import { SignInGateDesignOptVar3 } from './gateDesigns/design-opt-test/SignInGateDesignOptVar3';
import { SignInGateDesignOptVar4 } from './gateDesigns/design-opt-test/SignInGateDesignOptVar4';
import { SignInGateDesignOptVar5 } from './gateDesigns/design-opt-test/SignInGateDesignOptVar5';
import { SignInGateDesignOptVar6 } from './gateDesigns/design-opt-test/SignInGateDesignOptVar6';

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

export const designVar1Standalone = () => {
    return (
        <Section>
            <SignInGateDesignOptVar1
                guUrl="https://theguardian.com"
                signInUrl="https://profile.theguardian.com/"
                dismissGate={() => {}}
                ophanComponentId="test"
            />
        </Section>
    );
};
designVar1Standalone.story = { name: 'design-var1_standalone' };

export const designVar2Standalone = () => {
    return (
        <Section>
            <SignInGateDesignOptVar2
                guUrl="https://theguardian.com"
                signInUrl="https://profile.theguardian.com/"
                dismissGate={() => {}}
                ophanComponentId="test"
            />
        </Section>
    );
};
designVar2Standalone.story = { name: 'design-var2_standalone' };

export const designVar3Standalone = () => {
    return (
        <Section>
            <SignInGateDesignOptVar3
                guUrl="https://theguardian.com"
                signInUrl="https://profile.theguardian.com/"
                dismissGate={() => {}}
                ophanComponentId="test"
            />
        </Section>
    );
};
designVar3Standalone.story = { name: 'design-var3_standalone' };

export const designVar4Standalone = () => {
    return (
        <Section>
            <SignInGateDesignOptVar4
                guUrl="https://theguardian.com"
                signInUrl="https://profile.theguardian.com/"
                dismissGate={() => {}}
                ophanComponentId="test"
            />
        </Section>
    );
};
designVar4Standalone.story = { name: 'design-var4_standalone' };

export const designVar5Standalone = () => {
    return (
        <Section>
            <SignInGateDesignOptVar5
                guUrl="https://theguardian.com"
                signInUrl="https://profile.theguardian.com/"
                dismissGate={() => {}}
                ophanComponentId="test"
            />
        </Section>
    );
};
designVar5Standalone.story = { name: 'design-var5_standalone' };

export const designVar6Standalone = () => {
    return (
        <Section>
            <SignInGateDesignOptVar6
                guUrl="https://theguardian.com"
                signInUrl="https://profile.theguardian.com/"
                dismissGate={() => {}}
                ophanComponentId="test"
            />
        </Section>
    );
};
designVar6Standalone.story = { name: 'design-var6_standalone' };
