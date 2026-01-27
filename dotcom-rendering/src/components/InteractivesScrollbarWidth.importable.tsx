import { useEffect } from 'react';

export const InteractivesScrollbarWidth = () => {
	useEffect(() => {
		updateScrollbarWidth();
		window.addEventListener('resize', updateScrollbarWidth);
		return () => {
			window.removeEventListener('resize', updateScrollbarWidth);
		};
	}, []);
	return null;
};

const updateScrollbarWidth = () => {
	const documentWidth = document.documentElement.clientWidth;
	if (documentWidth <= 0) {
		return;
	}

	const scrollbarWidth = window.innerWidth - documentWidth;

	const root = document.documentElement;

	root.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
	root.style.setProperty('--half-scrollbar-width', `${scrollbarWidth / 2}px`);
};
