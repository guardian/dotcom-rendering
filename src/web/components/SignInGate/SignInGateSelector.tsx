import React, { useState, useEffect } from 'react';
import { useAB } from '@guardian/ab-react';
import { ABTest, Runnable } from '@guardian/ab-core';

import {
    setUserDismissedGate,
    hasUserDismissedGate,
} from '@frontend/web/components/SignInGate/dismissGate';
import {
    SignInGateComponent,
    CurrentABTest,
} from '@frontend/web/components/SignInGate/gateDesigns/types';

// Sign in Gate A/B Tests
import { signInGatePatientia } from '@frontend/web/experiments/tests/sign-in-gate-patientia';
import { signInGateMainVariant } from '@root/src/web/experiments/tests/sign-in-gate-main-variant';
import { signInGateMainControl } from '@root/src/web/experiments/tests/sign-in-gate-main-control';

// Sign in Gate Types
import { signInGateComponent as gateMainControl } from '@root/src/web/components/SignInGate/gates/main-variant';

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

const tests: ReadonlyArray<ABTest> = [
    signInGatePatientia,
    signInGateMainVariant,
    signInGateMainControl,
];

const testVariantToGateMapping: GateTestMap = {
    // 'patientia-control-1': gateMainControl,
    // 'patientia-variant-1': gateMainControl,
    // 'main-control-1': gateMainControl,
    'main-variant-1': gateMainControl,
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
    console.log(setShowGate, abTest, CAPI, isSignedIn);
    const gateVariant: SignInGateComponent | null =
        testVariantToGateMapping?.[abTest.variant];
    console.log('gateVariant', gateVariant);
    console.log('gateVariant?.canShow(CAPI)', gateVariant?.canShow(CAPI));
    console.log('!!isSignedIn', !isSignedIn);
    console.log(
        '!hasUserDismissedGate(abTest.variant, abTest.name)',
        !hasUserDismissedGate(abTest.variant, abTest.name),
    );
    if (
        gateVariant?.canShow(CAPI) &&
        !isSignedIn &&
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
    const [currentTest, setCurrentTest] = useState({ id: '', variantId: '' });

    // wow this whole thing is tightly coupled to the AB test framework ...
    const ab = useAB();

    useEffect(() => {
        const test: Runnable | null = ab.firstRunnableTest(tests);

        setCurrentTest({
            id: test?.id || '',
            variantId: test?.variantToRun.id || '',
        });
    }, [ab]);

    // const test = {
    //     ...signInGateMainVariant,
    //     variantToRun: {
    //         id: 'centesimus-control-2',
    //         test: (): void => {},
    //     },
    // };
    console.log('currentTest', currentTest);
    if (currentTest.id === '' || currentTest.variantId === '') {
        return null;
    }
    console.log('showGate', showGate);
    return (
        <>
            {showGate &&
                signInGateFilter(
                    setShowGate,
                    {
                        name: currentTest.id,
                        variant: currentTest.variantId,
                    },
                    CAPI,
                    isSignedIn,
                )}
        </>
    );
};
