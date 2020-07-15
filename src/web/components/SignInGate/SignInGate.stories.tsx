import React from 'react';
import { Section } from '@frontend/web/components/Section';
import { SignInGateSelector } from './SignInGateSelector';
import { SignInGateVii } from './gateDesigns/SignInGateVii';

export default {
    component: SignInGateSelector,
    title: 'Components/SignInGate',
    parameters: {
        chromatic: { diffThreshold: 0.2 },
    },
};

export const standalone = () => {
    // fetchMock
    //     .restore()
    //     .getOnce('https://vendorlist.consensu.org/vendorlist.json', {
    //         status: 200,
    //         body: iabVendorList,
    //     });

    return (
        <Section>
            <SignInGateVii
                guUrl="https://theguardian.com/"
                signInUrl="https://profile.theguardian.com/"
                dismissGate={() => {}}
                component="test"
            />
        </Section>
    );
};
standalone.story = { name: 'standalone' };
