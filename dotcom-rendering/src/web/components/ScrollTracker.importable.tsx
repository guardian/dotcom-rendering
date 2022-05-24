import debounce from 'lodash.debounce';
import { useEffect, useState } from 'react';

type Data = {
	label?: string;
	properties: Record<string, string>;
	metrics: Record<string, number>;
};

export const ScrollTracker = () => {
	// React hooks for tracking viewport and scroll position
	const [{ viewportWidth, viewportHeight }, setViewport] = useState({
		viewportWidth: document.documentElement.clientWidth,
		viewportHeight: document.documentElement.clientHeight,
	});

	useEffect(function debouncedResizeListener() {
		const viewportListener = debounce(() => {
			setViewport({
				viewportWidth: document.documentElement.clientWidth,
				viewportHeight: document.documentElement.clientHeight,
			});
		}, 500);

		window.addEventListener('resize', viewportListener);

		return () => {
			window.removeEventListener('resize', viewportListener);
		};
	});

	const [scrollDepth, setScrollDepth] = useState(0);

	useEffect(
		function debouncedScrollListener() {
			const scrollPosition = window.scrollY + viewportHeight / 2;
			const scrollListener = debounce(() => {
				setScrollDepth(
					Math.floor(Math.max(scrollDepth, scrollPosition)),
				);
			}, 500);

			window.addEventListener('scroll', scrollListener);

			return () => {
				window.removeEventListener('scroll', scrollListener);
			};
		},
		[scrollDepth, viewportHeight],
	);

	// MainContentHeight measures from the top of the window to the bottom of the #maincontent element
	// It will change slightly depending on what content is loaded
	const getMainContentHeight = (): number => {
		const body: HTMLElement = document.body;
		const mainContent = document.querySelector<HTMLElement>('#maincontent');
		if (!mainContent) return -1;

		return (
			mainContent.getBoundingClientRect().bottom -
			body.getBoundingClientRect().top
		);
	};

	const mainContentHeight: number = getMainContentHeight();

	// mainContentScroll depth is compared to the height of mainContent
	// to determine how far the user has scrolled in editorial content
	// It can be exceeded, as captured by totalScrollDepth
	const mainContentScrollDepth: number = Math.min(
		mainContentHeight,
		scrollDepth,
	);
	const totalScrollDepth: number = scrollDepth;

	const payload: Data = {
		label: 'scrollDepth',
		properties: {
			path: window.location.pathname,
		},
		metrics: {
			mainContentHeight,
			mainContentScrollDepth,
			totalScrollDepth,
			viewportWidth,
			viewportHeight,
		},
	};

	// TBD: Send the payload into the analytics pipeline
	console.log(payload);

	// don’t render anything
	return null;
};
