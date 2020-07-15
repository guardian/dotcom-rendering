import React, { useState } from 'react';
// import { useAB } from '@guardian/ab-react';
// import { ABTest } from '@guardian/ab-core';
// import { Runnable } from '@guardian/ab-core/dist/types';
import {
    setUserDismissedGate,
    hasUserDismissedGate,
} from '@frontend/web/components/SignInGate/dismissGate';
import {
    SignInGateComponent,
    CurrentABTest,
} from '@frontend/web/components/SignInGate/gateDesigns/types';

// Sign in Gate A/B Tests
// import { signInGatePatientia } from ''@frontend/web/experiments/tests/sign-in-gate-patientia';
// import { signInGateVii } from '@frontend/web/experiments/tests/sign-in-gate-vii';
import { signInGateCentesimus } from '@frontend/web/experiments/tests/sign-in-gate-centesimus';

// Sign in Gate Types
import { signInGateComponentCentesimusControl2 } from '@frontend/web/components/SignInGate/gates/centesimus-control-2';

// component name, should always be sign-in-gate
export const componentName = 'sign-in-gate';

interface SignInGateSelectorProps {
    isSignedIn?: boolean;
    CAPI: CAPIBrowserType;
}

const dismissGate = (
    setShowGate: React.Dispatch<React.SetStateAction<boolean>>,
    currentAbTestValue: CurrentABTest,
) => {
    setShowGate(false);
    setUserDismissedGate(currentAbTestValue.variant, currentAbTestValue.name);

    // When the user closes the sign in gate, we scroll them back to the main content
    const articleBody =
        document.querySelector('.js-article__body') ||
        document.querySelector('.article-body-commercial-selector');

    articleBody?.parentElement?.scrollIntoView(true);

    // mediator emit ??
};

// TODO: viewing criteria
// TODO: url handling including encoding the tracking params!

type GateTestMap = { [name: string]: SignInGateComponent };

/* When adding a new test, you need to add the test name to the tests array below,
   and add a entry for each variant that maps it to a SignInGateComponent in testVariantToGateMapping
   */

// This should be added when the ab test framework is setup

// const tests: ReadonlyArray<ABTest> = [
//     signInGatePatientia,
//     signInGateCentesimus,
//     signInGateVii,
// ];

const testVariantToGateMapping: GateTestMap = {
    'patientia-control-1': signInGateComponentCentesimusControl2,
    'patientia-variant-1': signInGateComponentCentesimusControl2,
    'centesimus-control-2': signInGateComponentCentesimusControl2,
    'vii-variant': signInGateComponentCentesimusControl2,
};

/*
signInGateFilter takes:
 - all the active sign in gate components
 - filters gates by running their canShow function and checking if user has dismissed this gate
 - creates an instance of the gate
 - at this stage their should only be one gate available, this is returned
 */

const signInGateFilter = (
    setShowGate: React.Dispatch<React.SetStateAction<boolean>>,
    abTest: CurrentABTest,
    CAPI: CAPIBrowserType,
    isSignedIn?: boolean,
): JSX.Element | undefined => {
    const gateVariant: SignInGateComponent | null =
        testVariantToGateMapping?.[abTest.variant];

    if (
        gateVariant?.canShow(CAPI) &&
        !!isSignedIn &&
        !hasUserDismissedGate(abTest.variant, abTest.name)
    ) {
        return gateVariant.gate({
            guUrl: 'https://theguardian.com/',
            signInUrl: 'https://profile.theguardian.com/',
            dismissGate: () => {
                dismissGate(setShowGate, abTest);
            },
            abTest,
            component: componentName,
        });
    }
};

export const SignInGateSelector = ({
    isSignedIn,
    CAPI,
}: SignInGateSelectorProps) => {
    const [showGate, setShowGate] = useState(true);

    // wow this whole thing is tightly coupled to the AB test framework ...
    // const ab = useAB();

    const test = {
        ...signInGateCentesimus,
        variantToRun: {
            id: 'centesimus-control-2',
            test: (): void => {},
        },
    };
    // const test:Runnable<ABTest> = ab.firstRunnableTest(tests);

    const currentTestId = test?.id || '';
    const currentVariantId = test?.variantToRun.id || '';

    return (
        <>
            {showGate &&
                signInGateFilter(
                    setShowGate,
                    {
                        name: currentTestId,
                        variant: currentVariantId,
                    },
                    CAPI,
                    isSignedIn,
                )}
        </>
    );
};
