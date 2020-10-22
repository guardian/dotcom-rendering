import React from 'react';
import { Section } from '@frontend/web/components/Section';
import { SignInGateSelector } from './SignInGateSelector';
import { SignInGateMain } from './gateDesigns/SignInGateMain';
import { SignInGatePersonalisedAdCopyVariant2 } from './gateDesigns/SignInGatePersonalisedAdCopyVariant2';

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

export const mainPersonalisedAdCopy = () => {
    return (
        <Section>
            <SignInGatePersonalisedAdCopyVariant2
                guUrl="https://theguardian.com"
                signInUrl="https://profile.theguardian.com/"
                dismissGate={() => {}}
                ophanComponentId="test"
            />
        </Section>
    );
};
mainPersonalisedAdCopy.story = { name: 'personalised_ad_copy_standalone' };
