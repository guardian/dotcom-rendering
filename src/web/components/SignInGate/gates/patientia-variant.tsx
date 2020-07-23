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
    shouldShowCmp,
} from '@frontend/web/components/SignInGate/displayRule';
import { initPerf } from '@root/src/web/browser/initPerf';
import { hasUserDismissedGate } from '../dismissGate';

const canShow = (
    CAPI: CAPIBrowserType,
    isSignedIn: boolean,
    currentTest: CurrentABTest,
): boolean =>
    !shouldShowCmp() &&
    !isSignedIn &&
    !hasUserDismissedGate(currentTest.variant, currentTest.name) &&
    isNPageOrHigherPageView(3) &&
    isValidContentType(CAPI) &&
    isValidSection(CAPI) &&
    !isIOS9();

const SignInGatePatientia = React.lazy(() => {
    const { start, end } = initPerf('SignInGatePatientia');
    start();
    return import(
        /* webpackChunkName: "SignInGatePatientia" */ '../gateDesigns/SignInGatePatientia'
    ).then((module) => {
        end();
        return { default: module.SignInGatePatientia };
    });
});

export const signInGateComponent: SignInGateComponent = {
    gate: ({ component, dismissGate, guUrl, signInUrl, abTest, isComment }) => (
        <Lazy margin={300}>
            <Suspense fallback={<></>}>
                <SignInGatePatientia
                    component={component}
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
