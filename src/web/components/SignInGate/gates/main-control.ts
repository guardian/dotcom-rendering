import { SignInGateVii } from '@frontend/web/components/SignInGate/gateDesigns/SignInGateVii';
import { SignInGateComponent } from '@frontend/web/components/SignInGate/gateDesigns/types';
import {
    isNPageOrHigherPageView,
    isValidContentType,
    isValidSection,
    isIOS9,
} from '@frontend/web/components/SignInGate/displayRule';

const canShow = (CAPI: CAPIBrowserType): boolean =>
    isNPageOrHigherPageView(3) &&
    isValidContentType(CAPI) &&
    isValidSection(CAPI) &&
    !isIOS9();

export const signInGateComponent: SignInGateComponent = {
    gate: SignInGateVii,
    canShow,
};
