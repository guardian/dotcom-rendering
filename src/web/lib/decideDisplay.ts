import { Display } from '@root/src/lib/display';

export const decideDisplay = (CAPI: CAPIType | CAPIBrowserType): Display => {
    if (CAPI.isImmersive) return Display.Immersive;
    if (CAPI.pageType.hasShowcaseMainElement) return Display.Showcase;
    return Display.Standard;
};
