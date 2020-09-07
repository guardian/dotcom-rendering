import React, { Suspense } from 'react';
import { Lazy } from '@root/src/web/components/Lazy';

import {
    SignInGateComponent,
    CurrentABTest,
} from '@frontend/web/components/SignInGate/gateDesigns/types';
import {
    isNPageOrHigherPageView,
    isValidContentType,
    isValidSection,
    isIOS9,
} from '@frontend/web/components/SignInGate/displayRule';
import { initPerf } from '@root/src/web/browser/initPerf';
import { unsetUserDismissedGate } from '../dismissGate';

/**
 * Not currently in use in any test. Keeping test file in case we want to roll it out
 */

const SignInGateMain = React.lazy(() => {
    const { start, end } = initPerf('SignInGateMain');
    start();
    return import(
        /* webpackChunkName: "SignInGateMain" */ '../gateDesigns/SignInGateMain'
    ).then((module) => {
        end();
        return { default: module.SignInGateMain };
    });
});

const canShow = (
    CAPI: CAPIBrowserType,
    isSignedIn: boolean,
    currentTest: CurrentABTest,
): boolean => {
    unsetUserDismissedGate(currentTest.variant, currentTest.name); // clears gate dismissal from local storage

    return (
        // do not check for gate dismissal as gate should show on every article
        !isSignedIn &&
        isNPageOrHigherPageView(3) &&
        isValidContentType(CAPI) &&
        isValidSection(CAPI) &&
        !isIOS9()
    );
};

export const signInGateComponent: SignInGateComponent = {
    gate: ({
        ophanComponentId,
        dismissGate,
        guUrl,
        signInUrl,
        abTest,
        isComment,
    }) => (
        <Lazy margin={300}>
            <Suspense fallback={<></>}>
                <SignInGateMain
                    ophanComponentId={ophanComponentId}
                    dismissGate={dismissGate}
                    guUrl={guUrl}
                    signInUrl={signInUrl}
                    abTest={abTest}
                    isComment={isComment}
                />
            </Suspense>
        </Lazy>
    ),
    canShow,
};
