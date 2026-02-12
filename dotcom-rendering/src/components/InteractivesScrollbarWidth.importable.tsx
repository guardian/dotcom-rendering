import { useEffect } from 'react';

export const InteractivesScrollbarWidth = () => {
	useEffect(() => {
		const updateScrollbarWidth = () => {
			const documentWidth = document.documentElement.clientWidth;
			if (documentWidth <= 0) return;

			const scrollbarWidth = window.innerWidth - documentWidth;
			const root = document.documentElement;

			root.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
			root.style.setProperty(
				'--half-scrollbar-width',
				`${scrollbarWidth / 2}px`,
			);
		};

		let timeoutId: ReturnType<typeof setTimeout> | null = null;

		const debouncedResize = () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}

			timeoutId = setTimeout(() => {
				updateScrollbarWidth();
			}, 150);
		};

		updateScrollbarWidth();

		window.addEventListener('resize', debouncedResize);

		return () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
			window.removeEventListener('resize', debouncedResize);
		};
	}, []);

	return null;
};
