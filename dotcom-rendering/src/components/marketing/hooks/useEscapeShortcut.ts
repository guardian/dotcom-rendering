import { useEffect } from 'react';

// Pass a function to run when the user hits the escape key
// Useful for enabling a keyboard shortcut for dismissing banners
export function useEscapeShortcut(
	eventHandler: (event: KeyboardEvent) => void,
	deps: React.DependencyList = [],
): void {
	function handleEscapeKeydown(event: KeyboardEvent) {
		// IE key name is 'Esc', because IE
		const isEscapeKey = event.key === 'Escape' || event.key === 'Esc';
		if (isEscapeKey) {
			eventHandler(event);
		}
	}

	useEffect(() => {
		window.addEventListener('keydown', handleEscapeKeydown);

		return () => window.removeEventListener('keydown', handleEscapeKeydown);
	}, deps);
}
