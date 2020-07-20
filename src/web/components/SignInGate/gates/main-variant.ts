import { SignInGateVii } from '@frontend/web/components/SignInGate/gateDesigns/SignInGateVii';
import { SignInGateComponent } from '@frontend/web/components/SignInGate/gateDesigns/types';
import {
    isNPageOrHigherPageView,
    isInvalidArticleType,
    isInvalidSection,
    isIOS9,
} from '@frontend/web/components/SignInGate/displayRule';

const canShow = (CAPI: CAPIBrowserType): boolean => {
    console.log('canShow main-variant');
    console.log('isNPageOrHigherPageView(3)', isNPageOrHigherPageView(3));
    console.log('!isInvalidArticleType(CAPI)', !isInvalidArticleType(CAPI));
    console.log('!isInvalidSection(CAPI)', !isInvalidSection(CAPI));
    console.log('!isIOS9()', !isIOS9());
    console.log(
        isNPageOrHigherPageView(3) &&
            !isInvalidArticleType(CAPI) &&
            !isInvalidSection(CAPI) &&
            !isIOS9(),
    );
    return (
        isNPageOrHigherPageView(3) &&
        !isInvalidArticleType(CAPI) &&
        !isInvalidSection(CAPI) &&
        !isIOS9()
    );
};

export const signInGateComponent: SignInGateComponent = {
    gate: SignInGateVii,
    canShow,
};
