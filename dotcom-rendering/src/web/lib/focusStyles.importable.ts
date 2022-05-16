import { FocusStyleManager } from '@guardian/source-foundations';

export const focusStyles = () => {
	// Ensure the focus state of any buttons/inputs in any of the Source
	// components are only applied when navigating via keyboard.
	// READ: https://www.theguardian.design/2a1e5182b/p/6691bb-accessibility/t/32e9fb
	FocusStyleManager.onlyShowFocusOnTabs();
};
