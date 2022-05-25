import debounce from 'lodash.debounce';
import { useEffect, useState } from 'react';
import { getLoggingEndpoint, recordLog } from 'src/lib/sendAnalyticsToLake';

/**
 * MainContentHeight measures from the top of the window to the bottom of the #maincontent element
 * It will change slightly depending on what content is loaded */
const getMainContentHeight = (): number => {
	const body: HTMLElement = document.body;
	const mainContent = document.querySelector<HTMLElement>('#maincontent');
	if (!mainContent) return -1;

	return (
		mainContent.getBoundingClientRect().bottom -
		body.getBoundingClientRect().top
	);
};

export const ScrollTracker = () => {
	const debounceRate = 500;

	// React hooks for tracking viewport and scroll position
	const [{ viewportWidth, viewportHeight, mainContentHeight }, setViewport] =
		useState({
			viewportWidth: document.documentElement.clientWidth,
			viewportHeight: document.documentElement.clientHeight,
			mainContentHeight: getMainContentHeight(),
		});

	useEffect(function debouncedResizeListener() {
		const viewportListener = debounce(() => {
			setViewport({
				viewportWidth: document.documentElement.clientWidth,
				viewportHeight: document.documentElement.clientHeight,
				mainContentHeight: getMainContentHeight(),
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
			}, debounceRate);

			window.addEventListener('scroll', scrollListener);

			return () => {
				window.removeEventListener('scroll', scrollListener);
			};
		},
		[scrollDepth, viewportHeight],
	);

	/**
	 * mainContentScroll depth is compared to the height of mainContent
	 * to determine how far the user has scrolled in editorial content
	 * It can be exceeded, as captured by totalScrollDepth */
	const mainContentScrollDepth: number = Math.min(
		mainContentHeight,
		scrollDepth,
	);
	const totalScrollDepth: number = scrollDepth;

	const payload = {
		label: 'dotComScrollDepth',
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
	recordLog({
		...payload,
		endpoint: getLoggingEndpoint(true),
	});

	// don’t render anything
	return null;
};
