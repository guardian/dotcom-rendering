import { FocusStyleManager } from '@guardian/source/foundations';
import { useEffect } from 'react';

export const FocusStyles = () => {
	// Ensure the focus state of any buttons/inputs in any of the Source
	// components are only applied when navigating via keyboard.
	// READ: https://www.theguardian.design/2a1e5182b/p/6691bb-accessibility/t/32e9fb
	useEffect(() => {
		FocusStyleManager.onlyShowFocusOnTabs();
	}, []);
	// Nothing is rendered by this component
	return null;
};
