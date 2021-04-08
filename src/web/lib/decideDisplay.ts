import { Display } from '@guardian/types';

export const decideDisplay = (format: CAPIFormat): Display => {
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
		default:
			return Display.Standard;
	}
};
