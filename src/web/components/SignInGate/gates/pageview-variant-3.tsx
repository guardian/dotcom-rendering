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
    isCountry,
} from '@frontend/web/components/SignInGate/displayRule';
import { initPerf } from '@root/src/web/browser/initPerf';
import { hasUserDismissedGate } from '../dismissGate';

const SignInGateMain = React.lazy(() => {
    const { start, end } = initPerf('SignInGateMainVar2');
    start();
    return import(
        /* webpackChunkName: "SignInGateMain" */ '../gateDesigns/SignInGateMainVar2'
    ).then((module) => {
        end();
        return { default: module.SignInGateMainVar2 };
    });
});

// 3rd page view & old dismiss rule (never see gate again after first dismissal)
const canShow = (
    CAPI: CAPIBrowserType,
    isSignedIn: boolean,
    currentTest: CurrentABTest,
): boolean =>
    !isSignedIn &&
    !hasUserDismissedGate(currentTest.variant, currentTest.name) &&
    isNPageOrHigherPageView(3) &&
    isValidContentType(CAPI) &&
    isValidSection(CAPI) &&
    !isIOS9() &&
    !isCountry('US');

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
