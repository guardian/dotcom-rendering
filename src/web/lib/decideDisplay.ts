import { Display } from '@guardian/types';

export const decideDisplay = (CAPI: CAPIType | CAPIBrowserType): Display => {
	if (CAPI.isImmersive) return Display.Immersive;
	if (CAPI.pageType.hasShowcaseMainElement) return Display.Showcase;
	return Display.Standard;
};

export const decideDisplayV2 = (format: CAPIFormat): Display => {
	const { display } = format;
	switch (display) {
		case 'StandardDisplay':
			return Display.Standard;
		case 'ImmersiveDisplay':
			return Display.Immersive;
		case 'ShowcaseDisplay':
			return Display.Showcase;
		case 'NumberedListDisplay':
			return Display.NumberedList;
		case 'ColumnDisplay':
			return Display.Column;
		default:
			return Display.Standard;
	}
};
