/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/0a2439b701586a7a2cc60dce10b4d96cf7a828db/packages/modules/src/hooks/useEscapeShortcut.ts
 */
import { useEffect } from 'react';

// Pass a function to run when the user hits the escape key
// Useful for enabling a keyboard shortcut for dismissing banners
export function useEscapeShortcut(
	eventHandler: (event: KeyboardEvent) => void,
): void {
	useEffect(() => {
		function handleEscapeKeydown(event: KeyboardEvent) {
			// IE key name is 'Esc', because IE
			const isEscapeKey = event.key === 'Escape' || event.key === 'Esc';
			if (isEscapeKey) {
				eventHandler(event);
			}
		}

		window.addEventListener('keydown', handleEscapeKeydown);

		return () => window.removeEventListener('keydown', handleEscapeKeydown);
	}, [eventHandler]);
}
