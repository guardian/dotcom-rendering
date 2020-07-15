import { SignInGateVii } from '@frontend/web/components/SignInGate/gateDesigns/SignInGateVii';
import { SignInGateComponent } from '@frontend/web/components/SignInGate/gateDesigns/types';
// import {
//     isNPageOrHigherPageView,
//     isInvalidArticleType,
//     isInvalidSection,
//     isIOS9,
// } from '../displayRule';

const canShow = (CAPI: CAPIBrowserType): boolean => {
    return false;
    // return (
    //     isNPageOrHigherPageView(3) &&
    //     !isInvalidArticleType(CAPI) &&
    //     !isInvalidSection(CAPI) &&
    //     !isIOS9()
    // );
};

export const signInGateComponentCentesimusControl2: SignInGateComponent = {
    gate: SignInGateVii,
    canShow,
};
