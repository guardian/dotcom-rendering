import { SignInGateVii } from '@frontend/web/components/SignInGate/gateDesigns/SignInGateVii';
import { SignInGateComponent } from '@frontend/web/components/SignInGate/gateDesigns/types';
import {
    isNPageOrHigherPageView,
    isInvalidArticleType,
    isInvalidSection,
    isIOS9,
} from '@frontend/web/components/SignInGate/displayRule';

const canShow = (CAPI: CAPIBrowserType): boolean =>
    isNPageOrHigherPageView(3) &&
    !isInvalidArticleType(CAPI) &&
    !isInvalidSection(CAPI) &&
    !isIOS9();

export const signInGateComponent: SignInGateComponent = {
    gate: SignInGateVii,
    canShow,
};
